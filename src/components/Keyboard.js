import React, { useEffect, useCallback, useContext } from "react";

import { AppContext } from "../App";
import Key from "./Key";
import {keys} from '../constants/keys';

import axois from "axios";

const Keyboard = () => {
  const {
    currAttempt,
    guessedLetters,
    board,
    correctWord,
    setBoard,
    setCurrAttempt,
    setGameOver,
  } = useContext(AppContext);

  const selectKey = useCallback(
    (keyVal) => {
      if (currAttempt.position > 4) return;

      const newBoard = [...board];
      newBoard[currAttempt.attempt][currAttempt.position] = keyVal;
      setBoard(newBoard);
      setCurrAttempt({ ...currAttempt, position: currAttempt.position + 1 });
    },
    [board, currAttempt, setBoard, setCurrAttempt]
  );

  const submitGuess = useCallback(async () => {
    if (currAttempt.position !== 5) return;

    const currentWord = [...board[currAttempt.attempt]].join("").toLowerCase();

    const data = await axois
      .get(`https://api.api-ninjas.com/v1/dictionary?word=${currentWord}`, {
        headers: { "X-Api-Key": "1IzsQ9vc7YFZwCT1o+Q8lA==CJAvzKDE4XQqBWgY" },
        contentType: "application/json",
      })
      .then((res) => res.data);

    if (data.valid) {
      setCurrAttempt({ attempt: currAttempt.attempt + 1, position: 0 });
    } else {
      return alert("word not found");
    }

    if (currentWord === correctWord) {
      setGameOver({ gameOver: true, guessedCorrect: true });
    } else if (currAttempt.attempt === 5) {
      setGameOver({ gameOver: true, guessedCorrect: false });
    }
  }, [board, correctWord, currAttempt, setCurrAttempt, setGameOver]);

  const deleteLetter = useCallback(() => {
    if (currAttempt.position === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.position - 1] = "";

    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, position: currAttempt.position - 1 });
  }, [board, currAttempt, setBoard, setCurrAttempt]);

  const handleKeyboard = useCallback(
    (event) => {
      if (event.key === "Enter") {
        return submitGuess();
      } else if (event.key === "Backspace") {
        return deleteLetter();
      } else {
        const pattern = /^[a-zA-Z]$/;
        if (!event.key.match(pattern)) {
          return false;
        }

        const keyValue = event.key.toUpperCase();
        return selectKey(keyValue);
      }
    },
    [deleteLetter, submitGuess, selectKey]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);
    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);

  return (
    <div className="keyboard" onKeyDown={handleKeyboard}>
      {keys.map((line, index) => (
        <div key={`line${index + 1}`} className={`line${index + 1}`}>
          {line.map((key) => (
            <Key
              data-testid={key.letter}
              key={key.letter}
              keyVal={key.letter}
              big={key.type === "large" ? true : false}
              onSelectKey={selectKey}
              onSubmitGuess={submitGuess}
              onDeleteLetter={deleteLetter}
              state={guessedLetters && guessedLetters[key.letter]}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;

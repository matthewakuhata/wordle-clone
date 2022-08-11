import React, { useEffect, useCallback, useContext } from 'react'
import { AppContext } from '../App';
import axois from 'axios';
import Key from './Key'

const Keyboard = () => {
   const keys = [
      [
         { type: 'key', letter: 'Q' },
         { type: 'key', letter: 'W' },
         { type: 'key', letter: 'E' },
         { type: 'key', letter: 'R' },
         { type: 'key', letter: 'T' },
         { type: 'key', letter: 'Y' },
         { type: 'key', letter: 'U' },
         { type: 'key', letter: 'I' },
         { type: 'key', letter: 'O' },
         { type: 'key', letter: 'P' },],
      [
         { type: 'key', letter: 'A' },
         { type: 'key', letter: 'S' },
         { type: 'key', letter: 'D' },
         { type: 'key', letter: 'F' },
         { type: 'key', letter: 'G' },
         { type: 'key', letter: 'H' },
         { type: 'key', letter: 'J' },
         { type: 'key', letter: 'K' },
         { type: 'key', letter: 'L' },
      ],
      [
         { type: 'large', letter: 'ENTER' },
         { type: 'key', letter: 'Z' },
         { type: 'key', letter: 'X' },
         { type: 'key', letter: 'C' },
         { type: 'key', letter: 'V' },
         { type: 'key', letter: 'B' },
         { type: 'key', letter: 'N' },
         { type: 'key', letter: 'M' },
         { type: 'large', letter: 'DELETE' },
      ]
   ];

   const { currAttempt, guessedLetters, board, correctWord, setBoard, setCurrAttempt, setGameOver } = useContext(AppContext);

   const selectKey = (keyVal) => {
      if (currAttempt.position > 4) return;

      const newBoard = [...board];
      newBoard[currAttempt.attempt][currAttempt.position] = keyVal;
      setBoard(newBoard);
      setCurrAttempt({ ...currAttempt, position: currAttempt.position + 1 })
   }

   const submitGuess = async () => {
      if (currAttempt.position !== 5) return;

      const currentWord = [...board[currAttempt.attempt]].join('').toLowerCase();

      const result = await axois.get(`https://api.api-ninjas.com/v1/dictionary?word=${currentWord}`, {
         headers:
            { 'X-Api-Key': '1IzsQ9vc7YFZwCT1o+Q8lA==CJAvzKDE4XQqBWgY' },
      }).then(result => result.data);

      if (result.valid) {
         setCurrAttempt({ attempt: currAttempt.attempt + 1, position: 0 });
      } else {
         return alert("word not found");
      }

      if (currentWord === correctWord) {
         setGameOver({ gameOver: true, guessedCorrect: true });
      } else if (currAttempt.attempt === 5) {
         setGameOver({ gameOver: true, guessedCorrect: false });
      }
   };

   const deleteLetter = () => {
      if (currAttempt.position === 0) return;
      const newBoard = [...board];
      newBoard[currAttempt.attempt][currAttempt.position - 1] = '';

      setBoard(newBoard);
      setCurrAttempt({ ...currAttempt, position: currAttempt.position - 1 })
   };

   const handleKeyboard = useCallback((event) => {
      if (event.key === 'Enter') {
         return submitGuess();
      } else if (event.key === 'Backspace') {
         return deleteLetter();
      } else {
         const pattern = /^[a-zA-Z]$/;
         if (!event.key.match(pattern)) {
            return false;
         }

         const keyValue = event.key.toUpperCase();
         return selectKey(keyValue);
      }
   }, [currAttempt]);


   useEffect(() => {
      document.addEventListener('keydown', handleKeyboard);
      return () => {
         document.removeEventListener('keydown', handleKeyboard);
      };
   }, [handleKeyboard]);

   return (
      <div className='keyboard' onKeyDown={handleKeyboard}>
         {keys.map((line, index) => (
            <div key={`line${index + 1}`} className={`line${index + 1}`}>
               {line.map((key) => (
                  <Key
                     data-testid={key.letter}
                     key={key.letter}
                     keyVal={key.letter}
                     big={key.type === 'large' ? true : false}
                     onSelectKey={selectKey}
                     onSubmitGuess={submitGuess}
                     onDeleteLetter={deleteLetter}
                     state={(guessedLetters && guessedLetters[key.letter])}
                  />
               ))}
            </div>
         ))}
      </div>
   )
}

export default Keyboard

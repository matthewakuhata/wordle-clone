import { useState, createContext, useEffect } from 'react';
import Keyboard from './components/Keyboard';
import Board from './components/Board';
import GameOver from './components/GameOver';
import { boardDefault, generateWordSet } from './Words';
import axois from 'axios';
import isValidWord from './utils/isValidWord';
import './App.css';

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, position: 0 });
  const [correctWord, setCorrectWord] = useState('');
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [gameOver, setGameOver] = useState({ gameOver: false, guessedCorrect: false })

  useEffect(() => {
    generateWordSet().then((words) => {
      setCorrectWord(words.todaysWord);
    });
  }, []);

  const onSelectKey = (keyVal) => {
    if (currAttempt.position > 4) return;

    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.position] = keyVal;

    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, position: currAttempt.position + 1 })
  }

  const submitGuess = () => {
    if (currAttempt.position !== 5) return;

    const currentWord = [...board[currAttempt.attempt]].join('').toLowerCase();
    if (isValidWord(currentWord)) {
      setCurrAttempt({ attempt: currAttempt.attempt + 1, position: 0 });
    } else {
      alert("word not found");
    }

    if (currentWord === correctWord) {
      setGameOver({ gameOver: true, guessedCorrect: true });
    }

    if (currAttempt.attempt === 5) {
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

  return (
    <div className="App">
      <nav><h1>Wordle</h1></nav>
      <AppContext.Provider value={{
        board,
        setBoard,
        currAttempt,
        setCurrAttempt,
        onSelectKey,
        submitGuess,
        deleteLetter,
        correctWord,
        disabledLetters,
        setDisabledLetters,
        gameOver,
        setGameOver
      }}>
        <div className="game">
          <Board />
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;

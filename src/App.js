import { useState, createContext, useEffect } from 'react';
import Keyboard from './components/Keyboard';
import Board from './components/Board';
import GameOver from './components/GameOver';
import { boardDefault, generateWordSet } from './Words';
import './App.css';

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, position: 0 });
  const [correctWord, setCorrectWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState({});
  const [gameOver, setGameOver] = useState({ gameOver: false, guessedCorrect: false })

  useEffect(() => {
    generateWordSet().then((words) => {
      setCorrectWord(words.todaysWord);
    });
  }, []);

  return (
    <div className="App">
      <nav><h1>Wordle</h1></nav>
      <AppContext.Provider value={{
        board,
        setBoard,
        setCurrAttempt,
        currAttempt,
        correctWord,
        guessedLetters,
        setGuessedLetters,
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

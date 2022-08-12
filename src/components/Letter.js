import { React, useContext, useEffect } from 'react'
import { AppContext } from '../App';

const Letter = ({ letterPosition, attemptValue }) => {
   const { board, correctWord, currAttempt, setGuessedLetters } = useContext(AppContext);
   const letter = board[attemptValue][letterPosition];

   const correct = correctWord[letterPosition] === letter.toLowerCase();
   const almost = !correct && letter !== '' && correctWord.includes(letter.toLowerCase());

   const letterState = currAttempt.attempt > attemptValue && (correct ? "correct" : almost ? "almost" : "error");

   useEffect(() => {
      if (letter !== '') {
         setGuessedLetters((prev) => {
            const state = { ...prev };
            state[letter] = letterState;
            return state;
         });
      }
   }, [currAttempt.attempt]);

   const calculateDelay = () => {
      const value = letterPosition * 3;
      return `${(value / 10)}s`;
   }
   return (
      <div className={`letter ${letterState && 'flip-horizontal-top'}`} style={{ '--bg-color': `var(--${letterState})`, '--delay': calculateDelay() }}>{letter}</div>
   )
}

export default Letter;
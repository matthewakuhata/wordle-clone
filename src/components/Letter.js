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

   return (
      <div className={`letter ${letterState}`}>{letter}</div>
   )
}

export default Letter;
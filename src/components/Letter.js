import { React, useContext, useEffect } from 'react'
import { AppContext } from '../App';

const Letter = ({ letterPosition, attemptValue }) => {
   const { board, correctWord, currAttempt, setDisabledLetters } = useContext(AppContext);
   const letter = board[attemptValue][letterPosition];

   const correct = correctWord[letterPosition] === letter.toLowerCase();
   const almost = !correct && letter !== '' && correctWord.includes(letter.toLowerCase());

   const letterState = currAttempt.attempt > attemptValue && (correct ? "correct" : almost ? "almost" : "error");

   useEffect(() => {
      if (!correct && letter !== '' && !almost) {
         setDisabledLetters((prev) => [...prev, letter]);
      }
   }, [currAttempt.attempt])

   return (
      <div id={letterState} className="letter">{letter}</div>
   )
}

export default Letter
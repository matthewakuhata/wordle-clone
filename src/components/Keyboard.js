import React, { useEffect, useCallback, useContext } from 'react'
import { AppContext } from '../App';
import Key from './Key'

const Keyboard = () => {
   const line1Keys = [
      { type: 'key', letter: 'Q' },
      { type: 'key', letter: 'W' },
      { type: 'key', letter: 'E' },
      { type: 'key', letter: 'R' },
      { type: 'key', letter: 'T' },
      { type: 'key', letter: 'Y' },
      { type: 'key', letter: 'U' },
      { type: 'key', letter: 'I' },
      { type: 'key', letter: 'O' },
      { type: 'key', letter: 'P' },
   ];

   const line2Keys = [
      { type: 'key', letter: 'A' },
      { type: 'key', letter: 'S' },
      { type: 'key', letter: 'D' },
      { type: 'key', letter: 'F' },
      { type: 'key', letter: 'G' },
      { type: 'key', letter: 'H' },
      { type: 'key', letter: 'J' },
      { type: 'key', letter: 'K' },
      { type: 'key', letter: 'L' },
   ];

   const line3Keys = [
      { type: 'large', letter: 'ENTER' },
      { type: 'key', letter: 'Z' },
      { type: 'key', letter: 'X' },
      { type: 'key', letter: 'C' },
      { type: 'key', letter: 'V' },
      { type: 'key', letter: 'B' },
      { type: 'key', letter: 'N' },
      { type: 'key', letter: 'M' },
      { type: 'large', letter: 'DELETE' },
   ];

   const { currAttempt, onSelectKey, submitGuess, deleteLetter, disabledLetters } = useContext(AppContext);
   const handleKeyboard = useCallback((event) => {
      if (event.key === 'Enter') {
         return submitGuess();
      } else if (event.key === 'Backspace') {
         return deleteLetter();
      } else {
         const pattern = /^[a-zA-Z]$/;
         if (!event.key.match(pattern)) return;
         const keyValue = event.key.toUpperCase();
         return onSelectKey(keyValue);
      }
   }, [currAttempt]);


   useEffect(() => {
      document.addEventListener('keydown', handleKeyboard);
      return () => {
         document.removeEventListener('keydown', handleKeyboard);
      };
   }, [handleKeyboard])


   return (
      <div className='keyboard' onKeyDown={handleKeyboard}>
         <div className='line1'>
            {line1Keys.map((key) => (
               <Key key={key.letter} keyVal={key.letter} disabled={disabledLetters.includes(key.letter)} />
            ))}
         </div>
         <div className='line2'>
            {line2Keys.map((key) => (
               <Key key={key.letter} keyVal={key.letter} disabled={disabledLetters.includes(key.letter)} />
            ))}</div>
         <div className='line3'>
            {line3Keys.map((key) => (
               <Key key={key.letter} keyVal={key.letter} big={key.type === 'large' ? true : false} disabled={disabledLetters.includes(key.letter)} />
            ))}</div>
      </div>
   )
}

export default Keyboard

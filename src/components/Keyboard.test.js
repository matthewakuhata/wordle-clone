import Keyboard from './Keyboard';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { createContext } from 'react';
import { AppContext } from '../App'

describe('GIVEN a Keyboard', () => {
   describe('WHEN rendering the Keyboard', () => {
      beforeEach(() => {
         render(<AppContext.Provider value={{
            board: '',
            setBoard: '',
            setCurrAttempt: '',
            currAttempt: '',
            correctWord: '',
            guessedLetters: '',
            setGuessedLetters: '',
            gameOver: '',
            setGameOver: ''
         }}>
            <Keyboard />
         </AppContext.Provider>);
      });

      const keys = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DELETE',];

      keys.forEach((key) => {
         test(`THEN the ${key} Button should exist`, () => {
            expect(screen.getByText(key)).toBeTruthy();
            userEvent.click(screen.getByText(key));
         })
      });
   })
})
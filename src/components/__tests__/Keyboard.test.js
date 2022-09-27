import Keyboard from "../Keyboard";
import { AppContext } from "../../App";

import axios from 'axios';
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
const keys = [
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "ENTER",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
  "DELETE",
];

jest.mock("axios");

describe("GIVEN a Keyboard", () => {
  describe("WHEN rendering the Keyboard", () => {
    test(`THEN the Buttons should exist`, () => {
      const mockCurrAttempt = { attempt: 0, position: 0 };
      const mockSetCurrAttempt = jest.fn(() => mockCurrAttempt.position++);
      const mockSetBoard = jest.fn();
      render(
        <AppContext.Provider
          value={{
            board: [[]],
            setBoard: mockSetBoard,
            setCurrAttempt: mockSetCurrAttempt,
            currAttempt: mockCurrAttempt,
            correctWord: "",
            guessedLetters: "",
            setGuessedLetters: "",
            gameOver: "",
            setGameOver: "",
          }}
        >
          <Keyboard />
        </AppContext.Provider>
      );

      keys.forEach((key) => expect(screen.getByText(key)).toBeTruthy());
    });
  });
});

describe("GIVEN a Keyboard on attemp 0 and position 0", () => {
  let mockCurrAttempt = { attempt: 0, position: 0 };
  let mockBoard = [[]];
  const mockSetCurrAttempt = jest.fn((newVal) => mockCurrAttempt = newVal);
  const mockSetBoard = jest.fn();

  describe("WHEN clicking on a character button", () => {
    test(`THEN the selectKey function should run`, () => {
      render(
        <AppContext.Provider
          value={{
            board: mockBoard,
            setBoard: mockSetBoard,
            setCurrAttempt: mockSetCurrAttempt,
            currAttempt: mockCurrAttempt,
            correctWord: "",
            guessedLetters: "",
            setGuessedLetters: "",
            gameOver: "",
            setGameOver: "",
          }}
        >
          <Keyboard />
        </AppContext.Provider>
      );
      
      const button = screen.getByText('Q')
      fireEvent.click(button);
     
      expect(mockSetCurrAttempt).toBeCalled();
      expect(mockSetCurrAttempt).toBeCalledWith({ attempt: 0, position: 1 });
      
      expect(mockSetBoard).toBeCalled();
      expect(mockBoard).toEqual([["Q"]]);
    });
  });

  describe("WHEN clicking on the enter button", () => {
    test(`THEN the submitGuess should return and not update current attempt`, () => {
      render(
        <AppContext.Provider
          value={{
            board: [[]],
            setBoard: mockSetBoard,
            setCurrAttempt: mockSetCurrAttempt,
            currAttempt: mockCurrAttempt,
            correctWord: "",
            guessedLetters: "",
            setGuessedLetters: "",
            gameOver: "",
            setGameOver: "",
          }}
        >
          <Keyboard />
        </AppContext.Provider>
      );
      
      const button = screen.getByText('ENTER')
      fireEvent.click(button);
      expect(mockSetCurrAttempt).not.toBeCalled();
    });
  });

  describe("WHEN clicking on the delete button", () => {
    test(`THEN nothing should happen`, () => {
      render(
        <AppContext.Provider
          value={{
            board: mockBoard,
            setBoard: mockSetBoard,
            setCurrAttempt: mockSetCurrAttempt,
            currAttempt: mockCurrAttempt,
            correctWord: "",
            guessedLetters: "",
            setGuessedLetters: "",
            gameOver: "",
            setGameOver: "",
          }}
        >
          <Keyboard />
        </AppContext.Provider>
      );
      
      const button = screen.getByText('DELETE')
      fireEvent.click(button);
     
      expect(mockSetCurrAttempt).not.toBeCalled();
      expect(mockSetBoard).not.toBeCalled();
    });
  });
});

describe("GIVEN a Keyboard with the attempt at the final postion", () => {
  let mockCurrAttempt = { attempt: 0, position: 5 };
  let mockBoard = [['A', 'B', 'B', 'B', 'C']];
  const mockSetCurrAttempt = jest.fn((newVal) => mockCurrAttempt = newVal);
  const mockSetBoard = jest.fn();

  describe("WHEN clicking on a character button", () => {
    test(`THEN the nothing should happen`, () => {
      render(
        <AppContext.Provider
          value={{
            board: mockBoard,
            setBoard: mockSetBoard,
            setCurrAttempt: mockSetCurrAttempt,
            currAttempt: mockCurrAttempt,
            correctWord: "",
            guessedLetters: "",
            setGuessedLetters: "",
            gameOver: "",
            setGameOver: "",
          }}
        >
          <Keyboard />
        </AppContext.Provider>
      );
      
      const button = screen.getByText('Q')
      fireEvent.click(button);
     
      expect(mockSetCurrAttempt).not.toBeCalled();
      expect(mockSetBoard).not.toBeCalled();
      expect(mockCurrAttempt).toMatchObject({ attempt: 0, position: 5 });
    });
  });

  describe("WHEN clicking on the ENTER button with a valid word", () => {
    test(`THEN the value should be validated and the attempt should be increased`, async () => {
      render(
        <AppContext.Provider
          value={{
            board: mockBoard,
            setBoard: mockSetBoard,
            setCurrAttempt: mockSetCurrAttempt,
            currAttempt: mockCurrAttempt,
            correctWord: "",
            guessedLetters: "",
            setGuessedLetters: "",
            gameOver: "",
            setGameOver: "",
          }}
        >
          <Keyboard />
        </AppContext.Provider>
      );
      
      const data = { data: { valid: true }};
      axios.get.mockResolvedValueOnce(data);

      const button = screen.getByText('ENTER');
      fireEvent.click(button);

      expect(axios.get).toBeCalledWith("https://api.api-ninjas.com/v1/dictionary?word=abbbc", expect.objectContaining({}));
      
      await waitFor(() => expect(mockSetCurrAttempt).toHaveBeenCalledTimes(1));
      expect(mockSetCurrAttempt).toBeCalledWith({"attempt": 1, "position": 0});
    });
  });

  describe("WHEN clicking on the ENTER button with an invalid word", () => {
    test(`THEN the value should be validated and the attempt should not change`, async () => {
      window.alert = jest.fn();
      const alertMock = jest.spyOn(window,'alert'); 

      render(
        <AppContext.Provider
          value={{
            board: mockBoard,
            setBoard: mockSetBoard,
            setCurrAttempt: mockSetCurrAttempt,
            currAttempt: mockCurrAttempt,
            correctWord: "",
            guessedLetters: "",
            setGuessedLetters: "",
            gameOver: "",
            setGameOver: "",
          }}
        >
          <Keyboard />
        </AppContext.Provider>
      );
      
      const data = { data: { valid: false }};
      axios.get.mockResolvedValueOnce(data);
      fireEvent.click(screen.getByText('ENTER'));

      expect(axios.get).toBeCalledWith("https://api.api-ninjas.com/v1/dictionary?word=abbbc", expect.objectContaining({}));
      await waitFor(() => expect(alertMock).toBeCalledWith("word not found"));
    });
  });
  
  describe("WHEN clicking on the ENTER button the correct word", () => {
    test(`THEN the game should be won`, async () => {
      const mockSetGameOver = jest.fn();
      render(
        <AppContext.Provider
          value={{
            board: mockBoard,
            setBoard: mockSetBoard,
            setCurrAttempt: mockSetCurrAttempt,
            currAttempt: mockCurrAttempt,
            correctWord: "abbbc",
            guessedLetters: "",
            setGuessedLetters: "",
            gameOver: {},
            setGameOver: mockSetGameOver,
          }}
        >
          <Keyboard />
        </AppContext.Provider>
      );
      
      const data = { data: { valid: true }};
      axios.get.mockResolvedValueOnce(data);
      fireEvent.click(screen.getByText('ENTER'));

      expect(axios.get).toBeCalledWith("https://api.api-ninjas.com/v1/dictionary?word=abbbc", expect.objectContaining({}));
      
      await waitFor(() => expect(mockSetCurrAttempt).toHaveBeenCalledTimes(1));
      expect(mockSetGameOver).toBeCalledWith({ gameOver: true, guessedCorrect: true });
    });
  });  
});

describe("GIVEN a Keyboard on the final attempt", () => {
  const mockSetCurrAttempt = jest.fn((newVal) => {console.log('newval',newVal)});
  const mockSetBoard = jest.fn();
  const mockSetGameOver = jest.fn();

  describe("WHEN clicking on the ENTER button the correct word", () => {
    test(`THEN the game should be won`, async () => {
      let mockCurrAttempt = { attempt: 4, position: 5 };
      let mockBoard = [[],[],[],[],['A', 'B', 'B', 'B', 'C']];

      render(
        <AppContext.Provider
          value={{
            board: mockBoard,
            setBoard: mockSetBoard,
            setCurrAttempt: mockSetCurrAttempt,
            currAttempt: mockCurrAttempt,
            correctWord: "abbbc",
            guessedLetters: "",
            setGuessedLetters: "",
            gameOver: {},
            setGameOver: mockSetGameOver,
          }}
        >
          <Keyboard />
        </AppContext.Provider>
      );
      
      const data = { data: { valid: true }};
      axios.get.mockResolvedValueOnce(data);
      fireEvent.click(screen.getByText('ENTER'));

      expect(axios.get).toBeCalledWith("https://api.api-ninjas.com/v1/dictionary?word=abbbc", expect.objectContaining({}));
      await waitFor(() => expect(mockSetCurrAttempt).toHaveBeenCalledTimes(1));
      expect(mockSetGameOver).toBeCalledWith({ gameOver: true, guessedCorrect: true });
    });
  });  

  describe("WHEN clicking on the ENTER button with an inccorrect word", () => {
    test(`THEN the game should be lost`, async () => {
      let mockCurrAttempt = { attempt: 5, position: 5 };
      let mockBoard = [[],[],[],[],[],['A', 'B', 'B', 'B', 'C']];

      render(
        <AppContext.Provider
          value={{
            board: mockBoard,
            setBoard: mockSetBoard,
            setCurrAttempt: mockSetCurrAttempt,
            currAttempt: mockCurrAttempt,
            correctWord: "whale",
            guessedLetters: "",
            setGuessedLetters: "",
            gameOver: {},
            setGameOver: mockSetGameOver,
          }}
        >
          <Keyboard />
        </AppContext.Provider>
      );
      
      const data = { data: { valid: true }};
      axios.get.mockResolvedValueOnce(data);
      fireEvent.click(screen.getByText('ENTER'));

      expect(axios.get).toBeCalledWith("https://api.api-ninjas.com/v1/dictionary?word=abbbc", expect.objectContaining({}));
      await waitFor(() => expect(mockSetCurrAttempt).toBeCalled());
      
      expect(mockSetGameOver).toBeCalledWith({ gameOver: true, guessedCorrect: false });
    });
  });  
});
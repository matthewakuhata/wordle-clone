import Key from "../Key";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("GIVEN a Key with value Q", () => {
  describe("WHEN clicking the key", () => {
    const mockOnSelectKey = jest.fn();
    const mockOnSubmitGuess = jest.fn();
    const mockOnDeleteLetter = jest.fn();
    const keyVal = "Q";
    test("THEN onSelectKey should fire", () => {
      render(
        <Key
          keyVal={keyVal}
          big={false}
          onSelectKey={mockOnSelectKey}
          onSubmitGuess={mockOnSubmitGuess}
          onDeleteLetter={mockOnDeleteLetter}
          state="neutral"
        />
      );

      const button = screen.getByText("Q");
      userEvent.click(button);
      expect(mockOnSelectKey).toBeCalled();
      expect(mockOnSelectKey).toBeCalledWith("Q");
    });
  });
});

describe("GIVEN a key with value ENTER", () => {
  describe("WHEN clicking on the key", () => {
    const mockOnSelectKey = jest.fn();
    const mockOnSubmitGuess = jest.fn();
    const mockOnDeleteLetter = jest.fn();
    const keyVal = "ENTER";

    test("THEN onSubmitGuess should run", () => {
      render(
        <Key
          keyVal={keyVal}
          big={false}
          onSelectKey={mockOnSelectKey}
          onSubmitGuess={mockOnSubmitGuess}
          onDeleteLetter={mockOnDeleteLetter}
          state="neutral"
        />
      );
      userEvent.click(screen.getByText("ENTER"));
      expect(mockOnSubmitGuess).toBeCalled();
    });
  });
});

describe("GIVEN a key with value DELETE", () => {
  describe("WHEN clicking on the key", () => {
    const mockOnSelectKey = jest.fn();
    const mockOnSubmitGuess = jest.fn();
    const mockOnDeleteLetter = jest.fn();
    const keyVal = "DELETE";

    test("THEN onSubmitGuess should run", () => {
      render(
        <Key
          keyVal={keyVal}
          big={false}
          onSelectKey={mockOnSelectKey}
          onSubmitGuess={mockOnSubmitGuess}
          onDeleteLetter={mockOnDeleteLetter}
          state="neutral"
        />
      );
      userEvent.click(screen.getByText("DELETE"));
      expect(mockOnDeleteLetter).toBeCalled();
    });
  });
});

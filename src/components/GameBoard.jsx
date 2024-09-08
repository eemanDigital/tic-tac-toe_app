import React from "react";

// GameBoard component to render the Tic-Tac-Toe board
const GameBoard = ({ onSelectSquare, board }) => {
  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  // Call onSelectSquare with the row and column index when the button is clicked
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                  // Disable the button if the square has already been clicked (playSymbol is not null)
                  disabled={playSymbol !== null}>
                  {playSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
};

export default GameBoard;

import { useState } from "react";

const GameBoard = ({ onSelectSquare, board }) => {
  // const [gameBoard, setGameBoard] = useState(initialGameBoard);
  // console.log(turns);

  // const handleSelectSquare = (rowIndex, colIndex) => {
  //   setGameBoard((prevGameBoard) => {
  //     // create a copy of the old array
  //     const updatedBoard = [
  //       ...prevGameBoard.map((innerArray) => [...innerArray]), //a copy of the inner array
  //     ];
  //     updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
  //     return updatedBoard;
  //   });
  //   // executes when handleSelectSquare is triggered
  //   onSelectSquare();
  // };
  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                  //if player symbol is null it means the button has not been clicked
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

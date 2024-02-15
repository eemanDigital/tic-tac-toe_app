import { useState } from "react";
import GameBoard from "./components/GameBoard";
import GameOver from "./GameOver";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winningCombination";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],

  // We don't want to lose the previous state and we must update the state Array. It is advisable to update array in an immutable way. You create a copy of the obj or arr, so that you don't loose the old value.
];

// helper function for our derived state- this does not need access to the state
function derivedActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function App() {
  const [players, setPlayers] = useState({ X: "Player 1", O: "Player 2" });
  const [gameTurns, setGameTurns] = useState([]);
  // const [activePlayer, setActivePlayer] = useState("X");
  // derived state - instead of using a state to manage active player, we
  // use derived state instead. We should minimise usage of state as much
  //as possible if derived state can be a replacement
  const activePlayer = derivedActivePlayer(gameTurns);

  // handles player name
  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayer) => {
      // we dynamically set the key ppty
      return { ...prevPlayer, [symbol]: newName };
    });
  }

  //loop through the initial state of the game board
  let gameBoard = [...initialGameBoard.map((array) => [...array])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  //determining the winner
  // loop through the WINNING_COMBINATIONS
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    // checking the winner
    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }

  //determining a draw
  //if all the nine squares are clicked, and winner is false
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((currentActive) => (currentActive === "X" ? "O" : "X"));

    setGameTurns((prevTurns) => {
      const currentPlayer = derivedActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }
  // console.log(gameTurns);

  function handleRestart() {
    setGameTurns([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;

// Lifting the state up- this is a situation where some components works with a state together. the components have access to the info in the state together. Here the app component is passing the state value to both the Player and GameBoard components
// Derived State:

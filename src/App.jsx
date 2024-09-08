import { useState } from "react";
import GameBoard from "./components/GameBoard";
import GameOver from "./GameOver";
import Player from "./components/Player";
import Log from "./components/Log";
import {
  PLAYERS,
  deriveWinner,
  derivedActivePlayer,
  derivedGameBoard,
} from "./utils";

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  // const [activePlayer, setActivePlayer] = useState("X");
  // derived state - instead of using a state to manage active player, we
  // use derived state instead. We should minimise usage of state as much
  //as possible if derived state can be a replacement
  const activePlayer = derivedActivePlayer(gameTurns);
  const gameBoard = derivedGameBoard(gameTurns);

  // handles player name
  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayer) => {
      // we dynamically set the key ppty
      return { ...prevPlayer, [symbol]: newName };
    });
  }

  const winner = deriveWinner(gameBoard, players);

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

  function handleRestart() {
    setGameTurns([]);
  }

  return (
    <main id="app">
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
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

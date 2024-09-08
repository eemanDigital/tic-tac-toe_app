import React from "react";

// GameOver component to display the game over message and rematch button
const GameOver = ({ winner, onRestart }) => {
  return (
    <div id="game-over">
      <h2>Game Over</h2>
      {/* Display the winner if there is one, otherwise display a draw message */}
      {winner && <p>{winner} won!</p>}
      {!winner && <p>It is a draw!</p>}
      <p>
        {/* Button to restart the game */}
        <button onClick={onRestart}>Rematch</button>
      </p>
    </div>
  );
};

export default GameOver;

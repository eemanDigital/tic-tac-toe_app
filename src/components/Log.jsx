import React from "react";

// Log component to display the history of turns in the game
const Log = ({ turns }) => {
  return (
    <ol id="log">
      {turns.length > 0 ? (
        // If there are turns, map through the turns array and display each turn
        turns.map((turn) => {
          return (
            // Use a combination of row and column indices as the key for each list item
            <li key={`${turn.square.row}${turn.square.col}`}>
              {/* Display the player and the selected square's row and column */}
              {turn.player} selected {turn.square.row}, {turn.square.col}
            </li>
          );
        })
      ) : (
        // If there are no turns, display a message indicating the game is waiting to start
        <h2>Waiting for Game to Start</h2>
      )}
    </ol>
  );
};

export default Log;

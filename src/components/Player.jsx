import { useState } from "react";

// Player component to display and edit player information
const Player = ({ initialName, symbol, isActive, onChangeName }) => {
  // State to manage the player's name
  const [playerName, setPlayerName] = useState(initialName);
  // State to manage whether the player name is being edited
  const [isEditing, setIsEditing] = useState(false);

  // Handle the click event for the edit button
  function handleEditClick() {
    // Toggle the isEditing state
    setIsEditing((prev) => !prev);

    // If editing is finished, call onChangeName to update the player's name
    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }

  // Handle the change event for the input field
  function handleOnChange(event) {
    // Update the playerName state with the new value from the input field
    setPlayerName(event.target.value);
  }

  // Determine the content to display for the player's name
  let editablePlayerName = <span className="player-name">{playerName}</span>;
  if (isEditing) {
    // If the name is being edited, display an input field
    editablePlayerName = (
      <input
        type="text"
        required
        value={playerName}
        onChange={handleOnChange}
      />
    );
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {/* Display the player's name or input field */}
        {editablePlayerName}
        {/* Display the player's symbol */}
        <span className="player-symbol">{symbol}</span>
      </span>
      {/* Button to toggle between edit and save states */}
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
};

export default Player;

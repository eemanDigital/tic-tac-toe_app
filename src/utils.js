import { WINNING_COMBINATIONS } from "./winningCombination";

export const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

export const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],

  // We don't want to lose the previous state and we must update the state Array. It is advisable to update array in an immutable way. You create a copy of the obj or arr, so that you don't loose the old value.
];

// helper function for our derived state- this does not need access to the state
export function derivedActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

export function derivedGameBoard(gameTurns) {
  //loop through the initial state of the game board
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  return gameBoard;
}

export function deriveWinner(gameBoard, players) {
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
  return winner;
}

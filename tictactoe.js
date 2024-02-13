const playerOne = {
  name: "Player 1",
  wins: 0,
};

const playerTwo = {
  name: "Player 2",
  wins: 0,
};

const gameState = {
  players: [playerOne, playerTwo],
  board: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
  currentPlayer: 0,
  lastWinner: 0,
};

const board = document.querySelector(".board");
const boardSize = 3;

//create and add divs to the board. use css grid to organize the layout.
for (let row = 0; row < boardSize; row++) {
  for (let col = 0; col < boardSize; col++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.id = `${row}-${col}`;
    board.appendChild(cell);
  }
}

function startSinglePlayerGame() {
  document.querySelector(".board").style.display = "grid";
  document.querySelector(".gameMode").style.display = "none";
  document.querySelector(".scoreBoard").style.display = "flex";
  gameState.players[1].name = "Computer";
  updatePlayerNames();
}

function startTwoPlayerGame() {
  document.querySelector(".gameMode").style.display = "none";
  document.querySelector(".playerForm").style.display = "block";
}

function goBack() {
  reset();
  document.querySelector(".board").style.display = "none";

  // Show the buttons
  document.querySelector(".gameMode").style.display = "block";
  document.querySelector(".playerForm").style.display = "none";
  document.querySelector(".scoreBoard").style.display = "none";
}
function updatePlayerNames() {
  const player1Display = document.querySelector(".player1Display");
  const player2Display = document.querySelector(".player2Display");

  player1Display.innerText = gameState.players[0].name;
  player2Display.innerText = gameState.players[1].name;
}
document
  .querySelector(".playerForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    //select value of the inputs with the Id of player1 or player2 and store it in a variable. or if nothing is entered, default to string.
    const player1Name = document.getElementById("player1").value || "player 1";
    const player2Name = document.getElementById("player2").value || "player 2";

    gameState.players[0].name = player1Name;
    gameState.players[1].name = player2Name;

    updatePlayerNames();
    // select the p tag with the class of player1Display and store it in a variable. (we'll need this to add a span to it later)
    const player1Display = document.querySelector(".player1Display");
    const player2Display = document.querySelector(".player2Display");

    //create a span element. this is where innerText will be updated.
    const createP1 = document.createElement("span");
    const createP2 = document.createElement("span");

    //update the innerText of the span we just created.
    // createP1.innerText = player1Name;
    // createP2.innerText = player2Name;

    //lastly, append the span to the selected p tag(player1Display)
    player1Display.append(createP1);
    player2Display.append(createP2);

    document.querySelector(".playerForm").style.display = "none";
    document.querySelector(".board").style.display = "grid";
    document.querySelector(".scoreBoard").style.display = "flex";
  });

let gameEnded = false;

function handleBoardClick(event) {
  if (gameState.players[1].name !== "Computer") {
    handleBoardClickTwo(event);
  } else {
    handleBoardClickSingle(event);
  }
}

function handleBoardClickTwo(event) {
  if (gameEnded) {
    console.log("The game has already ended!");
    return;
  }
  const row = event.target.id[0];
  const col = event.target.id[2];

  if (gameState.board[row][col] !== null) {
    console.log("Cell already clicked!");

    return;
  }

  gameState.board[row][col] = gameState.currentPlayer;
  if (gameState.currentPlayer === 0) {
    event.target.innerText = "X";
  } else {
    event.target.innerText = "O";
  }
  checkWin(row, col);

  gameState.currentPlayer = 1 - gameState.currentPlayer;
}
console.log(gameState.board);

//ends

function handleBoardClickSingle(event) {
  if (gameEnded) {
    console.log("The game has already ended!");
    return;
  }
  const row = event.target.id[0];
  const col = event.target.id[2];

  if (gameState.board[row][col] !== null) {
    console.log("Cell already clicked!");

    return;
  }

  console.log("lastWinner:", gameState.lastWinner);
  console.log("current player:", gameState.currentPlayer);

  gameState.board[row][col] = 0;
  event.target.innerText = "X";
  checkWinSinglePlayer();
  if (!gameEnded) {
    computerMove();
    checkWinSinglePlayer();
  }

  console.log("current player:", gameState.currentPlayer);
}

board.addEventListener("click", handleBoardClick);

function computerMove() {
  const emptyCells = getEmptyCells();
  console.log("game ended?", gameEnded);
  if (gameEnded || emptyCells.length === 0) {
    return;
  }

  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const randomCell = emptyCells[randomIndex];
  const [row, col] = randomCell;

  if (gameState.board[row][col] === null) {
    gameState.board[row][col] = 1;
    const cellId = `${row}-${col}`;
    const computerCell = document.getElementById(cellId);
    computerCell.innerText = "O";
  }
}

function getEmptyCells() {
  const emptyCells = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (gameState.board[i][j] === null) {
        emptyCells.push([i, j]);
      }
    }
  }
  return emptyCells;
}

function resetScores() {
  gameState.players.forEach((player) => {
    player.wins = 0;
  });
  updateScore(); // Update the displayed scores
}

function reset() {
  gameState.board = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  gameState.players[0].name = "Player 1";
  gameState.players[1].name = "Player 2";
  gameEnded = false;
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.innerText = ""; // Reset the innerText of each cell
  });
  resetScores();
}

function resetBoard() {
  gameState.board = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
  gameEnded = false;
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.innerText = ""; // Reset the innerText of each cell
  });
}

function checkWin(row, col) {
  let hasWon = false;

  //checks rows for win
  for (let i = 0; i < 3; i++) {
    if (
      gameState.board[i][0] !== null &&
      gameState.board[i][0] === gameState.board[i][1] &&
      gameState.board[i][1] === gameState.board[i][2]
    ) {
      hasWon = true;
    }
  }

  //checks columns for win
  for (let i = 0; i < 3; i++) {
    if (
      gameState.board[0][i] !== null &&
      gameState.board[0][i] === gameState.board[1][i] &&
      gameState.board[1][i] === gameState.board[2][i]
    ) {
      hasWon = true;
    }
  }

  if (
    gameState.board[0][0] !== null &&
    gameState.board[0][0] === gameState.board[1][1] &&
    gameState.board[1][1] === gameState.board[2][2]
  ) {
    hasWon = true;
  }

  if (
    gameState.board[0][2] !== null &&
    gameState.board[0][2] === gameState.board[1][1] &&
    gameState.board[1][1] === gameState.board[2][0]
  ) {
    hasWon = true;
  }

  if (hasWon) {
    let winnerName;
    const lastMove = gameState.board[row][col];
    if (gameState.players[1].name === "Computer") {
      if (lastMove === "0") {
        console.log("last move was 0?", lastMove);
        gameState.lastWinner = 0;
        winnerName = gameState.players[0].name;
        gameState.players[0].wins++;
      } else {
        console.log("last move was 0?", lastMove);
        gameState.lastWinner = 1;
        winnerName = gameState.players[1].name;
        gameState.players[1].wins++;
      }
    } else {
      winnerName = gameState.players[gameState.currentPlayer].name;
      console.log(`${winnerName} wins!`);
      gameState.players[gameState.currentPlayer].wins++;
    }

    gameEnded = true;

    updateScore();
    document.querySelector(".winnerText").innerText = `${winnerName} wins!`;
    document.querySelector(".overlay").style.display = "flex";
    console.log(gameEnded);
    return;
  } else if (checkTie()) {
    gameEnded = true;

    document.querySelector(".winnerText").innerText = "it's a tie!";
    document.querySelector(".overlay").style.display = "flex";
  }
}

function checkWinSinglePlayer() {
  let playerHasWon = false;
  let computerHasWon = false;

  //checks rows for win
  for (let i = 0; i < 3; i++) {
    if (
      gameState.board[i][0] !== null &&
      gameState.board[i][0] === gameState.board[i][1] &&
      gameState.board[i][1] === gameState.board[i][2]
    ) {
      if (gameState.board[i][0] === 0) {
        playerHasWon = true;
      } else if (gameState.board[i][0] === 1) {
        computerHasWon = true;
      }
    }
  }

  //checks columns for win
  for (let i = 0; i < 3; i++) {
    if (
      gameState.board[0][i] !== null &&
      gameState.board[0][i] === gameState.board[1][i] &&
      gameState.board[1][i] === gameState.board[2][i]
    ) {
      if (gameState.board[0][i] === 0) {
        playerHasWon = true;
      } else if (gameState.board[0][i] === 1) {
        computerHasWon = true;
      }
    }
  }

  if (
    gameState.board[0][0] !== null &&
    gameState.board[0][0] === gameState.board[1][1] &&
    gameState.board[1][1] === gameState.board[2][2]
  ) {
    if (gameState.board[0][0] === 0) {
      playerHasWon = true;
    } else if (gameState.board[0][0] === 1) {
      computerHasWon = true;
    }
  }

  if (
    gameState.board[0][2] !== null &&
    gameState.board[0][2] === gameState.board[1][1] &&
    gameState.board[1][1] === gameState.board[2][0]
  ) {
    if (gameState.board[0][2] === 0) {
      playerHasWon = true;
    } else if (gameState.board[0][2] === 1) {
      computerHasWon = true;
    }
  }
  let winnerName;
  if (playerHasWon) {
    winnerName = gameState.players[0].name;
    gameState.players[0].wins++;
    gameEnded = true;

    updateScore();
    document.querySelector(".winnerText").innerText = `${winnerName} wins!`;
    document.querySelector(".overlay").style.display = "flex";
    console.log(gameEnded);
    return;
  } else if (computerHasWon) {
    winnerName = gameState.players[1].name;
    gameState.players[1].wins++;
    gameEnded = true;

    updateScore();
    document.querySelector(".winnerText").innerText = `${winnerName} wins!`;
    document.querySelector(".overlay").style.display = "flex";
    console.log(gameEnded);
    return;
  } else if (checkTie()) {
    gameEnded = true;

    document.querySelector(".winnerText").innerText = "it's a tie!";
    document.querySelector(".overlay").style.display = "flex";
  }
}

function checkTie() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const currentCell = gameState.board[i][j];
      if (currentCell === null) {
        return false;
      }
    }
  }
  console.log("it's a tie!");
  return true;
}

function playAgain() {
  // Hide overlay
  document.querySelector(".overlay").style.display = "none";
  resetBoard();
  gameEnded = false;
  if (gameState.players[1].name === "Computer" && gameState.lastWinner === 0) {
    computerMove();
  }

  console.log("lastWinner:", gameState.lastWinner);
  console.log("current player:", gameState.currentPlayer);
}

function updateScore() {
  const p1Score = document.querySelector(".p1Score");
  const p2Score = document.querySelector(".p2Score");

  p1Score.innerHTML = "";
  p2Score.innerHTML = "";

  const newP1Score = document.createElement("span");
  const newP2Score = document.createElement("span");

  newP1Score.innerText = gameState.players[0].wins;
  newP2Score.innerText = gameState.players[1].wins;

  p1Score.appendChild(newP1Score);
  p2Score.appendChild(newP2Score);
}

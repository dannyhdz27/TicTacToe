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

function startGame() {}

function startSinglePlayerGame() {
  document.querySelector(".board").style.display = "grid";
  document.querySelector(".gameMode").style.display = "none";
}

function startTwoPlayerGame() {
  document.querySelector(".gameMode").style.display = "none";
  document.querySelector(".playerForm").style.display = "block";
}

document
  .querySelector(".playerForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    //select value of the inputs with the Id of player1 or player2 and store it in a variable. or if nothing is entered, default to string.
    const player1Name = document.getElementById("player1").value || "player 1";
    const player2Name = document.getElementById("player2").value || "player 2";

    // select the p tag with the class of player1Display and store it in a variable. (we'll need this to add a span to it later)
    const player1Display = document.querySelector(".player1Display");
    const player2Display = document.querySelector(".player2Display");

    //create a span element. this is where innerText will be updated.
    const createP1 = document.createElement("span");
    const createP2 = document.createElement("span");

    //update the innerText of the span we just created.
    createP1.innerText = player1Name;
    createP2.innerText = player2Name;

    //lastly, append the span to the selected p tag(player1Display)
    player1Display.append(createP1);
    player2Display.append(createP2);

    gameState.players[0] = player1Name;
    gameState.players[1] = player2Name;

    document.querySelector(".playerForm").style.display = "none";
    document.querySelector(".board").style.display = "grid";
    document.querySelector(".scoreBoard").style.display = "block";
    console.log(gameState.players[0]);
  });

board.addEventListener("click", (event) => {
  const row = event.target.id[0];
  const col = event.target.id[2];

  if (gameState.board[row][col] !== null) {
    console.log("Cell already clicked!");
    return;
  }

  gameState.board[row][col] = gameState.currentPlayer;
  event.target.innerText = gameState.players[gameState.currentPlayer];
  gameState.currentPlayer = 1 - gameState.currentPlayer;

  console.log(gameState.board);
  console.log("you clicked box with id", row, col);
  updateBoardDisplay();
});

function updateBoardDisplay() {}

console.log(gameState.board);

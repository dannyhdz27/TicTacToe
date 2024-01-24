const board = document.querySelector(".board");
const boardSize = 3;

for (let row = 0; row < boardSize; row++) {
  for (let col = 0; col < boardSize; col++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.id = `${row}-${col}`;
    board.appendChild(cell);
  }
}

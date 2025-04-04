import "./style.scss";

const numOfSquares: number = 16;

const board = document.getElementById<HTMLDivElement>("board");

if (!board) {
  throw new Error("There was a problem trying to select an element");
}

for (let i = 0; i < numOfSquares; i++) {
  const tile = document.createElement("div");
  tile.classList.add("container__board--tile");
  tile.id = `${i}`;
  board.appendChild(tile);
}

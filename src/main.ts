import "./style.scss";
import { getRandomTile } from "./utils";

let numOfSquares: number = 16;
let sequence: number = 4;
let gameInterval: number = 2000;
let currTile: string;

const board = document.getElementById("board");
const startButton = document.querySelector<HTMLButtonElement>("#start");

if (!board || !startButton) {
  throw new Error("There was a problem trying to select an element");
}

// Sets up the board
for (let i = 0; i < numOfSquares; i++) {
  const tile = document.createElement("div");
  tile.classList.add("container__board--tile");
  tile.id = i.toString();
  board?.appendChild(tile);
}

// Initiates pattern
function startPattern() {
  setInterval(() => {
    if (sequence > 0) {
      setTile();
      sequence--;
    } else {
      clearInterval(gameInterval);
      removeTileColour();
    }
  }, gameInterval);
}

// Changes tile to Green
const changeTileColour = () => {
  const index: string = getRandomTile(numOfSquares);
  currTile = index;
  const tile = document.getElementById(index);

  tile?.classList.remove("container__board--tile");
  tile?.classList.add("container__board--tile--change");
};

// Changes tile back to Red
const removeTileColour = (): string | undefined => {
  const tile = document.getElementById(currTile);
  tile?.classList.remove("container__board--tile--change");
  tile?.classList.add("container__board--tile");

  return tile?.id;
};

// Controls tile flow
const setTile = () => {
  if (currTile) {
    const id = removeTileColour();
    if (id) {
      currTile = id;
    }
  }

  changeTileColour();
};

// Starts pattern on button press
startButton.addEventListener("click", startPattern);

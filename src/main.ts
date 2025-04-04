import "./style.scss";
import { getRandomTile } from "./utils";

let numOfSquares: number = 16;
let numOfSequences: number = 4;
let gameInterval: number = 2000;
let currTile: string;
let sequence: string[] = [];

const board = document.getElementById("board");
const overlay = document.getElementById("overlay");
const startButton = document.querySelector<HTMLButtonElement>("#start");

if (!board || !startButton || !overlay) {
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
  if (startButton) {
    startButton.disabled = true;
  }

  setInterval(() => {
    if (numOfSequences > 0) {
      setTile();
      numOfSequences--;
      console.log(sequence);
    } else {
      clearInterval(gameInterval);

      removeTileColour();

      showOverlay();
    }
  }, gameInterval);
}

// Changes tile to Green
const changeTileColour = () => {
  const index: string = getRandomTile(numOfSquares);

  if (currTile === index) {
    changeTileColour();
    return;
  }

  currTile = index;
  sequence.push(index);
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

// Show overlay
const showOverlay = () => {
  overlay.style.visibility = "visible";

  setTimeout(() => {
    overlay.style.visibility = "hidden";
  }, 2000);
};

// Starts pattern on button press
startButton.addEventListener("click", startPattern);

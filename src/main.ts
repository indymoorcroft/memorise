import "./style.scss";
import { checkCorrect, checkCorrectSequence, getRandomTile } from "./utils";

let numOfSquares: number = 16;
let numOfSequences: number = 4;
let gameInterval: number = 2000;
let currTile: string;

const sequence: string[] = [];
const userSequence: string[] = [];

const board = document.getElementById("board");
const overlay = document.getElementById("overlay");
const startButton = document.querySelector<HTMLButtonElement>("#start");

if (!board || !startButton || !overlay) {
  throw new Error("There was a problem trying to select an element");
}

// Sets up the board
const setGame = () => {
  for (let i = 0; i < numOfSquares; i++) {
    const tile = document.createElement("div");
    tile.classList.add("container__board--tile");
    tile.id = i.toString();
    board?.appendChild(tile);
  }
};

// Initiates pattern
const startPattern = () => {
  if (startButton) {
    startButton.disabled = true;
  }

  setInterval(() => {
    if (numOfSequences > 0) {
      setTile();
      numOfSequences--;
    } else {
      changeTile(currTile, "remove");
      showOverlay();
      clearInterval(gameInterval);
    }
  }, gameInterval);
};

// Gets random tile
const selectTile = () => {
  const index: string = getRandomTile(numOfSquares);

  if (currTile === index) {
    selectTile();
    return;
  }

  currTile = index;
  sequence.push(index);
  changeTile(index, "add");
};

// Changes colour of the tile
const changeTile = (id: string, type: string): string | undefined => {
  const tile = document.getElementById(id);

  if (type === "add") {
    tile?.classList.remove("container__board--tile");
    tile?.classList.add("container__board--tile--change");
  } else {
    tile?.classList.remove("container__board--tile--change");
    tile?.classList.add("container__board--tile");
  }

  return tile?.id;
};

// Controls tile flow
const setTile = () => {
  if (currTile) {
    const id = changeTile(currTile, "remove");
    if (id) {
      currTile = id;
    }
  }

  selectTile();
};

// Show overlay
const showOverlay = () => {
  overlay.style.visibility = "visible";

  setTimeout(() => {
    overlay.style.visibility = "hidden";
    board.style.pointerEvents = "all";
  }, 2000);
};

setGame();

// Handles User Guesses
const handleClick = (event: Event) => {
  if (!event.target) return;

  const tileId = (event.target as Element).id;

  if (userSequence.length < sequence.length) {
    const isCorrect = checkCorrect(sequence, tileId);

    if (isCorrect) {
      changeTile(tileId, "add");
      userSequence.push(tileId);
    } else {
      alert("wrong! game over");
    }
  } else {
    const isAllCorrect = checkCorrectSequence(sequence, userSequence);

    if (isAllCorrect) {
      changeTile(tileId, "add");
      alert("you win!");
    }
  }
};

// Starts pattern on button press
startButton.addEventListener("click", startPattern);

// handles user click on buttons
board.addEventListener("click", handleClick);

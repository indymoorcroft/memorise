import "./style.scss";
import { checkCorrect, checkCorrectSequence, getRandomTile } from "./utils";

type Result = {
  result: string;
  message: string;
};

let numOfSquares: number = 16;
let numOfSequences: number = 4;
let intervalTime: number = 2000;
let currTile: string;
let level = 1;

let sequence: string[] = [];
let userSequence: string[] = [];

const board = document.getElementById("board");
const overlay = document.getElementById("overlay");
const overlayText = document.querySelector<HTMLTextAreaElement>(
  ".overlay__card--text"
);
const overlayButton = document.querySelector<HTMLDivElement>(
  ".overlay__card--button"
);
const startButton = document.querySelector<HTMLButtonElement>("#start");
const levelStr = document.querySelector<HTMLHeadingElement>(".level");

if (
  !board ||
  !startButton ||
  !overlay ||
  !overlayText ||
  !overlayButton ||
  !levelStr
) {
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

  let sequenceCount = numOfSequences;

  const intervalId = setInterval(() => {
    if (sequenceCount > 0) {
      setTile();
      sequenceCount--;
    } else {
      changeTile(currTile, "remove");
      showOverlay();
      clearInterval(intervalId);
    }
  }, intervalTime);
};

// Gets random tile
const selectTile = () => {
  const index: string = getRandomTile(numOfSquares);

  if (currTile === index || sequence.includes(index)) {
    return selectTile();
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

// Shows overlay based on game ending
const gameOver = ({ result, message }: Result) => {
  overlay.style.visibility = "visible";

  if (result === "failed") {
    overlayText.innerHTML = `${message}`;
    overlayButton.innerHTML = '<button id="restart">Restart</button>';
  } else {
    overlayText.innerHTML = `${message}`;
    overlayButton.innerHTML = '<button id="next-level">Next Level</button>';
  }
};

// Resets the game based on previous result
const resetGame = (result: string) => {
  const tiles = document.querySelectorAll(".container__board--tile--change");

  tiles.forEach((tile) => {
    tile?.classList.remove("container__board--tile--change");
    tile?.classList.add("container__board--tile");
  });

  overlayText.innerHTML = "Your turn";
  overlayButton.innerHTML = "";
  overlay.style.visibility = "hidden";
  sequence = [];
  userSequence = [];
  currTile = "";
  startButton.disabled = false;
  board.style.pointerEvents = "none";

  if (result === "next-level") {
    levelStr.innerText = `Level ${(level += 1)}`;
    level % 3 === 0 ? (numOfSequences = numOfSequences + 1) : null;
    intervalTime = intervalTime - 50;
  }
};

setGame();

// Handles User Guesses
const handleUserGuess = (event: Event) => {
  if (!event.target) return;

  const tileId = (event.target as Element).id;

  const isCorrect = checkCorrect(sequence, tileId);

  if (isCorrect) {
    changeTile(tileId, "add");
    userSequence.push(tileId);

    if (userSequence.length === sequence.length) {
      const isAllCorrect = checkCorrectSequence(sequence, userSequence);
      if (isAllCorrect) {
        gameOver({
          result: "passed",
          message: "Correct!",
        });
      } else {
        gameOver({
          result: "failed",
          message: "Right squares... wrong order! Try again.",
        });
      }
    }
  } else {
    gameOver({
      result: "failed",
      message: "Incorrect. Try again.",
    });
  }
};

const handleEndGameClick = (event: Event) => {
  const buttonId = (event.target as Element).id;

  resetGame(buttonId);
};

// Starts pattern on button press
startButton.addEventListener("click", startPattern);

// handles user click on buttons
board.addEventListener("click", handleUserGuess);

overlayButton.addEventListener("click", handleEndGameClick);

import "./style.scss";
import { checkCorrect, getFirstTile, getNextTile } from "./utils";

type Result = {
  result: string;
  message: string;
};

let numOfSquares: number = 16;
let intervalTime: number = 2000;
let currTile: string;
let level: number = 1;
let lives: number = 3;
let rows: number = 4;
let edgeNums: number[] = [1, 4, 5, 8, 9, 12];

let sequence: string[] = [];
let userSequence: string[] = [];
let guesses = 0;

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
const audio = document.querySelector<HTMLAudioElement>("#audio");

if (
  !board ||
  !startButton ||
  !overlay ||
  !overlayText ||
  !overlayButton ||
  !levelStr ||
  !audio
) {
  throw new Error("There was a problem trying to select an element");
}

// Sets up the board
const setGame = () => {
  if (board.lastElementChild) {
    while (board.lastElementChild) {
      board.removeChild(board.lastElementChild);
    }
  }

  for (let i = numOfSquares; i > 0; i--) {
    const tile = document.createElement("div");
    tile.classList.add("container__board--tile");
    tile.id = i.toString();
    board?.appendChild(tile);
  }
};

// Initiates pattern
const startPattern = () => {
  startButton.disabled = true;

  const intervalId = setInterval(() => {
    if (!currTile || +currTile <= numOfSquares - rows) {
      selectTile();
    } else {
      changeTile(currTile, "remove");
      showOverlay();
      clearInterval(intervalId);
    }
  }, intervalTime);
};

// Controls tile flow
const selectTile = () => {
  let index: string;

  if (!currTile) {
    index = getFirstTile(rows);
  } else {
    changeTile(currTile, "remove");
    index = getNextTile(+currTile, rows, edgeNums);
  }

  if (currTile === index || sequence.includes(index)) {
    return selectTile();
  }

  currTile = index;
  sequence.push(index);
  changeTile(index, "add");

  playAudio("audio/zapsplat_multimedia_game_sound_simple_menu_beep_113383.mp3");
};

// Changes colour of the tile
const changeTile = (id: string, type: string) => {
  const tile = document.getElementById(id);

  if (type === "add") {
    tile?.classList.remove("container__board--tile");
    tile?.classList.add("container__board--tile--change");
  } else {
    tile?.classList.remove("container__board--tile--change");
    tile?.classList.add("container__board--tile");
  }
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
const handleResult = ({ result, message }: Result) => {
  overlay.style.visibility = "visible";

  if (result === "failed") {
    playAudio(
      "audio/zapsplat_multimedia_game_sound_retro_arcade_lo_fi_fail_lose_life_004_107586.mp3"
    );
    overlayText.innerHTML = `${message}`;
    overlayButton.innerHTML = '<button id="restart">Restart</button>';
  } else if (result === "passed") {
    playAudio(
      "audio/zapsplat_multimedia_game_sound_orchestral_end_win_107266.mp3"
    );

    overlayText.innerHTML = `${message}`;
    overlayButton.innerHTML = '<button id="next-level">Next Level</button>';
  } else {
    playAudio(
      "audio/zapsplat_multimedia_male_voice_processed_says_game_over_002_23669.mp3"
    );
    overlayText.innerHTML = `${message}`;
    overlayButton.innerHTML = '<button id="game-over">Restart</button>';
  }
};

// Resets the game based on previous result
const resetGame = (event: Event) => {
  const result = (event.target as Element).id;

  const changedTiles = document.querySelectorAll(
    ".container__board--tile--change"
  );

  changedTiles.forEach((tile) => {
    tile?.classList.remove("container__board--tile--change");
    tile?.classList.add("container__board--tile");
  });

  overlayText.innerHTML = "Your turn";
  overlayButton.innerHTML = "";
  overlay.style.visibility = "hidden";
  sequence = [];
  userSequence = [];
  guesses = 0;
  currTile = "";
  startButton.disabled = false;
  board.style.pointerEvents = "none";

  if (result === "game-over") {
    gameOver();
  }

  if (result === "next-level") {
    nextLevel();
  }
};

const gameOver = () => {
  numOfSquares = 16;
  intervalTime = 2000;
  lives = 3;
  level = 1;
  levelStr.innerText = `Level ${level}`;
  edgeNums = [1, 4, 5, 8, 9, 12];
  setGame();
};

const nextLevel = () => {
  levelStr.innerText = `Level ${(level += 1)}`;
  intervalTime = intervalTime - 250;

  if (level === 5 || level === 10) {
    intervalTime = 2000;
    if (level === 5) {
      numOfSquares = 36;
      rows = 6;
      edgeNums = [1, 6, 7, 12, 13, 18, 19, 24, 25, 30];
    } else {
      numOfSquares = 64;
      rows = 8;
      edgeNums = [1, 8, 9, 16, 17, 24, 25, 32, 33, 40, 41, 48, 49, 56];
    }

    setGame();

    const allTiles = document.querySelectorAll<HTMLDivElement>(
      ".container__board--tile"
    );

    allTiles.forEach((tile) => {
      level === 5 ? (tile.style.width = "16%") : (tile.style.width = "12%");

      level === 5 ? (tile.style.height = "16%") : (tile.style.height = "12%");
    });
  }
};

const playAudio = (url: string) => {
  audio.src = url;
  audio.play();
};

setGame();

// Handles User Guesses
const handleUserGuess = (event: Event) => {
  playAudio(
    "audio/zapsplat_vehicles_car_radio_button_soft_rubber_press_on_002_113479.mp3"
  );

  if (!event.target) return;

  const tileId = (event.target as Element).id;

  userSequence.push(tileId);
  guesses += 1;

  const isCorrect = checkCorrect(sequence, userSequence, guesses);

  if (isCorrect) {
    changeTile(tileId, "add");

    if (userSequence.length === sequence.length) {
      handleResult({
        result: "passed",
        message: "Correct!",
      });
    }
  } else {
    lives--;

    if (lives > 0) {
      handleResult({
        result: "failed",
        message: `Incorrect. Try again. You have ${lives} lives remaining`,
      });
    } else {
      handleResult({
        result: "no lives",
        message: `Oh no! You have ${lives} lives remaining. Back to Level 1`,
      });
    }
  }
};

// Starts pattern on button press
startButton.addEventListener("click", startPattern);

// Handles user guesses
board.addEventListener("click", handleUserGuess);

// Progresses or resets the game
overlayButton.addEventListener("click", resetGame);

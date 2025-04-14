# memorise

## Project Breakdown

### HTML

- [x] Container

  - [x] Board

- [x] Overlay

- [x] Buttons

  - [x] Start Game
  - [x] Restart Game
  - [x] Next Level

- [x] Level

### SCSS

- [x] Style the board
- [x] Style the tiles to fill the board 4 x 4
- [ ] Style the buttons
- [x] Make the board responsive on all devices

### TS Logic

- [x] Dynamically create tiles
- [x] Use set interval to randomly change colour of tiles in a sequence
- [x] Store sequence in array
- [x] eventListeners: clicks
  - [x] click to start the pattern
  - [x] check that clicks match stored sequence
- [x] Change overlay depending on success/failure of game
- [x] Change speed & number of tiles selected based on level achieved
- [x] Change board to 5 x 5 then 6 x 6 based on level achieved
- [x] Pattern to run from bottom to top
- [x] User gets 3 tries then the game resets to Level 1
- [x] Check pattern is in the right order and end turn if incorrect

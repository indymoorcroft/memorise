import { checkCorrect, getFirstTile, getNextTile } from "../utils";

describe("getFirstTile()", () => {
  test("returns a truthy value", () => {
    expect(getFirstTile(4)).toBeTruthy();
  });

  test("returns a number between 1 and the parameter given", () => {
    expect(getFirstTile(2)).toMatch(/1|2/);
    expect(getFirstTile(4)).toMatch(/1|2|3|4/);
  });
});

let currTile = 1;
let row = 4;
let edgeNums = [1, 4, 5, 8];

describe("getNextTile()", () => {
  test("returns a truthy value", () => {
    expect(getNextTile(currTile, row, edgeNums)).toBeTruthy();
  });

  test("returns either (currTile + 1) OR (currTile + row) when the current tile exists in the edgeNum array AND the currTile is odd", () => {
    expect(getNextTile(currTile, row, edgeNums)).toMatch(/2|5/);
  });

  test("returns either (currTile - 1) OR (currTile + row) when the current tile exists in the edgeNum array AND the currTile is even", () => {
    currTile = 4;
    expect(getNextTile(currTile, row, edgeNums)).toMatch(/3|8/);
  });

  test("returns either (currTile + 1) OR (currTile - 1) OR (currTile + row) when the current tile does not exist in the edgeNum array", () => {
    currTile = 2;
    expect(getNextTile(currTile, row, edgeNums)).toMatch(/1|3|6/);
  });
});

let guesses = 0;

describe("checkCorrect()", () => {
  test("returns true when passed two empty arrays and 0 guesses", () => {
    expect(checkCorrect([], [], guesses)).toBe(true);
  });

  test("returns false when passed two different arrays", () => {
    guesses = 1;
    expect(checkCorrect(["1"], ["2"], guesses)).toBe(false);
  });

  test("returns false when passed two matching arrays but guesses does not match the length of the second array", () => {
    guesses = 2;
    expect(checkCorrect(["1", "2", "3"], ["1", "2", "3"], guesses)).toBe(false);
  });

  test("returns true when passed two matching arrays and guesses matches the length of the second array", () => {
    guesses = 3;
    expect(checkCorrect(["1", "2", "3"], ["1", "2", "3"], guesses)).toBe(true);
  });
});

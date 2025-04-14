export const getFirstTile = (rows: number): string => {
  let num: number = Math.ceil(Math.random() * rows);

  return num.toString();
};

export const getNextTile = (
  currTile: number,
  row: number,
  edgeNums: number[]
): string => {
  if (edgeNums.includes(currTile)) {
    let num: number = Math.ceil(Math.random() * 2);

    if (currTile % 2 === 0) {
      return num === 1
        ? (currTile - 1).toString()
        : (currTile + row).toString();
    } else {
      return num === 1
        ? (currTile + 1).toString()
        : (currTile + row).toString();
    }
  }

  let num: number = Math.ceil(Math.random() * 3);

  if (num === 1) {
    return (currTile + 1).toString();
  } else if (num === 2) {
    return (currTile - 1).toString();
  } else {
    return (currTile + row).toString();
  }
};

export const checkCorrect = (
  sequence: string[],
  userSequence: string[],
  guesses: number
): boolean => {
  const slicedArray = sequence.slice(0, guesses);

  return JSON.stringify(slicedArray) === JSON.stringify(userSequence);
};

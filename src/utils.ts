export const getRandomTile = (numOfSquares: number): string => {
  let num: number = Math.floor(Math.random() * numOfSquares);

  return num.toString();
};

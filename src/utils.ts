export const getRandomTile = (numOfSquares: number): string => {
  let num: number = Math.floor(Math.random() * numOfSquares);

  return num.toString();
};

export const checkCorrect = (sequence: string[], selected: string): boolean => {
  return sequence.includes(selected);
};

export const checkCorrectSequence = (
  sequence: string[],
  userSequence: string[]
): boolean => {
  return JSON.stringify(sequence) === JSON.stringify(userSequence);
};

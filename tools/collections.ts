export const getNumbersArray = (n: number): Array<number> => {
  return Array.from({length: n}, (_: unknown, i: number) => i + 1);
};
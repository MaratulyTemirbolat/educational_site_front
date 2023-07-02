export function getRandomNumber(limit: number = 0): number {
  return Math.floor(Math.random()*limit + 1);
};
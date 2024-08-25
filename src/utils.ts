function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isWithinBounds(index: number, length: number): boolean {
  return Number.isInteger(index) && index >= 0 && index < length;
}

export { getRandomInt, isWithinBounds };

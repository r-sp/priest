export const round = (
  number: number,
  digits = 0,
  base = Math.pow(10, digits),
): number => {
  return Math.round(base * number) / base + 0;
};

export const floor = (
  number: number,
  digits = 0,
  base = Math.pow(10, digits),
): number => {
  return Math.floor(base * number) / base + 0;
};

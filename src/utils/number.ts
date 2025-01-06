export const round = (value: number, digits = 0): number => {
  const base = Math.pow(10, digits);
  return Math.round(base * value) / base + 0;
};

export const floor = (value: number, digits = 0): number => {
  const base = Math.pow(10, digits);
  return Math.floor(base * value) / base + 0;
};

export const limit = (value: number, min: number, max: number): number => {
  return Math.max(min, Math.min(value, max));
};

export const limiter = (value: number, min: number, max: number): number => {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
};

export const multiply = (value: number, min: number, max: number): number[] => {
  const range: number[] = [];
  let num = Math.ceil(min / value) * value;
  while (num <= max) {
    range.push(num);
    num += value;
  }
  return range;
};

export const percentage = (value: number, min: number, max: number): number => {
  let percent = (value / max) * 100;
  percent = Math.max(min, Math.min(100, percent));
  return round(percent, 2);
};

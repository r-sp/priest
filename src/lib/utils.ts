export const isClient = typeof window !== "undefined";
export const isServer = typeof window === "undefined";

export const round = (value: number, digits: number = 0): number => {
  if (digits === 0) {
    return Math.round(value);
  }
  if (digits < 0) {
    const base = 10 ** -digits;
    return Math.round(value / base) * base;
  }
  const base = 10 ** digits;
  return Math.round(value * base) / base;
};

export const multiply = (value: number, min: number, max: number): number[] => {
  if (value <= 0 || min > max) {
    return [];
  }
  const first = Math.ceil(min / value);
  const last = Math.floor(max / value);
  if (last < first) {
    return [];
  }
  const count = last - first + 1;
  const range: number[] = new Array(count);
  for (let i = 0; i < count; i++) {
    range[i] = (first + i) * value;
  }
  return range;
};

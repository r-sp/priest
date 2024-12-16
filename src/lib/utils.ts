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

export const limiter = (value: number, min: number, max: number): number => {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
};

export const multiplier = (
  value: number,
  min: number,
  max: number,
): number[] => {
  const range: number[] = [];
  let num = Math.ceil(min / value) * value;
  while (num <= max) {
    range.push(num);
    num += value;
  }
  return range;
};

export const slugify = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const setLocalStorage = (key: string, value: string) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.error(e);
    }
  }
};

export const getLocalStorage = (key: string) => {
  let local;
  if (typeof window !== "undefined") {
    try {
      local = localStorage.getItem(key);
    } catch (e) {
      console.error(e);
    }
  }
  return local;
};

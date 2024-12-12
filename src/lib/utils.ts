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

export const slugify = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

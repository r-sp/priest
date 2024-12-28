export function round(
  number: number,
  digits = 0,
  base = Math.pow(10, digits),
): number {
  return Math.round(base * number) / base + 0;
}

export function floor(
  number: number,
  digits = 0,
  base = Math.pow(10, digits),
): number {
  return Math.floor(base * number) / base + 0;
}

export function limit(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(value, max));
}

export function limiter(value: number, min: number, max: number): number {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
}

export function multiplier(value: number, min: number, max: number): number[] {
  const range: number[] = [];
  let num = Math.ceil(min / value) * value;
  while (num <= max) {
    range.push(num);
    num += value;
  }
  return range;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

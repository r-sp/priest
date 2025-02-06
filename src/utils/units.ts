const round = (value: number | undefined, digits: number = 0): number => {
  const current = Number(value) ?? 0;
  if (digits === 0) {
    return Math.round(current);
  }
  const str = current.toFixed(Math.abs(digits));
  return parseFloat(str);
};

const multiply = (value: number, min: number, max: number): number[] => {
  if (value <= 0 || min > max) {
    return [];
  }
  const first = Math.ceil(min / value);
  const last = Math.floor(max / value);
  if (last < first) {
    return [];
  }
  return Array.from(
    { length: last - first + 1 },
    (_, i) => (first + i) * value,
  );
};

const limiter = (value: number, min: number, max: number): number => {
  const range = max - min;
  const diff = value - min;
  const mod = diff % range;
  return (mod < 0 ? mod + range : mod) + min;
};

const copy = async (value: string): Promise<"pass" | "fail"> => {
  try {
    await navigator.clipboard.writeText(value);
    return "pass";
  } catch (e) {
    console.error(e);
    return "fail";
  }
};

export { round, multiply, limiter, copy };

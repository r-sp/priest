export const isClient = typeof window !== "undefined";
export const isServer = typeof window === "undefined";

export const isValidHex = (color: string): boolean => {
  const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const letters = ["a", "b", "c", "d", "e", "f"];
  const hex = ["#", ...numbers, ...letters];
  const check = hex.find((letter) => color.startsWith(letter));
  const valid = check ? true : false;
  return valid;
};

export const isValidColor = (color: string): boolean => {
  const space = ["r", "h", "l", "o"];
  const check = space.find((letter) => color.startsWith(letter));
  const valid = check ? true : false;
  return valid;
};

export const isValidCss = (input: string): [boolean, boolean] => {
  return [isValidHex(input), isValidColor(input)];
};

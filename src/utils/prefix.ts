import { parseCss, parseHex } from "~/lib/parse";

export const isClient = typeof window !== "undefined";
export const isServer = typeof window === "undefined";

export const isValidHex = (hex: string): string => {
  const color = parseCss(hex);
  if (typeof color === "object") {
    return parseHex(color);
  } else {
    return hex;
  }
};

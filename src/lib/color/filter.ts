import type { AnyColorMode } from "../types";
import { parseHex } from "./parse";
import { parse } from "./index";

export function isValidHex(newColor: string): string {
  const color = parse(newColor) as AnyColorMode;

  if (typeof color === "object") {
    return parseHex(color);
  } else {
    return newColor;
  }
}

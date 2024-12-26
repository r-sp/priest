import type { AnyColorMode, HslColorMode } from "../types";
import {
  parseHex,
  parseRgb,
  parseHsl,
  parseHwb,
  parseLab,
  parseLch,
  parseOklab,
  parseOklch,
} from "./parse";
import { limiter } from "../utils";

export const createColor = (newColor: AnyColorMode) => {
  return {
    hex: parseHex(newColor),
    rgb: parseRgb(newColor),
    hsl: parseHsl(newColor),
    hwb: parseHwb(newColor),
    lab: parseLab(newColor),
    lch: parseLch(newColor),
    oklab: parseOklab(newColor),
    oklch: parseOklch(newColor),
  };
};

export const initColor = (): HslColorMode => {
  const today = new Date();
  const year = today.getUTCFullYear();
  const month = today.getUTCMonth() + 1;
  const day = today.getUTCDay();

  const hue = limiter((day * year) / month, 0, 360);
  const saturation = limiter(month * 12, 0.64, 0.96);
  const lightness = limiter(day * 30, 0.32, 0.64);

  return {
    mode: "hsl",
    h: hue,
    s: saturation,
    l: lightness,
  };
};

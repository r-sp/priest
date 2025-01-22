import type { ColorState, AnyColorMode, HwbColorMode } from "./types";
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

export const createColor = (newColor: AnyColorMode): ColorState => {
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

export const initColor = (): HwbColorMode => {
  const now = new Date();
  const date = now.getUTCDate();
  const day = now.getUTCDay();

  const hue = date * 11.612903225806452;
  const whiteness = date * 1.032258064516129;
  const blackness = day * 3.5;

  return {
    mode: "hwb",
    h: hue,
    w: whiteness,
    b: blackness,
  };
};

import type { AnyColorMode, HwbColorMode } from "./types";
import type { ColorState } from "~/context/store";
import {
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
  const whiteness = date * 0.01032258064516129;
  const blackness = day * 0.034999999999999996;

  return {
    mode: "hwb",
    h: hue,
    w: whiteness,
    b: blackness,
  };
};

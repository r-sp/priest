import type { Colord } from "colord";
import type { AnyColor, HslaColor, RgbaColor } from "./types";
import { colord, extend, random, getFormat } from "colord";

import minifyPlugin from "colord/plugins/minify";
extend([minifyPlugin]);

export const convertColor: (input: AnyColor) => Colord = colord;
export const getRandomColor = random;
export const getFormatColor = getFormat;

export const stringifyHsl = (hsla: HslaColor) => {
  const { h, s, l, a } = hsla;
  if (a < 1) {
    return `hsla(${h}, ${s}%, ${l}%, ${a})`;
  } else {
    return `hsl(${h}, ${s}%, ${l}%)`;
  }
};

export const stringifyRgb = (rgba: RgbaColor) => {
  const { r, g, b, a } = rgba;
  if (a < 1) {
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  } else {
    return `rgb(${r}, ${g}, ${b})`;
  }
};

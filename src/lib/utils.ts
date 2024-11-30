import type { Colord } from "colord";
import type { AnyColor, ColorSpace } from "./types";
import { colord, extend, getFormat } from "colord";

import a11yPlugin from "colord/plugins/a11y";
extend([a11yPlugin]);

export type ColorConverter = Colord;

export const convertColor: (input: AnyColor) => ColorConverter = colord;
export const getFormatColor = getFormat;

export const getRandomColor = () => {
  const range = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const color = convertColor({
    h: range(0, 360),
    s: range(50, 100),
    l: range(24, 64),
  });
  const space = {
    hex: color.toHex(),
    hsl: color.toHsl(),
    rgb: color.toRgb(),
  };
  return space;
};

export const initColorProvider = (): ColorSpace => {
  const color = getRandomColor();
  const provider: ColorSpace = { ...color, harmony: "complementary" };

  return provider;
};

export const isValidColor = (input: AnyColor) => convertColor(input).isValid();

export const stringifyHsl = (hsla: { h: number; s: number; l: number; a?: number }) => {
  const { h, s, l, a } = hsla;
  if (a && a < 1) {
    return `hsla(${h},${s}%,${l}% ${a})`;
  } else {
    return `hsl(${h},${s}%,${l}%)`;
  }
};

export const stringifyRgb = (rgba: { r: number; g: number; b: number; a?: number }) => {
  const { r, g, b, a } = rgba;
  if (a && a < 1) {
    return `rgba(${r},${g},${b},${a})`;
  } else {
    return `rgb(${r},${g},${b})`;
  }
};

export const writeClipboardText = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    return "success";
  } catch (e) {
    console.error(e);
    return "failed";
  }
};

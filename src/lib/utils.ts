import type { Colord } from "colord";
import type { AnyColor } from "./types";
import { colord, extend, random, getFormat } from "colord";

import a11yPlugin from "colord/plugins/a11y";
import minifyPlugin from "colord/plugins/minify";
import harmoniesPlugin from "colord/plugins/harmonies";
import mixPlugin from "colord/plugins/mix";

extend([a11yPlugin, minifyPlugin, harmoniesPlugin, mixPlugin]);

export const convertColor: (input: AnyColor) => Colord = colord;
export const getFormatColor = getFormat;

export const getRandomColor = () => {
  const color = random();
  const space = {
    raw: color.toRgb(),
    hex: color.toHex(),
    hsl: color.toHsl(),
    hsv: color.toHsv(),
    rgb: color.toRgb(),
  };
  return space;
};

export const stringifyHsl = (hsla: { h: number; s: number; l: number; a?: number }) => {
  const { h, s, l, a } = hsla;
  if (a && a < 1) {
    return `hsla(${h}, ${s}%, ${l}%, ${a})`;
  } else {
    return `hsl(${h}, ${s}%, ${l}%)`;
  }
};

export const stringifyRgb = (rgba: { r: number; g: number; b: number; a?: number }) => {
  const { r, g, b, a } = rgba;
  if (a && a < 1) {
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  } else {
    return `rgb(${r}, ${g}, ${b})`;
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

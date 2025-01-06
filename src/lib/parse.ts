import type { AnyColorMode, ComposeColor } from "./types";
import {
  convertRgb,
  convertHsl,
  convertHwb,
  convertLab,
  convertLch,
  convertOklab,
  convertOklch,
} from "./convert";
import {
  formatHex,
  formatRgb,
  formatHsl,
  formatHwb,
  formatLab,
  formatLch,
  formatOklab,
  formatOklch,
} from "./format";
import { parse } from "culori/fn";

export const parseCss = (color: string): AnyColorMode | undefined => {
  return parse(color) as AnyColorMode | undefined;
};

export const parseHex = (color: string | AnyColorMode): string => {
  const rgb = convertRgb(color);
  return formatHex(rgb);
};

export const parseRgb = (color: string | AnyColorMode): ComposeColor<"rgb"> => {
  const rgb = convertRgb(color);
  const { r, g, b } = rgb;
  return { color: { r, g, b }, css: formatRgb(rgb) };
};

export const parseHsl = (color: string | AnyColorMode): ComposeColor<"hsl"> => {
  const hsl = convertHsl(color);
  const { h, s, l } = hsl;
  return { color: { h, s, l }, css: formatHsl(hsl) };
};

export const parseHwb = (color: string | AnyColorMode): ComposeColor<"hwb"> => {
  const hwb = convertHwb(color);
  const { h, w, b } = hwb;
  return { color: { h, w, b }, css: formatHwb(hwb) };
};

export const parseLab = (color: string | AnyColorMode): ComposeColor<"lab"> => {
  const lab = convertLab(color);
  const { l, a, b } = lab;
  return { color: { l, a, b }, css: formatLab(lab) };
};

export const parseLch = (color: string | AnyColorMode): ComposeColor<"lch"> => {
  const lch = convertLch(color);
  const { l, c, h } = lch;
  return { color: { l, c, h }, css: formatLch(lch) };
};

export const parseOklab = (
  color: string | AnyColorMode,
): ComposeColor<"oklab"> => {
  const oklab = convertOklab(color);
  const { l, a, b } = oklab;
  return { color: { l, a, b }, css: formatOklab(oklab) };
};

export const parseOklch = (
  color: string | AnyColorMode,
): ComposeColor<"oklch"> => {
  const oklch = convertOklch(color);
  const { l, c, h } = oklch;
  return { color: { l, c, h }, css: formatOklch(oklch) };
};

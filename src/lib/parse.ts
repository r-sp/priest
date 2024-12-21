import type {
  RgbColor,
  HslColor,
  HwbColor,
  LabColor,
  LchColor,
  OklabColor,
  OklchColor,
  AnyColorMode,
} from "./color";
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

export const parseHex = (newColor: string | AnyColorMode): string => {
  const rgb = convertRgb(newColor);
  return formatHex(rgb);
};

export const parseRgb = (
  newColor: string | AnyColorMode,
): { color: RgbColor; css: string } => {
  const rgb = convertRgb(newColor);
  return { color: { r: rgb.r, g: rgb.g, b: rgb.b }, css: formatRgb(rgb) };
};

export const parseHsl = (
  newColor: string | AnyColorMode,
): { color: HslColor; css: string } => {
  const hsl = convertHsl(newColor);
  return {
    color: { h: hsl.h || 0, s: hsl.s, l: hsl.l },
    css: formatHsl(hsl),
  };
};

export const parseHwb = (
  newColor: string | AnyColorMode,
): { color: HwbColor; css: string } => {
  const hwb = convertHwb(newColor);
  return {
    color: { h: hwb.h || 0, w: hwb.w, b: hwb.b },
    css: formatHwb(hwb),
  };
};

export const parseLab = (
  newColor: string | AnyColorMode,
): { color: LabColor; css: string } => {
  const lab = convertLab(newColor);
  return { color: { l: lab.l, a: lab.a, b: lab.b }, css: formatLab(lab) };
};

export const parseLch = (
  newColor: string | AnyColorMode,
): { color: LchColor; css: string } => {
  const lch = convertLch(newColor);
  return {
    color: { l: lch.l, c: lch.c, h: lch.h || 0 },
    css: formatLch(lch),
  };
};

export const parseOklab = (
  newColor: string | AnyColorMode,
): { color: OklabColor; css: string } => {
  const oklab = convertOklab(newColor);
  return {
    color: { l: oklab.l, a: oklab.a, b: oklab.b },
    css: formatOklab(oklab),
  };
};

export const parseOklch = (
  newColor: string | AnyColorMode,
): { color: OklchColor; css: string } => {
  const oklch = convertOklch(newColor);
  return {
    color: { l: oklch.l, c: oklch.c, h: oklch.h || 0 },
    css: formatOklch(oklch),
  };
};

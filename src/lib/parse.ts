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
  formatHex,
  formatRgb,
  formatHsl,
  formatHwb,
  formatLab,
  formatLch,
  formatOklab,
  formatOklch,
} from "./format";

import { rgb, hsl, hwb, lab, lch, oklab, oklch } from "culori";

export const parseHex = (newColor: string | AnyColorMode): string => {
  const _rgb = rgb(newColor) || { r: 0, g: 0, b: 0 };
  return formatHex(_rgb);
};

export const parseRgb = (
  newColor: string,
): { color: RgbColor; css: string } => {
  const _rgb = rgb(newColor) || { r: 0, g: 0, b: 0 };

  return { color: { r: _rgb.r, g: _rgb.g, b: _rgb.b }, css: formatRgb(_rgb) };
};

export const parseHsl = (
  newColor: string,
): { color: HslColor; css: string } => {
  const _hsl = hsl(newColor) || { h: 0, s: 0, l: 0 };

  return {
    color: { h: _hsl.h || 0, s: _hsl.s, l: _hsl.l },
    css: formatHsl(_hsl),
  };
};

export const parseHwb = (
  newColor: string,
): { color: HwbColor; css: string } => {
  const _hwb = hwb(newColor) || { h: 0, w: 0, b: 0 };

  return {
    color: { h: _hwb.h || 0, w: _hwb.w, b: _hwb.b },
    css: formatHwb(_hwb),
  };
};

export const parseLab = (
  newColor: string,
): { color: LabColor; css: string } => {
  const _lab = lab(newColor) || { l: 0, a: 0, b: 0 };

  return { color: { l: _lab.l, a: _lab.a, b: _lab.b }, css: formatLab(_lab) };
};

export const parseLch = (
  newColor: string,
): { color: LchColor; css: string } => {
  const _lch = lch(newColor) || { l: 0, c: 0, h: 0 };

  return {
    color: { l: _lch.l, c: _lch.c, h: _lch.h || 0 },
    css: formatLch(_lch),
  };
};

export const parseOklab = (
  newColor: string,
): { color: OklabColor; css: string } => {
  const _oklab = oklab(newColor) || { l: 0, a: 0, b: 0 };

  return {
    color: { l: _oklab.l, a: _oklab.a, b: _oklab.b },
    css: formatOklab(_oklab),
  };
};

export const parseOklch = (
  newColor: string,
): { color: OklchColor; css: string } => {
  const _oklch = oklch(newColor) || { l: 0, c: 0, h: 0 };

  return {
    color: { l: _oklch.l, c: _oklch.c, h: _oklch.h || 0 },
    css: formatOklch(_oklch),
  };
};

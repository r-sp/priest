import type {
  RgbColor,
  HslColor,
  HwbColor,
  LabColor,
  LchColor,
  OklabColor,
  OklchColor,
  AnyColorMode,
} from "../types";
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

export function parseHex(color: string | AnyColorMode): string {
  const rgb = convertRgb(color);
  return formatHex(rgb);
}

export function parseRgb(color: string | AnyColorMode): {
  color: RgbColor;
  css: string;
} {
  const rgb = convertRgb(color);
  return { color: { r: rgb.r, g: rgb.g, b: rgb.b }, css: formatRgb(rgb) };
}

export function parseHsl(color: string | AnyColorMode): {
  color: HslColor;
  css: string;
} {
  const hsl = convertHsl(color);
  return {
    color: { h: hsl.h || 0, s: hsl.s, l: hsl.l },
    css: formatHsl(hsl),
  };
}

export function parseHwb(color: string | AnyColorMode): {
  color: HwbColor;
  css: string;
} {
  const hwb = convertHwb(color);
  return {
    color: { h: hwb.h || 0, w: hwb.w, b: hwb.b },
    css: formatHwb(hwb),
  };
}

export function parseLab(color: string | AnyColorMode): {
  color: LabColor;
  css: string;
} {
  const lab = convertLab(color);
  return { color: { l: lab.l, a: lab.a, b: lab.b }, css: formatLab(lab) };
}

export function parseLch(color: string | AnyColorMode): {
  color: LchColor;
  css: string;
} {
  const lch = convertLch(color);
  return {
    color: { l: lch.l, c: lch.c, h: lch.h || 0 },
    css: formatLch(lch),
  };
}

export function parseOklab(color: string | AnyColorMode): {
  color: OklabColor;
  css: string;
} {
  const oklab = convertOklab(color);
  return {
    color: { l: oklab.l, a: oklab.a, b: oklab.b },
    css: formatOklab(oklab),
  };
}

export function parseOklch(color: string | AnyColorMode): {
  color: OklchColor;
  css: string;
} {
  const oklch = convertOklch(color);
  return {
    color: { l: oklch.l, c: oklch.c, h: oklch.h || 0 },
    css: formatOklch(oklch),
  };
}

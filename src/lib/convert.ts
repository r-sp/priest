import type {
  AnyColorMode,
  RgbColorMode,
  HslColorMode,
  HwbColorMode,
  LabColorMode,
  LchColorMode,
  OklabColorMode,
  OklchColorMode,
} from "./types";
import { rgb, hsl, hwb, lab, lch, oklab, oklch } from "./model";
import { clampGamut } from "culori/fn";
import { getGamut } from "./gamut";
import { round } from "~/utils";

export const convertRgb = (color: string | AnyColorMode): RgbColorMode => {
  const format = clampGamut("rgb");
  const valid = rgb(format(getGamut(color)));
  return {
    mode: "rgb",
    r: valid ? round(valid.r * 255) : 0,
    g: valid ? round(valid.g * 255) : 0,
    b: valid ? round(valid.b * 255) : 0,
  };
};

export const convertHsl = (color: string | AnyColorMode): HslColorMode => {
  const format = clampGamut("hsl");
  const valid = hsl(format(getGamut(color)));
  return {
    mode: "hsl",
    h: valid ? round(valid.h || 0, 2) : 0,
    s: valid ? round(valid.s * 100, 2) : 0,
    l: valid ? round(valid.l * 100, 2) : 0,
  };
};

export const convertHwb = (color: string | AnyColorMode): HwbColorMode => {
  const format = clampGamut("hwb");
  const valid = hwb(format(getGamut(color)));
  return {
    mode: "hwb",
    h: valid ? round(valid.h || 0, 2) : 0,
    w: valid ? round(valid.w * 100) : 0,
    b: valid ? round(valid.b * 100) : 0,
  };
};

export const convertLab = (color: string | AnyColorMode): LabColorMode => {
  const format = clampGamut("lab");
  const valid = lab(format(getGamut(color)));
  return {
    mode: "lab",
    l: valid ? round(valid.l, 3) : 0,
    a: valid ? round(valid.a, 3) : 0,
    b: valid ? round(valid.b, 3) : 0,
  };
};

export const convertLch = (color: string | AnyColorMode): LchColorMode => {
  const format = clampGamut("lch");
  const valid = lch(format(getGamut(color)));
  return {
    mode: "lch",
    l: valid ? round(valid.l, 3) : 0,
    c: valid ? round(valid.c, 3) : 0,
    h: valid ? round(valid.h || 0, 3) : 0,
  };
};

export const convertOklab = (color: string | AnyColorMode): OklabColorMode => {
  const format = clampGamut("oklab");
  const valid = oklab(format(getGamut(color)));
  return {
    mode: "oklab",
    l: valid ? round(valid.l, 3) : 0,
    a: valid ? round(valid.a, 3) : 0,
    b: valid ? round(valid.b, 3) : 0,
  };
};

export const convertOklch = (color: string | AnyColorMode): OklchColorMode => {
  const format = clampGamut("oklch");
  const valid = oklch(format(getGamut(color)));
  return {
    mode: "oklch",
    l: valid ? round(valid.l, 3) : 0,
    c: valid ? round(valid.c, 3) : 0,
    h: valid ? round(valid.h || 0, 3) : 0,
  };
};

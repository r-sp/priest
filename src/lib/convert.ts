import type {
  AnyColorMode,
  RgbColorMode,
  HslColorMode,
  HwbColorMode,
  LabColorMode,
  LchColorMode,
  OklabColorMode,
  OklchColorMode,
} from "./color";
import { rgb, hsl, hwb, lab, lch, oklab, oklch, clampGamut } from "culori";

export const convertRgb = (newColor: string | AnyColorMode): RgbColorMode => {
  const format = clampGamut("rgb");
  return rgb(format(newColor)) || { mode: "rgb", r: 0, g: 0, b: 0 };
};

export const convertHsl = (newColor: string | AnyColorMode): HslColorMode => {
  const format = clampGamut("hsl");
  return hsl(format(newColor)) || { mode: "hsl", h: 0, s: 0, l: 0 };
};

export const convertHwb = (newColor: string | AnyColorMode): HwbColorMode => {
  const format = clampGamut("hwb");
  return hwb(format(newColor)) || { mode: "hwb", h: 0, w: 0, b: 0 };
};

export const convertLab = (newColor: string | AnyColorMode): LabColorMode => {
  const format = clampGamut("lab");
  return lab(format(newColor)) || { mode: "lab", l: 0, a: 0, b: 0 };
};

export const convertLch = (newColor: string | AnyColorMode): LchColorMode => {
  const format = clampGamut("lch");
  return lch(format(newColor)) || { mode: "lch", l: 0, c: 0, h: 0 };
};

export const convertOklab = (
  newColor: string | AnyColorMode,
): OklabColorMode => {
  const format = clampGamut("oklab");
  return oklab(format(newColor)) || { mode: "oklab", l: 0, a: 0, b: 0 };
};

export const convertOklch = (
  newColor: string | AnyColorMode,
): OklchColorMode => {
  const format = clampGamut("oklch");
  return oklch(format(newColor)) || { mode: "oklch", l: 0, c: 0, h: 0 };
};

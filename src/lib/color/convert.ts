import type {
  AnyColorMode,
  RgbColorMode,
  HslColorMode,
  HwbColorMode,
  LabColorMode,
  LchColorMode,
  OklabColorMode,
  OklchColorMode,
} from "../types";
import { rgb, hsl, hwb, lab, lch, oklab, oklch, clampGamut } from "./index";

export function convertRgb(color: string | AnyColorMode): RgbColorMode {
  const format = clampGamut("rgb");
  return rgb(format(color)) || { mode: "rgb", r: 0, g: 0, b: 0 };
}

export function convertHsl(color: string | AnyColorMode): HslColorMode {
  const format = clampGamut("hsl");
  return hsl(format(color)) || { mode: "hsl", h: 0, s: 0, l: 0 };
}

export function convertHwb(color: string | AnyColorMode): HwbColorMode {
  const format = clampGamut("hwb");
  return hwb(format(color)) || { mode: "hwb", h: 0, w: 0, b: 0 };
}

export function convertLab(color: string | AnyColorMode): LabColorMode {
  const format = clampGamut("lab");
  return lab(format(color)) || { mode: "lab", l: 0, a: 0, b: 0 };
}

export function convertLch(color: string | AnyColorMode): LchColorMode {
  const format = clampGamut("lch");
  return lch(format(color)) || { mode: "lch", l: 0, c: 0, h: 0 };
}

export function convertOklab(color: string | AnyColorMode): OklabColorMode {
  const format = clampGamut("oklab");
  return oklab(format(color)) || { mode: "oklab", l: 0, a: 0, b: 0 };
}

export function convertOklch(color: string | AnyColorMode): OklchColorMode {
  const format = clampGamut("oklch");
  return oklch(format(color)) || { mode: "oklch", l: 0, c: 0, h: 0 };
}

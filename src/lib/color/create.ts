import type {
  ColorState,
  ColorFormat,
  AnyColor,
  AnyColorMode,
  HslColorMode,
} from "../types";
import {
  parseHex,
  parseRgb,
  parseHsl,
  parseHwb,
  parseLab,
  parseLch,
  parseOklab,
  parseOklch,
} from "./parse";
import { limiter } from "../utils";

export function createColor(newColor: AnyColorMode): ColorState {
  return {
    hex: parseHex(newColor),
    rgb: parseRgb(newColor),
    hsl: parseHsl(newColor),
    hwb: parseHwb(newColor),
    lab: parseLab(newColor),
    lch: parseLch(newColor),
    oklab: parseOklab(newColor),
    oklch: parseOklch(newColor),
  };
}

export function initColor(): HslColorMode {
  const today = new Date();
  const year = today.getUTCFullYear();
  const month = today.getUTCMonth() + 1;
  const day = today.getUTCDay();

  const hue = limiter((day * year) / month, 0, 360);
  const saturation = limiter(month * 12, 0.64, 0.96);
  const lightness = limiter(day * 30, 0.32, 0.64);

  return {
    mode: "hsl",
    h: hue,
    s: saturation,
    l: lightness,
  };
}

export function switchColor(mode: ColorFormat, color: ColorState): AnyColor {
  const { rgb, hsl, hwb, lab, lch, oklab, oklch } = color;

  switch (mode) {
    case "rgb": {
      return rgb.color;
      break;
    }
    case "hsl": {
      return hsl.color;
      break;
    }
    case "hwb": {
      return hwb.color;
      break;
    }
    case "lab": {
      return lab.color;
      break;
    }
    case "lch": {
      return lch.color;
      break;
    }
    case "oklab": {
      return oklab.color;
      break;
    }
    case "oklch": {
      return oklch.color;
      break;
    }
  }
}

export function switchColorCss(mode: ColorFormat, color: ColorState): string {
  const { rgb, hsl, hwb, lab, lch, oklab, oklch } = color;

  switch (mode) {
    case "rgb": {
      return rgb.css;
      break;
    }
    case "hsl": {
      return hsl.css;
      break;
    }
    case "hwb": {
      return hwb.css;
      break;
    }
    case "lab": {
      return lab.css;
      break;
    }
    case "lch": {
      return lch.css;
      break;
    }
    case "oklab": {
      return oklab.css;
      break;
    }
    case "oklch": {
      return oklch.css;
      break;
    }
  }
}

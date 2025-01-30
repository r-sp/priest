import type {
  AnyColorMode,
  ColorFormat,
  ColorMode,
  ExtractColorMode,
} from "~/types/color";
import {
  modeRgb,
  modeHsl,
  modeHwb,
  modeLab,
  modeLch,
  modeOklab,
  modeOklch,
  useMode as setColor,
  clampGamut,
  parse,
} from "culori/fn";
import { getGamut } from "./gamut";

const getColorRgb = setColor(modeRgb);
const getColorHsl = setColor(modeHsl);
const getColorHwb = setColor(modeHwb);
const getColorLab = setColor(modeLab);
const getColorLch = setColor(modeLch);
const getColorOklab = setColor(modeOklab);
const getColorOklch = setColor(modeOklch);

type ColorInput = string | AnyColorMode;

type ColorOutput<T extends ColorFormat> = ExtractColorMode<T> | undefined;

const rgb = (color: ColorInput): ColorOutput<"rgb"> => {
  const format = clampGamut("rgb");
  const mode = getGamut(color);
  return getColorRgb(format(mode));
};

const hsl = (color: ColorInput): ColorOutput<"hsl"> => {
  const format = clampGamut("hsl");
  const mode = getGamut(color);
  return getColorHsl(format(mode));
};

const hwb = (color: ColorInput): ColorOutput<"hwb"> => {
  const format = clampGamut("hwb");
  const mode = getGamut(color);
  return getColorHwb(format(mode));
};

const lab = (color: ColorInput): ColorOutput<"lab"> => {
  const format = clampGamut("lab");
  const mode = getGamut(color);
  return getColorLab(format(mode));
};

const lch = (color: ColorInput): ColorOutput<"lch"> => {
  const format = clampGamut("lch");
  const mode = getGamut(color);
  return getColorLch(format(mode));
};

const oklab = (color: ColorInput): ColorOutput<"oklab"> => {
  const format = clampGamut("oklab");
  const mode = getGamut(color);
  return getColorOklab(format(mode));
};

const oklch = (color: ColorInput): ColorOutput<"oklch"> => {
  const format = clampGamut("oklch");
  const mode = getGamut(color);
  return getColorOklch(format(mode));
};

const round = (value: number, digits: number = 0): number => {
  if (digits === 0) {
    return Math.round(value);
  }
  if (digits < 0) {
    const base = 10 ** -digits;
    return Math.round(value / base) * base;
  }
  const base = 10 ** digits;
  return Math.round(value * base) / base;
};

const convertRgb = (color: ColorInput): ColorMode<"rgb"> => {
  const compose = rgb(color);
  return {
    mode: "rgb",
    r: compose ? round(compose.r * 255) : 0,
    g: compose ? round(compose.g * 255) : 0,
    b: compose ? round(compose.b * 255) : 0,
  };
};

const convertHsl = (color: ColorInput): ColorMode<"hsl"> => {
  const compose = hsl(color);
  return {
    mode: "hsl",
    h: compose ? round(compose.h || 0, 2) : 0,
    s: compose ? round(compose.s * 100, 2) : 0,
    l: compose ? round(compose.l * 100, 2) : 0,
  };
};

const convertHwb = (color: ColorInput): ColorMode<"hwb"> => {
  const compose = hwb(color);
  return {
    mode: "hwb",
    h: compose ? round(compose.h || 0, 2) : 0,
    w: compose ? round(compose.w * 100) : 0,
    b: compose ? round(compose.b * 100) : 0,
  };
};

const convertLab = (color: ColorInput): ColorMode<"lab"> => {
  const compose = lab(color);
  return {
    mode: "lab",
    l: compose ? round(compose.l, 3) : 0,
    a: compose ? round(compose.a, 3) : 0,
    b: compose ? round(compose.b, 3) : 0,
  };
};

const convertLch = (color: ColorInput): ColorMode<"lch"> => {
  const compose = lch(color);
  return {
    mode: "lch",
    l: compose ? round(compose.l, 3) : 0,
    c: compose ? round(compose.c, 3) : 0,
    h: compose ? round(compose.h || 0, 3) : 0,
  };
};

const convertOklab = (color: ColorInput): ColorMode<"oklab"> => {
  const compose = oklab(color);
  return {
    mode: "oklab",
    l: compose ? round(compose.l, 3) : 0,
    a: compose ? round(compose.a, 3) : 0,
    b: compose ? round(compose.b, 3) : 0,
  };
};

const convertOklch = (color: ColorInput): ColorMode<"oklch"> => {
  const compose = oklch(color);
  return {
    mode: "oklch",
    l: compose ? round(compose.l, 3) : 0,
    c: compose ? round(compose.c, 3) : 0,
    h: compose ? round(compose.h || 0, 3) : 0,
  };
};

const convertCss = (color: string): NonNullable<AnyColorMode | undefined> => {
  return parse(color) as NonNullable<AnyColorMode | undefined>;
};

const convertHex = (color: ColorInput): string => {
  const compose = convertRgb(color);
  const { r, g, b } = compose;
  return "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
};

export {
  rgb,
  hsl,
  hwb,
  lab,
  lch,
  oklab,
  oklch,
  convertRgb,
  convertHsl,
  convertHwb,
  convertLab,
  convertLch,
  convertOklab,
  convertOklch,
  convertCss,
  convertHex,
};

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
import { round } from "./units";

const getColorRgb = setColor(modeRgb);
const getColorHsl = setColor(modeHsl);
const getColorHwb = setColor(modeHwb);
const getColorLab = setColor(modeLab);
const getColorLch = setColor(modeLch);
const getColorOklab = setColor(modeOklab);
const getColorOklch = setColor(modeOklch);

type ColorInput = string | AnyColorMode;

type ColorOutput<T extends ColorFormat> = NonNullable<
  ExtractColorMode<T> | undefined
>;

const rgb = (color: ColorInput): ColorOutput<"rgb"> => {
  const format = clampGamut("rgb");
  const mode = getGamut(color);
  return getColorRgb(format(mode)) as ColorOutput<"rgb">;
};

const hsl = (color: ColorInput): ColorOutput<"hsl"> => {
  const format = clampGamut("hsl");
  const mode = getGamut(color);
  return getColorHsl(format(mode)) as ColorOutput<"hsl">;
};

const hwb = (color: ColorInput): ColorOutput<"hwb"> => {
  const format = clampGamut("hwb");
  const mode = getGamut(color);
  return getColorHwb(format(mode)) as ColorOutput<"hwb">;
};

const lab = (color: ColorInput): ColorOutput<"lab"> => {
  const format = clampGamut("lab");
  const mode = getGamut(color);
  return getColorLab(format(mode)) as ColorOutput<"lab">;
};

const lch = (color: ColorInput): ColorOutput<"lch"> => {
  const format = clampGamut("lch");
  const mode = getGamut(color);
  return getColorLch(format(mode)) as ColorOutput<"lch">;
};

const oklab = (color: ColorInput): ColorOutput<"oklab"> => {
  const format = clampGamut("oklab");
  const mode = getGamut(color);
  return getColorOklab(format(mode)) as ColorOutput<"oklab">;
};

const oklch = (color: ColorInput): ColorOutput<"oklch"> => {
  const format = clampGamut("oklch");
  const mode = getGamut(color);
  return getColorOklch(format(mode)) as ColorOutput<"oklch">;
};

const convertRgb = (color: ColorInput): ColorMode<"rgb"> => {
  const compose = rgb(color);
  return {
    mode: "rgb",
    r: round(compose.r * 255),
    g: round(compose.g * 255),
    b: round(compose.b * 255),
  };
};

const convertHsl = (color: ColorInput): ColorMode<"hsl"> => {
  const compose = hsl(color);
  return {
    mode: "hsl",
    h: round(compose.h, 2),
    s: round(compose.s * 100, 2),
    l: round(compose.l * 100, 2),
  };
};

const convertHwb = (color: ColorInput): ColorMode<"hwb"> => {
  const compose = hwb(color);
  return {
    mode: "hwb",
    h: round(compose.h, 2),
    w: round(compose.w * 100),
    b: round(compose.b * 100),
  };
};

const convertLab = (color: ColorInput): ColorMode<"lab"> => {
  const compose = lab(color);
  return {
    mode: "lab",
    l: round(compose.l, 3),
    a: round(compose.a, 3),
    b: round(compose.b, 3),
  };
};

const convertLch = (color: ColorInput): ColorMode<"lch"> => {
  const compose = lch(color);
  return {
    mode: "lch",
    l: round(compose.l, 3),
    c: round(compose.c, 3),
    h: round(compose.h, 3),
  };
};

const convertOklab = (color: ColorInput): ColorMode<"oklab"> => {
  const compose = oklab(color);
  return {
    mode: "oklab",
    l: round(compose.l, 3),
    a: round(compose.a, 3),
    b: round(compose.b, 3),
  };
};

const convertOklch = (color: ColorInput): ColorMode<"oklch"> => {
  const compose = oklch(color);
  return {
    mode: "oklch",
    l: round(compose.l, 3),
    c: round(compose.c, 3),
    h: round(compose.h, 3),
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

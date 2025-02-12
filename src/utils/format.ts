import type {
  AnyColorType,
  AnyColorMode,
  ColorFormat,
  ColorState,
  ColorMode,
  ComposeColor,
  ExtractColorMode,
} from "~/types/color";
import {
  convertRgb,
  convertHsl,
  convertHwb,
  convertLab,
  convertLch,
  convertOklab,
  convertOklch,
} from "./convert";
import { setGamut } from "./gamut";
import { clampRgb } from "culori/fn";

const formatRgb = (color: AnyColorType<"rgb">): string => {
  const { r, g, b } = color;
  return `rgb(${r} ${g} ${b})`;
};

const formatHsl = (color: AnyColorType<"hsl">): string => {
  const { h, s, l } = color;
  return `hsl(${h} ${s}% ${l}%)`;
};

const formatHwb = (color: AnyColorType<"hwb">): string => {
  const { h, w, b } = color;
  return `hwb(${h} ${w}% ${b}%)`;
};

const formatLab = (color: AnyColorType<"lab">): string => {
  const { l, a, b } = color;
  return `lab(${l} ${a} ${b})`;
};

const formatLch = (color: AnyColorType<"lch">): string => {
  const { l, c, h } = color;
  return `lch(${l} ${c} ${h})`;
};

const formatOklab = (color: AnyColorType<"oklab">): string => {
  const { l, a, b } = color;
  return `oklab(${l} ${a} ${b})`;
};

const formatOklch = (color: AnyColorType<"oklch">): string => {
  const { l, c, h } = color;
  return `oklch(${l} ${c} ${h})`;
};

const composeRgb = (color: AnyColorMode): ComposeColor<"rgb"> => {
  const mode = convertRgb(color);
  const { r, g, b } = mode;
  return { color: { r, g, b }, css: formatRgb(mode) };
};

const composeHsl = (color: AnyColorMode): ComposeColor<"hsl"> => {
  const mode = convertHsl(color);
  const { h, s, l } = mode;
  return { color: { h, s, l }, css: formatHsl(mode) };
};

const composeHwb = (color: AnyColorMode): ComposeColor<"hwb"> => {
  const mode = convertHwb(color);
  const { h, w, b } = mode;
  return { color: { h, w, b }, css: formatHwb(mode) };
};

const composeLab = (color: AnyColorMode): ComposeColor<"lab"> => {
  const mode = convertLab(color);
  const { l, a, b } = mode;
  return { color: { l, a, b }, css: formatLab(mode) };
};

const composeLch = (color: AnyColorMode): ComposeColor<"lch"> => {
  const mode = convertLch(color);
  const { l, c, h } = mode;
  return { color: { l, c, h }, css: formatLch(mode) };
};

const composeOklab = (color: AnyColorMode): ComposeColor<"oklab"> => {
  const mode = convertOklab(color);
  const { l, a, b } = mode;
  return { color: { l, a, b }, css: formatOklab(mode) };
};

const composeOklch = (color: AnyColorMode): ComposeColor<"oklch"> => {
  const mode = convertOklch(color);
  const { l, c, h } = mode;
  return { color: { l, c, h }, css: formatOklch(mode) };
};

const formatColor: {
  [Key in ColorFormat]: (color: ExtractColorMode<Key>) => string;
} = {
  rgb: formatRgb,
  hsl: formatHsl,
  hwb: formatHwb,
  lab: formatLab,
  lch: formatLch,
  oklab: formatOklab,
  oklch: formatOklch,
};

const formatMode = <T extends ColorFormat>(
  mode: T,
): ((color: ExtractColorMode<T>) => string) => {
  return formatColor[mode];
};

const formatCss = (color: AnyColorMode): string => {
  const compose = formatMode(color.mode);
  return compose(color);
};

const createRgb = (color: AnyColorMode): ColorMode<"rgb"> => {
  const css = formatCss(color);
  const clamp = clampRgb(css) as AnyColorMode;
  const gamut = setGamut(clamp);
  return convertRgb(gamut);
};

const createHex = (color: AnyColorMode): string => {
  const compose = createRgb(color);
  const { r, g, b } = compose;
  return "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
};

const createColor = (color: AnyColorMode): ColorState => {
  return {
    hex: createHex(color),
    rgb: composeRgb(color),
    hsl: composeHsl(color),
    hwb: composeHwb(color),
    lab: composeLab(color),
    lch: composeLch(color),
    oklab: composeOklab(color),
    oklch: composeOklch(color),
  };
};

const createCss = (color: AnyColorMode, hex: boolean): string => {
  return hex ? createHex(color) : formatCss(color);
};

export {
  formatRgb,
  formatHsl,
  formatHwb,
  formatLab,
  formatLch,
  formatOklab,
  formatOklch,
  formatCss,
  createRgb,
  createHex,
  createColor,
  createCss,
};

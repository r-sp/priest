import {
  modeRgb,
  modeHsl,
  modeHwb,
  modeLab,
  modeLch,
  modeOklab,
  modeOklch,
  useMode as add,
  clampGamut,
  parse,
} from "culori/fn";
import { getGamut } from "./gamut";
import { round } from "./utils";

export type ColorSpace = {
  rgb: { r: number; g: number; b: number };
  hsl: { h?: number; s: number; l: number };
  hwb: { h?: number; w: number; b: number };
  lab: { l: number; a: number; b: number };
  lch: { l: number; c: number; h?: number };
  oklab: { l: number; a: number; b: number };
  oklch: { l: number; c: number; h?: number };
};

export type ColorFormat = keyof ColorSpace;

type Mode<T extends ColorFormat> = ColorSpace[T] & {
  mode: T;
};

export type RgbColor = ColorSpace["rgb"];
export type HslColor = ColorSpace["hsl"];
export type HwbColor = ColorSpace["hwb"];
export type LabColor = ColorSpace["lab"];
export type LchColor = ColorSpace["lch"];
export type OklabColor = ColorSpace["oklab"];
export type OklchColor = ColorSpace["oklch"];
export type AnyColor =
  | RgbColor
  | HslColor
  | HwbColor
  | LabColor
  | LchColor
  | OklabColor
  | OklchColor;

export type RgbColorMode = Mode<"rgb">;
export type HslColorMode = Mode<"hsl">;
export type HwbColorMode = Mode<"hwb">;
export type LabColorMode = Mode<"lab">;
export type LchColorMode = Mode<"lch">;
export type OklabColorMode = Mode<"oklab">;
export type OklchColorMode = Mode<"oklch">;
export type AnyColorMode =
  | RgbColorMode
  | HslColorMode
  | HwbColorMode
  | LabColorMode
  | LchColorMode
  | OklabColorMode
  | OklchColorMode;

export type ComposeColor<T extends ColorFormat> = {
  color: ColorSpace[T];
  css: string;
};

export type ColorState = {
  hex: string;
  rgb: ComposeColor<"rgb">;
  hsl: ComposeColor<"hsl">;
  hwb: ComposeColor<"hwb">;
  lab: ComposeColor<"lab">;
  lch: ComposeColor<"lch">;
  oklab: ComposeColor<"oklab">;
  oklch: ComposeColor<"oklch">;
};

export type ColorQuery = {
  mode: ColorFormat;
  r?: number;
  g?: number;
  b?: number;
  h?: number;
  s?: number;
  l?: number;
  w?: number;
  a?: number;
  c?: number;
};

export type ColorMode = keyof ColorState;

export type ColorScheme = "dark" | "light";

export type ColorLabel =
  | "red"
  | "green"
  | "blue"
  | "green-red"
  | "blue-yellow"
  | "hue"
  | "saturation"
  | "lightness"
  | "whiteness"
  | "blackness"
  | "chroma";

export const composeRgb = add(modeRgb);
export const composeHsl = add(modeHsl);
export const composeHwb = add(modeHwb);
export const composeLab = add(modeLab);
export const composeLch = add(modeLch);
export const composeOklab = add(modeOklab);
export const composeOklch = add(modeOklch);

export const formatHex = (color: RgbColor | RgbColorMode): string => {
  const { r, g, b } = color;
  return "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
};
export const formatRgb = (color: RgbColor | RgbColorMode): string => {
  const { r, g, b } = color;
  return `rgb(${r} ${g} ${b})`;
};
export const formatHsl = (color: HslColor | HslColorMode): string => {
  const { h, s, l } = color;
  return `hsl(${h} ${s}% ${l}%)`;
};
export const formatHwb = (color: HwbColor | HwbColorMode): string => {
  const { h, w, b } = color;
  return `hwb(${h} ${w}% ${b}%)`;
};
export const formatLab = (color: LabColor | LabColorMode): string => {
  const { l, a, b } = color;
  return `lab(${l} ${a} ${b})`;
};
export const formatLch = (color: LchColor | LchColorMode): string => {
  const { l, c, h } = color;
  return `lch(${l} ${c} ${h})`;
};
export const formatOklab = (color: OklabColor | OklabColorMode): string => {
  const { l, a, b } = color;
  return `oklab(${l} ${a} ${b})`;
};
export const formatOklch = (color: OklchColor | OklchColorMode): string => {
  const { l, c, h } = color;
  return `oklch(${l} ${c} ${h})`;
};

export const convertHex = (color: string | AnyColorMode): string => {
  const format = clampGamut("rgb");
  const mode = getGamut(color);
  const rgb = composeRgb(format(mode)) as RgbColorMode | undefined;
  const src: RgbColor = {
    r: rgb ? round(rgb.r * 255) : 0,
    g: rgb ? round(rgb.g * 255) : 0,
    b: rgb ? round(rgb.b * 255) : 0,
  };
  return formatHex(src);
};

export const convertRgb = (
  color: string | AnyColorMode,
): ComposeColor<"rgb"> => {
  const format = clampGamut("rgb");
  const mode = getGamut(color);
  const rgb = composeRgb(format(mode)) as RgbColorMode | undefined;
  const src: RgbColor = {
    r: rgb ? round(rgb.r * 255) : 0,
    g: rgb ? round(rgb.g * 255) : 0,
    b: rgb ? round(rgb.b * 255) : 0,
  };
  return { color: src, css: formatRgb(src) };
};

export const convertHsl = (
  color: string | AnyColorMode,
): ComposeColor<"hsl"> => {
  const format = clampGamut("hsl");
  const mode = getGamut(color);
  const hsl = composeHsl(format(mode)) as HslColorMode | undefined;
  const src: HslColor = {
    h: hsl ? round(hsl.h || 0, 2) : 0,
    s: hsl ? round(hsl.s * 100, 2) : 0,
    l: hsl ? round(hsl.l * 100, 2) : 0,
  };
  return { color: src, css: formatHsl(src) };
};

export const convertHwb = (
  color: string | AnyColorMode,
): ComposeColor<"hwb"> => {
  const format = clampGamut("hwb");
  const mode = getGamut(color);
  const hwb = composeHwb(format(mode)) as HwbColorMode | undefined;
  const src: HwbColor = {
    h: hwb ? round(hwb.h || 0, 2) : 0,
    w: hwb ? round(hwb.w * 100) : 0,
    b: hwb ? round(hwb.b * 100) : 0,
  };
  return { color: src, css: formatHwb(src) };
};

export const convertLab = (
  color: string | AnyColorMode,
): ComposeColor<"lab"> => {
  const format = clampGamut("lab");
  const mode = getGamut(color);
  const lab = composeLab(format(mode)) as LabColorMode | undefined;
  const src: LabColor = {
    l: lab ? round(lab.l, 3) : 0,
    a: lab ? round(lab.a, 3) : 0,
    b: lab ? round(lab.b, 3) : 0,
  };
  return { color: src, css: formatLab(src) };
};

export const convertLch = (
  color: string | AnyColorMode,
): ComposeColor<"lch"> => {
  const format = clampGamut("lch");
  const mode = getGamut(color);
  const lch = composeLch(format(mode)) as LchColorMode | undefined;
  const src: LchColor = {
    l: lch ? round(lch.l, 3) : 0,
    c: lch ? round(lch.c, 3) : 0,
    h: lch ? round(lch.h || 0, 3) : 0,
  };
  return { color: src, css: formatLch(src) };
};

export const convertOklab = (
  color: string | AnyColorMode,
): ComposeColor<"oklab"> => {
  const format = clampGamut("oklab");
  const mode = getGamut(color);
  const oklab = composeOklab(format(mode)) as OklabColorMode | undefined;
  const src: OklabColor = {
    l: oklab ? round(oklab.l, 3) : 0,
    a: oklab ? round(oklab.a, 3) : 0,
    b: oklab ? round(oklab.b, 3) : 0,
  };
  return { color: src, css: formatOklab(src) };
};

export const convertOklch = (
  color: string | AnyColorMode,
): ComposeColor<"oklch"> => {
  const format = clampGamut("oklch");
  const mode = getGamut(color);
  const lch = composeOklch(format(mode)) as OklchColorMode | undefined;
  const src: OklchColor = {
    l: lch ? round(lch.l, 3) : 0,
    c: lch ? round(lch.c, 3) : 0,
    h: lch ? round(lch.h || 0, 3) : 0,
  };
  return { color: src, css: formatOklch(src) };
};

export const convertCss = (color: string): AnyColorMode | undefined => {
  return parse(color) as AnyColorMode | undefined;
};

type FormatCss = {
  [Key in ColorFormat]: (color: Extract<AnyColorMode, { mode: Key }>) => string;
};

const formatCss: FormatCss = {
  rgb: formatRgb,
  hsl: formatHsl,
  hwb: formatHwb,
  lab: formatLab,
  lch: formatLch,
  oklab: formatOklab,
  oklch: formatOklch,
};

const parseMode = <T extends ColorFormat>(
  mode: T,
): ((color: Extract<AnyColorMode, { mode: T }>) => string) => {
  return formatCss[mode];
};

export const parseCss = (color: AnyColorMode): string => {
  const compose = parseMode(color.mode);
  return compose(color);
};

export const createColor = (src: AnyColorMode): ColorState => {
  return {
    hex: convertHex(src),
    rgb: convertRgb(src),
    hsl: convertHsl(src),
    hwb: convertHwb(src),
    lab: convertLab(src),
    lch: convertLch(src),
    oklab: convertOklab(src),
    oklch: convertOklch(src),
  };
};

export const currentColor = (): [RgbColorMode, ColorState] => {
  const now = new Date();
  const date = now.getUTCDate();
  const day = now.getUTCDay();
  const hue = date * 11.612903225806452;
  const whiteness = date * 1.032258064516129;
  const blackness = day * 3.5;

  const src: HwbColorMode = {
    mode: "hwb",
    h: hue,
    w: whiteness,
    b: blackness,
  };

  const current = createColor(src);

  const alt: RgbColorMode = { mode: "rgb", ...current.rgb.color };

  return [alt, current];
};

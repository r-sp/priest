import type {
  ColorMode,
  ColorState,
  ColorFormat,
  ColorValues,
  ExtractColorMode,
} from "~/types/color";
import type { SessionState } from "~/types/session";
import { convertRgb } from "./convert";
import { round } from "./units";
import { setGamut } from "./gamut";
import { samples, interpolate } from "culori/fn";

const createService = (): SessionState => {
  const now = new Date();
  const date = now.getUTCDate();
  const day = now.getUTCDay();
  const hwb: ColorMode<"hwb"> = {
    mode: "hwb",
    h: date * 11.612903225806452,
    w: date * 1.032258064516129,
    b: day * 3.5,
  };

  const format: keyof ColorState = "hex";
  const rgb = convertRgb(hwb);

  return {
    theme: undefined,
    color: rgb,
    mode: format,
    hue: { base: 30, min: 0, max: 330 },
  };
};

const range = (min: number, max: number, float: number): number => {
  return round(Math.random() * (max - min) + min, float);
};

const randomColor: {
  [Key in ColorFormat]: () => ExtractColorMode<Key>;
} = {
  rgb: () => ({
    mode: "rgb",
    r: range(0, 255, 0),
    g: range(0, 255, 0),
    b: range(0, 255, 0),
  }),
  hsl: () => ({
    mode: "hsl",
    h: range(0, 360, 2),
    s: range(48, 96, 2),
    l: range(32, 72, 2),
  }),
  hwb: () => ({
    mode: "hwb",
    h: range(0, 360, 2),
    w: range(0, 36, 2),
    b: range(0, 24, 2),
  }),
  lab: () => ({
    mode: "lab",
    l: range(20, 80, 3),
    a: range(-100, 100, 3),
    b: range(-100, 100, 3),
  }),
  lch: () => ({
    mode: "lch",
    l: range(48, 96, 3),
    c: range(70, 140, 3),
    h: range(0, 360, 3),
  }),
  oklab: () => ({
    mode: "oklab",
    l: range(0.2, 0.8, 3),
    a: range(-0.4, 0.4, 3),
    b: range(-0.4, 0.4, 3),
  }),
  oklch: () => ({
    mode: "oklch",
    l: range(0.2, 0.8, 3),
    c: range(0.2, 0.4, 3),
    h: range(0, 360, 3),
  }),
};

const randomMode = <T extends ColorFormat>(
  mode: T,
): (() => ExtractColorMode<T>) => {
  return randomColor[mode];
};

const generateColor = (type: ColorFormat) => {
  const compose = randomMode(type);
  return compose();
};

const colorFormat: {
  [Key in ColorFormat]: (
    k: number,
    e: number,
    y: number,
  ) => ExtractColorMode<Key>;
} = {
  rgb: (r, g, b) => ({ mode: "rgb", r, g, b }),
  hsl: (h, s, l) => ({ mode: "hsl", h, s, l }),
  hwb: (h, w, b) => ({ mode: "hwb", h, w, b }),
  lab: (l, a, b) => ({ mode: "lab", l, a, b }),
  lch: (l, c, h) => ({ mode: "lch", l, c, h }),
  oklab: (l, a, b) => ({ mode: "oklab", l, a, b }),
  oklch: (l, c, h) => ({ mode: "oklch", l, c, h }),
};

const colorMode = <T extends ColorFormat>(
  mode: T,
): ((k: number, e: number, y: number) => ExtractColorMode<T>) => {
  return colorFormat[mode];
};

const parseColor = (color: string): ExtractColorMode<ColorFormat> => {
  const [mode, k, e, y] = color.split(" ");
  const compose = colorMode(mode as ColorFormat);
  return compose(Number(k), Number(e), Number(y));
};

const encodeColor = (values: ColorValues): string => {
  return values
    .join("|")
    .replaceAll(".", "u")
    .replaceAll("-", "n")
    .replaceAll("|", "-");
};

const decodeColor = (value: string): string => {
  return value.replaceAll("-", " ").replaceAll("u", ".").replaceAll("n", "-");
};

const encodeId = (values: ColorValues): string => {
  return values
    .join("|")
    .replaceAll(".", ":")
    .replaceAll("-", "/")
    .replaceAll("|", "-");
};

const decodeId = (value: string): string => {
  return value.replaceAll("-", " ").replaceAll(":", ".").replaceAll("/", "-");
};

const encodeScale = (hex: string): string => {
  return samples(13)
    .map(interpolate(["#ffffff", hex, "#000000"]))
    .filter((_, index, arr) => index > 0 && index < arr.length - 1)
    .map((src: ColorMode<"rgb">) => {
      const { r, g, b } = setGamut(src) as ColorMode<"rgb">;
      return ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
    })
    .join("-");
};

const decodeScale = (value: string): string[] => {
  return value.split("-").map((c) => "#" + c);
};

const encodeCss = (value: string): string => {
  return value
    .replace("(", " ")
    .replace(")", "")
    .replaceAll("%", "")
    .replaceAll("-", "/")
    .replaceAll(".", ":")
    .replaceAll(" ", "-");
};

export {
  createService,
  generateColor,
  parseColor,
  encodeColor,
  decodeColor,
  encodeId,
  decodeId,
  encodeScale,
  decodeScale,
  encodeCss,
};

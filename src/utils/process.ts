import type {
  ColorMode,
  ColorState,
  ColorFormat,
  ExtractColorMode,
} from "~/types/color";
import type { SessionState } from "~/types/session";
import { convertRgb } from "./convert";
import { round } from "./units";

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

export { createService, generateColor };

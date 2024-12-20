import { parse, rgb, hsl, hwb, lab, lch, oklab, oklch } from "culori";
import { round, limiter } from "./utils";
import {
  formatHex,
  formatRgb,
  formatHsl,
  formatHwb,
  formatLab,
  formatLch,
  formatOklab,
  formatOklch,
} from "./format";
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
import { createStore } from "zustand";

export type ThemeVariant = "auto" | "light" | "dark";

export type ColorSpace = {
  rgb: { r: number; g: number; b: number };
  hsl: { h?: number; s: number; l: number };
  hwb: { h?: number; w: number; b: number };
  lab: { l: number; a: number; b: number };
  lch: { l: number; c: number; h?: number };
  oklab: { l: number; a: number; b: number };
  oklch: { l: number; c: number; h?: number };
};

export type ColorFormat =
  | "rgb"
  | "hsl"
  | "hwb"
  | "lab"
  | "lch"
  | "oklab"
  | "oklch";

export type ColorMode<T extends ColorFormat> = ColorSpace[T] & {
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

export type RgbColorMode = ColorMode<"rgb">;
export type HslColorMode = ColorMode<"hsl">;
export type HwbColorMode = ColorMode<"hwb">;
export type LabColorMode = ColorMode<"lab">;
export type LchColorMode = ColorMode<"lch">;
export type OklabColorMode = ColorMode<"oklab">;
export type OklchColorMode = ColorMode<"oklch">;
export type AnyColorMode =
  | RgbColorMode
  | HslColorMode
  | HwbColorMode
  | LabColorMode
  | LchColorMode
  | OklabColorMode
  | OklchColorMode;

export type ColorState = {
  hex: string;
  rgb: { color: RgbColor; css: string };
  hsl: { color: HslColor; css: string };
  hwb: { color: HwbColor; css: string };
  lab: { color: LabColor; css: string };
  lch: { color: LchColor; css: string };
  oklab: { color: OklabColor; css: string };
  oklch: { color: OklchColor; css: string };
  gamut: boolean;
  mode: ColorFormat;
  theme: ThemeVariant;
};

export type ColorAction = {
  setHex: (color: RgbColor) => void;
  setRgb: (color: RgbColor) => void;
  setHsl: (color: HslColor) => void;
  setHwb: (color: HwbColor) => void;
  setLab: (color: LabColor) => void;
  setLch: (color: LchColor) => void;
  setOklab: (color: OklabColor) => void;
  setOklch: (color: OklchColor) => void;
  setGamut: (p3: boolean) => void;
  setMode: (format: ColorFormat) => void;
  setTheme: (variant: ThemeVariant) => void;
};

export type ColorStore = ColorState & ColorAction;

export const createColorStore = (initValue: ColorState) => {
  return createStore<ColorStore>()((set) => ({
    ...initValue,
    setHex: (newColor) =>
      set(() => {
        const color = rgb({ mode: "rgb", ...newColor });
        return {
          hex: formatHex(color),
        };
      }),
    setRgb: (newColor) =>
      set(() => {
        const color = rgb({ mode: "rgb", ...newColor });
        return {
          rgb: {
            color: { r: color.r, g: color.g, b: color.b },
            css: formatRgb(color),
          },
        };
      }),
    setHsl: (newColor) =>
      set(() => {
        const color = hsl({ mode: "hsl", ...newColor });
        return {
          hsl: {
            color: { h: color.h, s: color.s, l: color.l },
            css: formatHsl(color),
          },
        };
      }),
    setHwb: (newColor) =>
      set(() => {
        const color = hwb({ mode: "hwb", ...newColor });
        return {
          hwb: {
            color: { h: color.h, w: color.w, b: color.b },
            css: formatHwb(color),
          },
        };
      }),
    setLab: (newColor) =>
      set(() => {
        const color = lab({ mode: "lab", ...newColor });
        return {
          lab: {
            color: { l: color.l, a: color.a, b: color.b },
            css: formatLab(color),
          },
        };
      }),
    setLch: (newColor) =>
      set(() => {
        const color = lch({ mode: "lch", ...newColor });
        return {
          lch: {
            color: { l: color.l, c: color.c, h: color.h },
            css: formatLch(color),
          },
        };
      }),
    setOklab: (newColor) =>
      set(() => {
        const color = oklab({ mode: "oklab", ...newColor });
        return {
          oklab: {
            color: { l: color.l, a: color.a, b: color.b },
            css: formatOklab(color),
          },
        };
      }),
    setOklch: (newColor) =>
      set(() => {
        const color = oklch({ mode: "oklch", ...newColor });
        return {
          oklch: {
            color: { l: color.l, c: color.c, h: color.h },
            css: formatOklch(color),
          },
        };
      }),
    setGamut: (p3) => set(() => ({ gamut: p3 })),
    setMode: (format) => set(() => ({ mode: format })),
    setTheme: (variant) => set(() => ({ theme: variant })),
  }));
};

export const createColor = (byHex: string) => {
  return {
    hex: byHex,
    rgb: parseRgb(byHex),
    hsl: parseHsl(byHex),
    hwb: parseHwb(byHex),
    lab: parseLab(byHex),
    lch: parseLch(byHex),
    oklab: parseOklab(byHex),
    oklch: parseOklch(byHex),
  };
};

export const isValidColor = (newColor: string): boolean => {
  const colorName = newColor.replace("#", "");
  const color = parse(colorName);

  if (typeof color === "object") {
    return true;
  } else {
    const hex = parse(newColor);
    if (typeof hex === "object") {
      return true;
    } else {
      return false;
    }
  }
};

export const isValidHex = (newColor: string): string => {
  const color = parse(newColor);

  if (typeof color === "object") {
    return formatHex(rgb(color));
  } else {
    return newColor;
  }
};

export const getTodayColor = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  const hue = round(limiter((day * year) / month, 0, 360), 2);
  const saturation = round(limiter(month * 12, 0.64, 0.96), 4);
  const lightness = round(limiter(day * 30, 0.32, 0.64), 4);

  return parseHex({
    mode: "hsl",
    h: hue,
    s: saturation,
    l: lightness,
  });
};

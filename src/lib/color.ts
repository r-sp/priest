import {
  formatCss,
  formatRgb,
  formatHsl,
  modeRgb,
  modeHsl,
  modeLab,
  modeLch,
  modeOklab,
  modeOklch,
  useMode as setMode,
} from "culori/fn";

import { createStore } from "zustand";

export type ColorSpace = {
  rgb: { r: number; g: number; b: number };
  hsl: { h?: number; s: number; l: number };
  lab: { l: number; a: number; b: number };
  lch: { l: number; c: number; h?: number };
  oklab: { l: number; a: number; b: number };
  oklch: { l: number; c: number; h?: number };
};

export type ColorFormat = "rgb" | "hsl" | "lab" | "lch" | "oklab" | "oklch";

export type ColorMode<T extends ColorFormat> = ColorSpace[T] & {
  mode: T;
};

export type RgbColor = ColorSpace["rgb"];
export type HslColor = ColorSpace["hsl"];
export type LabColor = ColorSpace["lab"];
export type LchColor = ColorSpace["lch"];
export type OklabColor = ColorSpace["oklab"];
export type OklchColor = ColorSpace["oklch"];
export type AnyColor =
  | RgbColor
  | HslColor
  | LabColor
  | LchColor
  | OklabColor
  | OklchColor;

export type RgbColorMode = ColorMode<"rgb">;
export type HslColorMode = ColorMode<"hsl">;
export type LabColorMode = ColorMode<"lab">;
export type LchColorMode = ColorMode<"lch">;
export type OklabColorMode = ColorMode<"oklab">;
export type OklchColorMode = ColorMode<"oklch">;
export type AnyColorMode =
  | RgbColorMode
  | HslColorMode
  | LabColorMode
  | LchColorMode
  | OklabColorMode
  | OklchColorMode;

const colorRgb = (newColor: RgbColor): RgbColorMode => {
  const rgb = setMode(modeRgb);
  return rgb({ mode: "rgb", ...newColor });
};
const colorHsl = (newColor: HslColor): HslColorMode => {
  const hsl = setMode(modeHsl);
  return hsl({ mode: "hsl", ...newColor });
};
const colorLab = (newColor: LabColor): LabColorMode => {
  const lab = setMode(modeLab);
  return lab({ mode: "lab", ...newColor });
};
const colorLch = (newColor: LchColor): LchColorMode => {
  const lch = setMode(modeLch);
  return lch({ mode: "lch", ...newColor });
};
const colorOklab = (newColor: OklabColor): OklabColorMode => {
  const oklab = setMode(modeOklab);
  return oklab({ mode: "oklab", ...newColor });
};
const colorOklch = (newColor: OklchColor): OklchColorMode => {
  const oklch = setMode(modeOklch);
  return oklch({ mode: "oklch", ...newColor });
};

export type ColorState = {
  rgb: { color: RgbColor; css: string };
  hsl: { color: HslColor; css: string };
  lab: { color: LabColor; css: string };
  lch: { color: LchColor; css: string };
  oklab: { color: OklabColor; css: string };
  oklch: { color: OklchColor; css: string };
};

export type ColorAction = {
  setRgb: (color: RgbColor) => void;
  setHsl: (color: HslColor) => void;
  setLab: (color: LabColor) => void;
  setLch: (color: LchColor) => void;
  setOklab: (color: OklabColor) => void;
  setOklch: (color: OklchColor) => void;
};

export type ColorStore = ColorState & ColorAction;

export const createColorStore = (initValue: ColorState) => {
  return createStore<ColorStore>()((set) => ({
    ...initValue,
    setRgb: (newColor) =>
      set(() => {
        const color = colorRgb(newColor);
        return {
          rgb: {
            color: { r: color.r, g: color.g, b: color.b },
            css: formatRgb(color),
          },
        };
      }),
    setHsl: (newColor) =>
      set(() => {
        const color = colorHsl(newColor);
        return {
          hsl: {
            color: { h: color.h, s: color.s, l: color.l },
            css: formatHsl(color),
          },
        };
      }),
    setLab: (newColor) =>
      set(() => {
        const color = colorLab(newColor);
        return {
          lab: {
            color: { l: color.l, a: color.a, b: color.b },
            css: formatCss(color),
          },
        };
      }),
    setLch: (newColor) =>
      set(() => {
        const color = colorLch(newColor);
        return {
          lch: {
            color: { l: color.l, c: color.c, h: color.h },
            css: formatCss(color),
          },
        };
      }),
    setOklab: (newColor) =>
      set(() => {
        const color = colorOklab(newColor);
        return {
          oklab: {
            color: { l: color.l, a: color.a, b: color.b },
            css: formatCss(color),
          },
        };
      }),
    setOklch: (newColor) =>
      set(() => {
        const color = colorOklch(newColor);
        return {
          oklch: {
            color: { l: color.l, c: color.c, h: color.h },
            css: formatCss(color),
          },
        };
      }),
  }));
};

export const stringifyColor = (newColor: AnyColorMode): string => {
  switch (newColor.mode) {
    case "rgb":
      return formatRgb(colorRgb(newColor));
      break;
    case "hsl":
      return formatHsl(colorHsl(newColor));
      break;
    case "lab":
      return formatCss(colorLab(newColor));
      break;
    case "lch":
      return formatCss(colorLch(newColor));
      break;
    case "oklab":
      return formatCss(colorOklab(newColor));
      break;
    case "oklch":
      return formatCss(colorOklch(newColor));
  }
};

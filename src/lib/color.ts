import {
  rgb,
  hsl,
  lab,
  lch,
  oklab,
  oklch,
  formatCss,
  formatRgb,
  formatHsl,
  formatHex,
} from "culori";

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

export const Rgb = (color: RgbColor) => {
  return rgb({ mode: "rgb", ...color });
};
export const Hsl = (color: HslColor) => {
  return hsl({ mode: "hsl", ...color });
};
export const Lab = (color: LabColor) => {
  return lab({ mode: "lab", ...color });
};
export const Lch = (color: LchColor) => {
  return lch({ mode: "lch", ...color });
};
export const Oklab = (color: OklabColor) => {
  return oklab({ mode: "oklab", ...color });
};
export const Oklch = (color: OklchColor) => {
  return oklch({ mode: "oklch", ...color });
};
export const Hex = (color: string) => {
  return formatHex(color) || "";
};
export const Css = (color: AnyColorMode) => {
  switch (color.mode) {
    case "rgb":
      return formatRgb(color);
      break;
    case "hsl":
      return formatHsl(color);
      break;
    default:
      return formatCss(color);
  }
};

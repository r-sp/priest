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

export type ComposeColor<T extends ColorFormat> = {
  color: ColorSpace[T];
  css: string;
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

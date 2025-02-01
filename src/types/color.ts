interface RGB {
  r: number;
  g: number;
  b: number;
}

interface HSL {
  h?: number;
  s: number;
  l: number;
}

interface HWB {
  h?: number;
  w: number;
  b: number;
}

interface LAB {
  l: number;
  a: number;
  b: number;
}

interface LCH {
  l: number;
  c: number;
  h?: number;
}

export interface ColorSpace {
  rgb: RGB;
  hsl: HSL;
  hwb: HWB;
  lab: LAB;
  lch: LCH;
  oklab: LAB;
  oklch: LCH;
}

export type ColorMode<T extends keyof ColorSpace> = ColorSpace[T] & {
  mode: T;
};

export type ComposeColor<T extends keyof ColorSpace> = {
  color: ColorSpace[T];
  css: string;
};

export type RgbColor = ColorSpace["rgb"];
export type HslColor = ColorSpace["hsl"];
export type HwbColor = ColorSpace["hwb"];
export type LabColor = ColorSpace["lab"];
export type LchColor = ColorSpace["lch"];
export type OklabColor = ColorSpace["oklab"];
export type OklchColor = ColorSpace["oklch"];

export type RgbColorMode = ColorMode<"rgb">;
export type HslColorMode = ColorMode<"hsl">;
export type HwbColorMode = ColorMode<"hwb">;
export type LabColorMode = ColorMode<"lab">;
export type LchColorMode = ColorMode<"lch">;
export type OklabColorMode = ColorMode<"oklab">;
export type OklchColorMode = ColorMode<"oklch">;

export type AnyColor =
  | RgbColor
  | HslColor
  | HwbColor
  | LabColor
  | LchColor
  | OklabColor
  | OklchColor;

export type AnyColorMode =
  | RgbColorMode
  | HslColorMode
  | HwbColorMode
  | LabColorMode
  | LchColorMode
  | OklabColorMode
  | OklchColorMode;

export type ExtractColor<T extends keyof ColorSpace> = ColorSpace[T];

export type ExtractColorMode<T extends keyof ColorSpace> = Extract<
  AnyColorMode,
  { mode: T }
>;

export type AnyColorType<T extends keyof ColorSpace> =
  | Extract<AnyColorMode, { mode: T }>
  | ColorSpace[T];

export interface HueColorMode {
  color:
    | ColorMode<"hsl">
    | ColorMode<"hwb">
    | ColorMode<"lch">
    | ColorMode<"oklch">;
  value: number;
  min: number;
  max: number;
}

export interface ColorState {
  hex: string;
  rgb: ComposeColor<"rgb">;
  hsl: ComposeColor<"hsl">;
  hwb: ComposeColor<"hwb">;
  lab: ComposeColor<"lab">;
  lch: ComposeColor<"lch">;
  oklab: ComposeColor<"oklab">;
  oklch: ComposeColor<"oklch">;
}

export interface ColorQuery {
  mode: keyof ColorSpace;
  r?: number;
  g?: number;
  b?: number;
  h?: number;
  s?: number;
  l?: number;
  w?: number;
  a?: number;
  c?: number;
}

export type ColorFormat = keyof ColorSpace;

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

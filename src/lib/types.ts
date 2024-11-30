type Color = {
  hex: string;
  hsl: { h: number; s: number; l: number };
  rgb: { r: number; g: number; b: number };
};

type Format = "hsl" | "rgb";

type Alpha<T extends Format> = Color[T] & {
  a: number;
};

export type HexColor = Color["hex"];

export type HslColor = Color["hsl"];
export type HslaColor = Alpha<"hsl">;

export type RgbColor = Color["rgb"];
export type RgbaColor = Alpha<"rgb">;

type AnyColorWithAlpha = HslaColor | RgbaColor;

export type AnyColor = HexColor | HslColor | RgbColor | AnyColorWithAlpha;

export type HarmonyColor =
  | "analogous"
  | "complementary"
  | "double-split-complementary"
  | "rectangle"
  | "split-complementary"
  | "tetradic"
  | "triadic";

export type ColorSpace = {
  raw: AnyColor;
  hex: HexColor;
  hsl: HslaColor;
  rgb: RgbaColor;
  harmony: HarmonyColor;
};

export type ColorAction = {
  update: (newColor: Partial<ColorSpace>) => void;
  setHarmony: (type: HarmonyColor) => void;
};

export type ColorState = ColorSpace & ColorAction;

type Color = {
  hsl: { h: number; s: number; l: number };
  hsv: { h: number; s: number; v: number };
  rgb: { r: number; g: number; b: number };
};

type Format = "hsl" | "hsv" | "rgb";
type Alpha<T extends Format> = Color[T] & {
  a: number;
};

export type HslColor = Color["hsl"];
export type HslaColor = Alpha<"hsl">;

export type HsvColor = Color["hsv"];
export type HsvaColor = Alpha<"hsv">;

export type RgbColor = Color["rgb"];
export type RgbaColor = Alpha<"rgb">;

export type AnyColor = string | HslColor | HsvColor | RgbColor | HslaColor | HsvaColor | RgbaColor;

export type HarmonyColor =
  | "analogous"
  | "complementary"
  | "double-split-complementary"
  | "rectangle"
  | "split-complementary"
  | "tetradic"
  | "triadic";

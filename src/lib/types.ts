type Color = {
  hex: string;
  hsl: { h: number; s: number; l: number };
  hsv: { h: number; s: number; v: number };
  rgb: { r: number; g: number; b: number };
};

type Format = "hsl" | "hsv" | "rgb";

type Alpha<T extends Format> = Color[T] & {
  a: number;
};

export type HexColor = Color["hex"];

export type HslColor = Color["hsl"];
export type HslaColor = Alpha<"hsl">;

export type HsvColor = Color["hsv"];
export type HsvaColor = Alpha<"hsv">;

export type RgbColor = Color["rgb"];
export type RgbaColor = Alpha<"rgb">;

type AnyColorWithAlpha = HslaColor | HsvaColor | RgbaColor;

export type AnyColor = HexColor | HslColor | HsvColor | RgbColor | AnyColorWithAlpha;

export type ColorSpace = {
  raw: AnyColor;
  hex: HexColor;
  hsl: HslaColor;
  hsv: HsvaColor;
  rgb: RgbaColor;
};

export type ColorAction = {
  update: (newColor: Partial<ColorSpace>) => void;
};

export type ColorState = ColorSpace & ColorAction;

export type HarmonyColor =
  | "analogous"
  | "complementary"
  | "double-split-complementary"
  | "rectangle"
  | "split-complementary"
  | "tetradic"
  | "triadic";

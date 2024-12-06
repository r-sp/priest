import { rgb, hsl, lab, lch, oklab, oklch } from "culori";
import { createStore } from "zustand";
import { round } from "./utils";

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

export const colorRgb = (newColor: RgbColor): RgbColorMode => {
  return rgb({ mode: "rgb", ...newColor });
};
export const colorHsl = (newColor: HslColor): HslColorMode => {
  return hsl({ mode: "hsl", ...newColor });
};
export const colorLab = (newColor: LabColor): LabColorMode => {
  return lab({ mode: "lab", ...newColor });
};
export const colorLch = (newColor: LchColor): LchColorMode => {
  return lch({ mode: "lch", ...newColor });
};
export const colorOklab = (newColor: OklabColor): OklabColorMode => {
  return oklab({ mode: "oklab", ...newColor });
};
export const colorOklch = (newColor: OklchColor): OklchColorMode => {
  return oklch({ mode: "oklch", ...newColor });
};

export const formatRgb = (newColor: RgbColor | RgbColorMode): string => {
  const { r, g, b } = newColor;
  const red = round(r * 255);
  const green = round(g * 255);
  const blue = round(b * 255);

  return `rgb(${red} ${green} ${blue})`;
};
export const formatHsl = (newColor: HslColor | HslColorMode): string => {
  const { h, s, l } = newColor;
  const hue = round(h || 0, 2);
  const saturation = round(s * 100, 2);
  const lightness = round(l * 100, 2);

  return `hsl(${hue} ${saturation}% ${lightness}%)`;
};
export const formatLab = (newColor: LabColor | LabColorMode): string => {
  const { l, a, b } = newColor;
  const lightness = round(l, 3);
  const greenRed = round(a, 3);
  const blueYellow = round(b, 3);

  return `lab(${lightness} ${greenRed} ${blueYellow})`;
};
export const formatLch = (newColor: LchColor | LchColorMode): string => {
  const { l, c, h } = newColor;
  const lightness = round(l, 3);
  const chroma = round(c, 3);
  const hue = round(h || 0, 2);

  return `lch(${lightness} ${chroma} ${hue})`;
};
export const formatOklab = (newColor: OklabColor | OklabColorMode): string => {
  const { l, a, b } = newColor;
  const lightness = round(l, 3);
  const greenRed = round(a, 3);
  const blueYellow = round(b, 3);

  return `oklab(${lightness} ${greenRed} ${blueYellow})`;
};
export const formatOklch = (newColor: OklchColor | OklchColorMode): string => {
  const { l, c, h } = newColor;
  const lightness = round(l, 3);
  const chroma = round(c, 3);
  const hue = round(h || 0, 2);

  return `oklch(${lightness} ${chroma} ${hue})`;
};

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
            css: formatLab(color),
          },
        };
      }),
    setLch: (newColor) =>
      set(() => {
        const color = colorLch(newColor);
        return {
          lch: {
            color: { l: color.l, c: color.c, h: color.h },
            css: formatLch(color),
          },
        };
      }),
    setOklab: (newColor) =>
      set(() => {
        const color = colorOklab(newColor);
        return {
          oklab: {
            color: { l: color.l, a: color.a, b: color.b },
            css: formatOklab(color),
          },
        };
      }),
    setOklch: (newColor) =>
      set(() => {
        const color = colorOklch(newColor);
        return {
          oklch: {
            color: { l: color.l, c: color.c, h: color.h },
            css: formatOklch(color),
          },
        };
      }),
  }));
};

export const stringifyColor = (newColor: AnyColorMode): string => {
  switch (newColor.mode) {
    case "rgb":
      return formatRgb(rgb(newColor));
      break;
    case "hsl":
      return formatHsl(hsl(newColor));
      break;
    case "lab":
      return formatLab(lab(newColor));
      break;
    case "lch":
      return formatLch(lch(newColor));
      break;
    case "oklab":
      return formatOklab(oklab(newColor));
      break;
    case "oklch":
      return formatOklch(oklch(newColor));
  }
};

export const initColorStore = () => {
  const limiter = (min: number, max: number) => {
    return min + Math.random() * (max - min);
  };

  const red = limiter(0, 1);
  const green = limiter(0, 1);
  const blue = limiter(0, 1);

  const color = rgb({ mode: "rgb", r: red, g: green, b: blue });

  const _rgb = color;
  const _hsl = hsl(color);
  const _lab = lab(color);
  const _lch = lch(color);
  const _oklab = oklab(color);
  const _oklch = oklch(color);

  // prettier-ignore
  const store = {
    rgb: { color: { r: _rgb.r, g: _rgb.g, b: _rgb.b }, css: formatRgb(_rgb) },
    hsl: { color: { h: _hsl.h, s: _hsl.s, l: _hsl.l }, css: formatHsl(_hsl) },
    lab: { color: { l: _lab.l, a: _lab.a, b: _lab.b }, css: formatLab(_lab) },
    lch: { color: { l: _lch.l, c: _lch.c, h: _lch.h}, css: formatLch(_lch) },
    oklab: { color: { l: _oklab.l, a: _oklab.a, b: _oklab.b }, css: formatOklab(_oklab) },
    oklch: { color: { l: _oklch.l, c: _oklch.c, h: _oklch.h}, css: formatOklch(_oklch) },
  };

  return store;
};

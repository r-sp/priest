import { parse, rgb, hsl, hwb, lab, lch, oklab, oklch } from "culori";
import { createStore } from "zustand";
import { round, floor } from "./utils";

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
};

export type ColorAction = {
  setAll: (color: ColorState) => void;
  setHex: (color: RgbColor) => void;
  setRgb: (color: RgbColor) => void;
  setHsl: (color: HslColor) => void;
  setHwb: (color: HwbColor) => void;
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
export const colorHwb = (newColor: HwbColor): HwbColorMode => {
  return hwb({ mode: "hwb", ...newColor });
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

export const formatHex = (newColor: RgbColor | RgbColorMode): string => {
  const { r, g, b } = newColor;

  const clamp = (value: number) => Math.max(0, Math.min(1, value || 0));
  const fixup = (value: number) => Math.round(clamp(value) * 255);

  const red = fixup(r);
  const green = fixup(g);
  const blue = fixup(b);

  return (
    "#" + ((1 << 24) | (red << 16) | (green << 8) | blue).toString(16).slice(1)
  );
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
export const formatHwb = (newColor: HwbColor | HwbColorMode): string => {
  const { h, w, b } = newColor;
  const hue = round(h || 0, 2);
  const whiteness = round(w * 100, 2);
  const blackness = round(b * 100, 2);

  return `hwb(${hue} ${whiteness}% ${blackness}%)`;
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
    setAll: (newColor) => set((state) => ({ ...state, ...newColor })),
    setHex: (newColor) =>
      set(() => {
        const color = colorRgb(newColor);
        return {
          hex: formatHex(color),
        };
      }),
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
    setHwb: (newColor) =>
      set(() => {
        const color = colorHwb(newColor);
        return {
          hwb: {
            color: { h: color.h, w: color.w, b: color.b },
            css: formatHwb(color),
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

export const createColorHex = (newColor: string | AnyColorMode): string => {
  const _rgb = rgb(newColor) || { r: 0, g: 0, b: 0 };
  return formatHex(_rgb);
};
export const createColorRgb = (
  newColor: string,
): { color: RgbColor; css: string } => {
  const _rgb = rgb(newColor) || { r: 0, g: 0, b: 0 };

  return { color: { r: _rgb.r, g: _rgb.g, b: _rgb.b }, css: formatRgb(_rgb) };
};
export const createColorHsl = (
  newColor: string,
): { color: HslColor; css: string } => {
  const _hsl = hsl(newColor) || { h: 0, s: 0, l: 0 };

  return {
    color: { h: _hsl.h || 0, s: _hsl.s, l: _hsl.l },
    css: formatHsl(_hsl),
  };
};
export const createColorHwb = (
  newColor: string,
): { color: HwbColor; css: string } => {
  const _hwb = hwb(newColor) || { h: 0, w: 0, b: 0 };

  return {
    color: { h: _hwb.h || 0, w: _hwb.w, b: _hwb.b },
    css: formatHwb(_hwb),
  };
};
export const createColorLab = (
  newColor: string,
): { color: LabColor; css: string } => {
  const _lab = lab(newColor) || { l: 0, a: 0, b: 0 };

  return { color: { l: _lab.l, a: _lab.a, b: _lab.b }, css: formatLab(_lab) };
};
export const createColorLch = (
  newColor: string,
): { color: LchColor; css: string } => {
  const _lch = lch(newColor) || { l: 0, c: 0, h: 0 };

  return {
    color: { l: _lch.l, c: _lch.c, h: _lch.h || 0 },
    css: formatLch(_lch),
  };
};
export const createColorOklab = (
  newColor: string,
): { color: OklabColor; css: string } => {
  const _oklab = oklab(newColor) || { l: 0, a: 0, b: 0 };

  return {
    color: { l: _oklab.l, a: _oklab.a, b: _oklab.b },
    css: formatOklab(_oklab),
  };
};
export const createColorOklch = (
  newColor: string,
): { color: OklchColor; css: string } => {
  const _oklch = oklch(newColor) || { l: 0, c: 0, h: 0 };

  return {
    color: { l: _oklch.l, c: _oklch.c, h: _oklch.h || 0 },
    css: formatOklch(_oklch),
  };
};

export const createColor = (newColor: string): ColorState => {
  const _rgb = createColorRgb(newColor);
  const _hsl = createColorHsl(newColor);
  const _hwb = createColorHwb(newColor);
  const _lab = createColorLab(newColor);
  const _lch = createColorLch(newColor);
  const _oklab = createColorOklab(newColor);
  const _oklch = createColorOklch(newColor);

  const store = {
    hex: formatHex(_rgb.color),
    rgb: _rgb,
    hsl: _hsl,
    hwb: _hwb,
    lab: _lab,
    lch: _lch,
    oklab: _oklab,
    oklch: _oklch,
  };

  return store;
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

export const parseColor = () => {
  return {
    hex: createColorHex,
    rgb: createColorRgb,
    hsl: createColorHsl,
    hwb: createColorHwb,
    lab: createColorLab,
    lch: createColorLch,
    oklab: createColorOklab,
    oklch: createColorOklch,
  };
};

export const stringifyColor = (newColor: AnyColorMode): string => {
  switch (newColor.mode) {
    case "rgb":
      return formatRgb(rgb(newColor));
      break;
    case "hsl":
      return formatHsl(hsl(newColor));
      break;
    case "hwb":
      return formatHwb(hwb(newColor));
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

interface ReadabilityColor {
  level: "AA" | "AAA";
  size: "normal" | "large";
}

export const getBrightness = (newColor: RgbColor): number => {
  const { r, g, b } = newColor;

  const red = round(r * 255);
  const green = round(g * 255);
  const blue = round(b * 255);

  return (red * 299 + green * 587 + blue * 114) / 1000 / 255;
};
export const getLuminance = (newColor: RgbColor): number => {
  const linear = (value: number) => {
    const ratio = value / 255;
    return ratio < 0.04045
      ? ratio / 12.92
      : Math.pow((ratio + 0.055) / 1.055, 2.4);
  };

  const { r, g, b } = newColor;

  const red = linear(r * 255);
  const green = linear(g * 255);
  const blue = linear(b * 255);

  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
};
export const getContrast = (
  foreground: RgbColor,
  background: RgbColor,
): number => {
  const fg = getLuminance(foreground);
  const bg = getLuminance(background);

  return fg > bg ? (fg + 0.05) / (bg + 0.05) : (bg + 0.05) / (fg + 0.05);
};
export const getMinimalContrast = ({
  level = "AA",
  size = "normal",
}: ReadabilityColor): number => {
  if (level === "AAA" && size === "normal") return 7;
  if (level === "AA" && size === "large") return 3;
  return 4.5;
};

export const brightness = (newColor: RgbColor): string => {
  const color = round(getBrightness(newColor), 2);
  const level = round(color * 100);

  if (color >= 0.5) {
    return `${level}% (Light)`;
  } else {
    return `${level}% (Dark)`;
  }
};
export const luminance = (newColor: RgbColor): string => {
  const color = round(getLuminance(newColor), 2);
  const level = round(color * 100);

  return `${level}%`;
};
export const contrast = (
  foreground: RgbColor,
  background: RgbColor,
): string => {
  const color = floor(getContrast(foreground, background), 2);

  return `${color}:1`;
};
export const isReadable = (
  foreground: RgbColor,
  background: RgbColor,
  options: ReadabilityColor,
): boolean => {
  const contrast = floor(getContrast(foreground, background), 2);
  const readable = getMinimalContrast(options);

  return contrast >= readable;
};

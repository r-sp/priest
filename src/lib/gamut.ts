import type { ColorFormat, AnyColorMode } from "./color";

type ColorGamut = {
  [Key in ColorFormat]: {
    get: (
      color: Extract<AnyColorMode, { mode: Key }>,
    ) => Extract<AnyColorMode, { mode: Key }>;
    set: (
      color: Extract<AnyColorMode, { mode: Key }>,
    ) => Extract<AnyColorMode, { mode: Key }>;
  };
};

const colorGamut: ColorGamut = {
  rgb: {
    get: (color) => ({
      mode: "rgb",
      r: color.r / 255,
      g: color.g / 255,
      b: color.b / 255,
    }),
    set: (color) => ({
      mode: "rgb",
      r: color.r * 255,
      g: color.g * 255,
      b: color.b * 255,
    }),
  },
  hsl: {
    get: (color) => ({
      mode: "hsl",
      h: color.h,
      s: color.s / 100,
      l: color.l / 100,
    }),
    set: (color) => ({
      mode: "hsl",
      h: color.h,
      s: color.s * 100,
      l: color.l * 100,
    }),
  },
  hwb: {
    get: (color) => ({
      mode: "hwb",
      h: color.h,
      w: color.w / 100,
      b: color.b / 100,
    }),
    set: (color) => ({
      mode: "hwb",
      h: color.h,
      w: color.w * 100,
      b: color.b * 100,
    }),
  },
  lab: { get: (color) => color, set: (color) => color },
  lch: { get: (color) => color, set: (color) => color },
  oklab: { get: (color) => color, set: (color) => color },
  oklch: { get: (color) => color, set: (color) => color },
};

const increaseGamut = <T extends ColorFormat>(
  mode: T,
): ((
  color: Extract<AnyColorMode, { mode: T }>,
) => Extract<AnyColorMode, { mode: T }>) => {
  return colorGamut[mode].set;
};

const decreaseGamut = <T extends ColorFormat>(
  mode: T,
): ((
  color: Extract<AnyColorMode, { mode: T }>,
) => Extract<AnyColorMode, { mode: T }>) => {
  return colorGamut[mode].get;
};

export const getGamut = (
  color: string | AnyColorMode,
): string | AnyColorMode => {
  if (typeof color === "string") {
    return color;
  }

  const compose = decreaseGamut(color.mode);
  return compose(color);
};

export const setGamut = (color: AnyColorMode): AnyColorMode => {
  const compose = increaseGamut(color.mode);
  return compose(color);
};

let currentGamut: string | null = null;

const getGamutRange = (
  label: string,
  value: number,
  min: number,
  max: number,
): string | null => {
  if (value < min) {
    return `${label}-under-${min}`;
  } else if (value > max) {
    return `${label}-above-${max}`;
  }
  return null;
};

const setGamutRange = (
  label: string,
  value: number,
  min: number,
  max: number,
) => {
  const invalid = getGamutRange(label, value, min, max);
  if (invalid) {
    if (!currentGamut) {
      currentGamut = invalid;
    } else {
      currentGamut += `-and-${invalid}`;
    }
  }
};

type FormatGamut = {
  [Key in ColorFormat]: (color: Extract<AnyColorMode, { mode: Key }>) => void;
};

export const formatGamut: FormatGamut = {
  rgb: (color) => {
    setGamutRange("red", color.r, 0, 255);
    setGamutRange("green", color.g, 0, 255);
    setGamutRange("blue", color.b, 0, 255);
  },
  hsl: (color) => {
    setGamutRange("hue", color.h!, 0, 360);
    setGamutRange("saturation", color.s, 0, 100);
    setGamutRange("lightness", color.l, 0, 100);
  },
  hwb: (color) => {
    setGamutRange("hue", color.h!, 0, 360);
    setGamutRange("whiteness", color.w, 0, 100);
    setGamutRange("blackness", color.b, 0, 100);
  },
  lab: (color) => {
    setGamutRange("lightness", color.l, 0, 100);
    setGamutRange("green-red", color.a, -100, 100);
    setGamutRange("blue-yellow", color.b, -100, 100);
  },
  lch: (color) => {
    setGamutRange("lightness", color.l, 0, 100);
    setGamutRange("chroma", color.c, 0, 150);
    setGamutRange("hue", color.h!, 0, 360);
  },
  oklab: (color) => {
    setGamutRange("lightness", color.l, 0, 1);
    setGamutRange("green-red", color.a, -0.4, 0.4);
    setGamutRange("blue-yellow", color.b, -0.4, 0.4);
  },
  oklch: (color) => {
    setGamutRange("lightness", color.l, 0, 1);
    setGamutRange("chroma", color.c, 0, 0.4);
    setGamutRange("hue", color.h!, 0, 360);
  },
};

const gamutMode = <T extends ColorFormat>(
  mode: T,
): ((color: Extract<AnyColorMode, { mode: T }>) => void) => {
  return formatGamut[mode];
};

export const checkGamut = (color: AnyColorMode): string | null => {
  const compose = gamutMode(color.mode);
  currentGamut = "";
  compose(color);
  return currentGamut;
};

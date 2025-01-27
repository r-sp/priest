import type { ColorFormat, ColorLabel, AnyColorMode } from "./color";

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

const formatGamut: FormatGamut = {
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

type OffsetRange = {
  offset: ColorLabel;
  range: string;
};

const offsetRange = (
  label: ColorLabel,
  min: number,
  max: number,
): OffsetRange => {
  return { offset: label, range: `${label} [${min}, ${max}]` };
};

type OffsetGamut = {
  [Key in ColorFormat]: [OffsetRange, OffsetRange, OffsetRange];
};

const offsetGamut: OffsetGamut = {
  rgb: [
    offsetRange("red", 0, 255),
    offsetRange("green", 0, 255),
    offsetRange("blue", 0, 255),
  ],
  hsl: [
    offsetRange("hue", 0, 360),
    offsetRange("saturation", 0, 100),
    offsetRange("lightness", 0, 100),
  ],
  hwb: [
    offsetRange("hue", 0, 360),
    offsetRange("whiteness", 0, 100),
    offsetRange("blackness", 0, 100),
  ],
  lab: [
    offsetRange("lightness", 0, 100),
    offsetRange("green-red", -100, 100),
    offsetRange("blue-yellow", -100, 100),
  ],
  lch: [
    offsetRange("lightness", 0, 100),
    offsetRange("chroma", 0, 150),
    offsetRange("hue", 0, 360),
  ],
  oklab: [
    offsetRange("lightness", 0, 1),
    offsetRange("green-red", -0.4, 0.4),
    offsetRange("blue-yellow", -0.4, 0.4),
  ],
  oklch: [
    offsetRange("lightness", 0, 1),
    offsetRange("chroma", 0, 0.4),
    offsetRange("hue", 0, 360),
  ],
};

const offsetMode = <T extends ColorFormat>(mode: T): OffsetGamut[T] => {
  return offsetGamut[mode];
};

export const gamutRange = (
  color: AnyColorMode,
  error: string,
): [[boolean, boolean, boolean], [string, string, string]] => {
  const [start, middle, end] = offsetMode(color.mode);
  const offset: [boolean, boolean, boolean] = [
    error.includes(start.offset),
    error.includes(middle.offset),
    error.includes(end.offset),
  ];
  const range: [string, string, string] = [
    start.range,
    middle.range,
    end.range,
  ];
  return [offset, range];
};

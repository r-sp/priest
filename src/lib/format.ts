import type {
  RgbColor,
  HslColor,
  HwbColor,
  LabColor,
  LchColor,
  OklabColor,
  OklchColor,
} from "./types";

export const formatHex = (color: RgbColor): string => {
  const { r, g, b } = color;

  return "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
};

export const formatRgb = (color: RgbColor): string => {
  const { r, g, b } = color;

  return `rgb(${r} ${g} ${b})`;
};

export const formatHsl = (color: HslColor): string => {
  const { h, s, l } = color;

  return `hsl(${h} ${s}% ${l}%)`;
};

export const formatHwb = (color: HwbColor): string => {
  const { h, w, b } = color;

  return `hwb(${h} ${w}% ${b}%)`;
};

export const formatLab = (color: LabColor): string => {
  const { l, a, b } = color;

  return `lab(${l} ${a} ${b})`;
};

export const formatLch = (color: LchColor): string => {
  const { l, c, h } = color;

  return `lch(${l} ${c} ${h})`;
};

export const formatOklab = (color: OklabColor): string => {
  const { l, a, b } = color;

  return `oklab(${l} ${a} ${b})`;
};

export const formatOklch = (color: OklchColor): string => {
  const { l, c, h } = color;

  return `oklch(${l} ${c} ${h})`;
};

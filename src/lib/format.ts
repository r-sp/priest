import type {
  RgbColor,
  HslColor,
  HwbColor,
  LabColor,
  LchColor,
  OklabColor,
  OklchColor,
} from "./types";
import { round } from "~/utils/number";

export const formatHex = (color: RgbColor): string => {
  const { r, g, b } = color;

  const clamp = (value: number) => Math.max(0, Math.min(1, value || 0));
  const fixup = (value: number) => Math.round(clamp(value) * 255);

  const red = fixup(r);
  const green = fixup(g);
  const blue = fixup(b);

  return (
    "#" + ((1 << 24) | (red << 16) | (green << 8) | blue).toString(16).slice(1)
  );
};

export const formatRgb = (color: RgbColor): string => {
  const { r, g, b } = color;
  const red = round(r * 255);
  const green = round(g * 255);
  const blue = round(b * 255);

  return `rgb(${red} ${green} ${blue})`;
};

export const formatHsl = (color: HslColor): string => {
  const { h, s, l } = color;
  const hue = round(h || 0, 2);
  const saturation = round(s * 100, 2);
  const lightness = round(l * 100, 2);

  return `hsl(${hue} ${saturation}% ${lightness}%)`;
};

export const formatHwb = (color: HwbColor): string => {
  const { h, w, b } = color;
  const hue = round(h || 0, 2);
  const whiteness = round(w * 100, 2);
  const blackness = round(b * 100, 2);

  return `hwb(${hue} ${whiteness}% ${blackness}%)`;
};

export const formatLab = (color: LabColor): string => {
  const { l, a, b } = color;
  const lightness = round(l, 3);
  const greenRed = round(a, 3);
  const blueYellow = round(b, 3);

  return `lab(${lightness} ${greenRed} ${blueYellow})`;
};

export const formatLch = (color: LchColor): string => {
  const { l, c, h } = color;
  const lightness = round(l, 3);
  const chroma = round(c, 3);
  const hue = round(h || 0, 3);

  return `lch(${lightness} ${chroma} ${hue})`;
};

export const formatOklab = (color: OklabColor): string => {
  const { l, a, b } = color;
  const lightness = round(l, 3);
  const greenRed = round(a, 3);
  const blueYellow = round(b, 3);

  return `oklab(${lightness} ${greenRed} ${blueYellow})`;
};

export const formatOklch = (color: OklchColor): string => {
  const { l, c, h } = color;
  const lightness = round(l, 3);
  const chroma = round(c, 3);
  const hue = round(h || 0, 3);

  return `oklch(${lightness} ${chroma} ${hue})`;
};

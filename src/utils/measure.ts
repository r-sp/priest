import type { AnyColorType } from "~/types/color";
import { round } from "./units";

const getBrightness = (color: AnyColorType<"rgb">): number => {
  const { r, g, b } = color;
  const average = (r * 299 + g * 587 + b * 114) / 1000 / 255;
  return round(average * 100, 2);
};

const getLightness = (color: AnyColorType<"rgb">): number => {
  const { r, g, b } = color;
  const linear = (value: number): number => {
    const ratio = value / 255;
    return ratio < 0.04045
      ? ratio / 12.92
      : Math.pow((ratio + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b);
};

const getLuminance = (color: AnyColorType<"rgb">): number => {
  return round(getLightness(color) * 100, 2);
};

type ReadableColor = "Pass" | "Fail";

interface ContrastColor {
  ratio: number;
  normal: [ReadableColor, ReadableColor];
  large: [ReadableColor, ReadableColor];
}

const getContrast = (
  background: AnyColorType<"rgb">,
  foreground: AnyColorType<"rgb">,
): ContrastColor => {
  const bg = getLightness(background);
  const fg = getLightness(foreground);
  const front = (fg + 0.05) / (bg + 0.05);
  const back = (bg + 0.05) / (fg + 0.05);

  const average = round(fg > bg ? front : back, 2);

  const check = (current: number, ratio: number): ReadableColor => {
    return current >= ratio ? "Pass" : "Fail";
  };

  const normalAA = check(average, 4.5);
  const normalAAA = check(average, 7);
  const largeAA = check(average, 3);
  const largeAAA = check(average, 4.5);

  return {
    ratio: average,
    normal: [normalAA, normalAAA],
    large: [largeAA, largeAAA],
  };
};

export { getBrightness, getLuminance, getContrast };

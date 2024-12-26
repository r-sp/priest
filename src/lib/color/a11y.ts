import type { RgbColor } from "../types";
import { round, floor } from "../utils";

interface ReadabilityColor {
  level: "AA" | "AAA";
  size: "normal" | "large";
}

const getBrightness = (newColor: RgbColor): number => {
  const { r, g, b } = newColor;

  const red = round(r * 255);
  const green = round(g * 255);
  const blue = round(b * 255);

  return (red * 299 + green * 587 + blue * 114) / 1000 / 255;
};

const getLuminance = (newColor: RgbColor): number => {
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

const getContrast = (foreground: RgbColor, background: RgbColor): number => {
  const fg = getLuminance(foreground);
  const bg = getLuminance(background);

  return fg > bg ? (fg + 0.05) / (bg + 0.05) : (bg + 0.05) / (fg + 0.05);
};

const getMinimalContrast = ({
  level = "AA",
  size = "normal",
}: ReadabilityColor): number => {
  if (level === "AAA" && size === "normal") return 7;
  if (level === "AA" && size === "large") return 3;
  return 4.5;
};

const brightness = (newColor: RgbColor): string => {
  const color = round(getBrightness(newColor), 2);
  const level = round(color * 100);

  if (color >= 0.5) {
    return `${level}% (Light)`;
  } else {
    return `${level}% (Dark)`;
  }
};

const luminance = (newColor: RgbColor): string => {
  const color = round(getLuminance(newColor), 2);
  const level = round(color * 100);

  return `${level}%`;
};

const contrast = (foreground: RgbColor, background: RgbColor): string => {
  const color = floor(getContrast(foreground, background), 2);

  return `${color}:1`;
};

const isReadable = (
  foreground: RgbColor,
  background: RgbColor,
  options: ReadabilityColor,
): boolean => {
  const contrast = floor(getContrast(foreground, background), 2);
  const readable = getMinimalContrast(options);

  return contrast >= readable;
};

export const measureColor = (newColor: RgbColor) => {
  return {
    brightness: brightness(newColor),
    luminance: luminance(newColor),
  };
};

export const contrastColor = (foreground: RgbColor, background: RgbColor) => {
  const average = contrast(foreground, background);
  const check = (readable: boolean) => (readable ? "Pass" : "Fail");

  const normalAA = check(
    isReadable(foreground, background, { level: "AA", size: "normal" }),
  );
  const normalAAA = check(
    isReadable(foreground, background, { level: "AAA", size: "normal" }),
  );
  const largeAA = check(
    isReadable(foreground, background, { level: "AA", size: "large" }),
  );
  const largeAAA = check(
    isReadable(foreground, background, { level: "AAA", size: "large" }),
  );

  return {
    ratio: average,
    normal: {
      aa: normalAA,
      aaa: normalAAA,
    },
    large: {
      aa: largeAA,
      aaa: largeAAA,
    },
  };
};

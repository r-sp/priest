import type { RgbColor } from "../types";
import { round, floor } from "../utils";

interface ReadabilityColor {
  level: "AA" | "AAA";
  size: "normal" | "large";
}

function getBrightness(newColor: RgbColor): number {
  const { r, g, b } = newColor;

  const red = round(r * 255);
  const green = round(g * 255);
  const blue = round(b * 255);

  return (red * 299 + green * 587 + blue * 114) / 1000 / 255;
}

function getLuminance(newColor: RgbColor): number {
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
}

function getContrast(foreground: RgbColor, background: RgbColor): number {
  const fg = getLuminance(foreground);
  const bg = getLuminance(background);

  return fg > bg ? (fg + 0.05) / (bg + 0.05) : (bg + 0.05) / (fg + 0.05);
}

function getMinimalContrast({
  level = "AA",
  size = "normal",
}: ReadabilityColor): number {
  if (level === "AAA" && size === "normal") return 7;
  if (level === "AA" && size === "large") return 3;
  return 4.5;
}

function isReadable(
  foreground: RgbColor,
  background: RgbColor,
  options: ReadabilityColor,
): boolean {
  const contrast = floor(getContrast(foreground, background), 2);
  const readable = getMinimalContrast(options);

  return contrast >= readable;
}

export function measureColor(newColor: RgbColor) {
  return {
    brightness: round(getBrightness(newColor) * 100, 2),
    luminance: round(getLuminance(newColor) * 100, 2),
  };
}

export function contrastColor(foreground: RgbColor, background: RgbColor) {
  const average = floor(getContrast(foreground, background), 2);
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
}

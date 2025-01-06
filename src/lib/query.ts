import type { ColorQuery, ColorSpace } from "./types";

export const extractColorQuery = (color: ColorQuery): ColorSpace => {
  const { mode, r, g, b, h, s, l, w, a, c } = color;

  return {
    rgb:
      mode === "rgb" && r !== null && g !== null && b !== null
        ? { r: r!, g: g!, b: b! }
        : { r: 0, g: 0, b: 0 },
    hsl:
      mode === "hsl" && h !== null && s !== null && l !== null
        ? { h: h!, s: s!, l: l! }
        : { h: 0, s: 0, l: 0 },
    hwb:
      mode === "hwb" && h !== null && w !== null && b !== null
        ? { h: h!, w: w!, b: b! }
        : { h: 0, w: 0, b: 0 },
    lab:
      mode === "lab" && l !== null && a !== null && b !== null
        ? { l: l!, a: a!, b: b! }
        : { l: 0, a: 0, b: 0 },
    lch:
      mode === "lch" && l !== null && c !== null && h !== null
        ? { l: l!, c: c!, h: h! }
        : { l: 0, c: 0, h: 0 },
    oklab:
      mode === "oklab" && l !== null && a !== null && b !== null
        ? { l: l!, a: a!, b: b! }
        : { l: 0, a: 0, b: 0 },
    oklch:
      mode === "oklch" && l !== null && c !== null && h !== null
        ? { l: l!, c: c!, h: h! }
        : { l: 0, c: 0, h: 0 },
  };
};

export const extractColorPath = (color: ColorQuery): string => {
  const { mode, r, g, b, h, s, l, w, a, c } = color;

  if (mode === "rgb" && r !== null && g !== null && b !== null) {
    return `color?mode=rgb&r=${r!}&g=${g!}&b=${b!}`;
  } else if (mode === "hsl" && h !== null && s !== null && l !== null) {
    return `color?mode=hsl&h=${h!}&s=${s!}&l=${l!}`;
  } else if (mode === "hwb" && h !== null && w !== null && b !== null) {
    return `color?mode=hwb&h=${h!}&w=${w!}&b=${b!}`;
  } else if (mode === "lab" && l !== null && a !== null && b !== null) {
    return `color?mode=lab&l=${l!}&a=${a!}&b=${b!}`;
  } else if (mode === "lch" && l !== null && c !== null && h !== null) {
    return `color?mode=lch&l=${l!}&c=${c!}&h=${h!}`;
  } else if (mode === "oklab" && l !== null && a !== null && b !== null) {
    return `color?mode=oklab&l=${l!}&a=${a!}&b=${b!}`;
  } else if (mode === "oklch" && l !== null && c !== null && h !== null) {
    return `color?mode=oklch&l=${l!}&c=${c!}&h=${h!}`;
  } else {
    return "color";
  }
};

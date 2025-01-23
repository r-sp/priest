import type { AnyColorMode } from "./types";

export const getGamut = (
  color: string | AnyColorMode,
): string | AnyColorMode => {
  if (typeof color === "string") {
    return color;
  }

  if (color.mode === "rgb") {
    return {
      mode: "rgb",
      r: color.r / 255,
      g: color.g / 255,
      b: color.b / 255,
    };
  } else if (color.mode === "hsl") {
    return {
      mode: "hsl",
      h: color.h,
      s: color.s / 100,
      l: color.l / 100,
    };
  } else if (color.mode === "hwb") {
    return {
      mode: "hwb",
      h: color.h,
      w: color.w / 100,
      b: color.b / 100,
    };
  } else {
    return color;
  }
};

export const setGamut = (color: AnyColorMode): AnyColorMode => {
  if (color.mode === "rgb") {
    return {
      mode: "rgb",
      r: color.r * 255,
      g: color.g * 255,
      b: color.b * 255,
    };
  } else if (color.mode === "hsl") {
    return {
      mode: "hsl",
      h: color.h,
      s: color.s * 100,
      l: color.l * 100,
    };
  } else if (color.mode === "hwb") {
    return {
      mode: "hwb",
      h: color.h,
      w: color.w * 100,
      b: color.b * 100,
    };
  } else {
    return color;
  }
};

export const checkGamut = (color: AnyColorMode): string | null => {
  const reports: string[] = [];

  const revalidate = (
    label: string,
    value: number,
    min: number,
    max: number,
  ): string | null => {
    if (value < min) {
      return `${label}-under-${min}`;
    } else if (value > max) {
      return `${label}-above-${max}`;
    } else {
      return null;
    }
  };

  const check = (label: string, value: number, min: number, max: number) => {
    const invalid = revalidate(label, value, min, max);
    if (invalid) reports.push(invalid);
  };

  switch (color.mode) {
    case "rgb": {
      check("red", color.r, 0, 255);
      check("green", color.g, 0, 255);
      check("blue", color.b, 0, 255);
      break;
    }
    case "hsl": {
      check("hue", color.h!, 0, 360);
      check("saturation", color.s, 0, 100);
      check("lightness", color.l, 0, 100);
      break;
    }
    case "hwb": {
      check("hue", color.h!, 0, 360);
      check("whiteness", color.w, 0, 100);
      check("blackness", color.b, 0, 100);
      break;
    }
    case "lab": {
      check("lightness", color.l, 0, 100);
      check("green-red", color.a, -100, 100);
      check("blue-yellow", color.b, -100, 100);
      break;
    }
    case "lch": {
      check("lightness", color.l, 0, 100);
      check("chroma", color.c, 0, 150);
      check("hue", color.h!, 0, 360);
      break;
    }
    case "oklab": {
      check("lightness", color.l, 0, 1);
      check("green-red", color.a, -0.4, 0.4);
      check("blue-yellow", color.b, -0.4, 0.4);
      break;
    }
    case "oklch": {
      check("lightness", color.l, 0, 1);
      check("chroma", color.c, 0, 0.4);
      check("hue", color.h!, 0, 360);
      break;
    }
  }

  if (reports.length < 0) {
    return null;
  } else {
    return reports.join("-and-");
  }
};

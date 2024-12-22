import type { AnyColorMode, ColorFormat, ColorSpace } from "~/lib/color";
import { useQueryStates, parseAsString, parseAsFloat } from "nuqs";
import {
  formatRgb,
  formatHsl,
  formatHwb,
  formatLab,
  formatLch,
  formatOklab,
  formatOklch,
} from "~/lib/format";

export function useColorQuery(): { color: AnyColorMode; css: string } | null {
  const [rgb] = useQueryStates({
    mode: parseAsString.withDefault("rgb"),
    r: parseAsFloat,
    g: parseAsFloat,
    b: parseAsFloat,
  });

  const [hsl] = useQueryStates({
    mode: parseAsString.withDefault("hsl"),
    h: parseAsFloat,
    s: parseAsFloat,
    l: parseAsFloat,
  });

  const [hwb] = useQueryStates({
    mode: parseAsString.withDefault("hwb"),
    h: parseAsFloat,
    w: parseAsFloat,
    b: parseAsFloat,
  });

  const [lab] = useQueryStates({
    mode: parseAsString.withDefault("lab"),
    l: parseAsFloat,
    a: parseAsFloat,
    b: parseAsFloat,
  });

  const [lch] = useQueryStates({
    mode: parseAsString.withDefault("lch"),
    l: parseAsFloat,
    c: parseAsFloat,
    h: parseAsFloat,
  });

  const [oklab] = useQueryStates({
    mode: parseAsString.withDefault("oklab"),
    l: parseAsFloat,
    a: parseAsFloat,
    b: parseAsFloat,
  });

  const [oklch] = useQueryStates({
    mode: parseAsString.withDefault("oklch"),
    l: parseAsFloat,
    c: parseAsFloat,
    h: parseAsFloat,
  });

  if (
    rgb.mode === "rgb" &&
    rgb.r !== null &&
    rgb.g !== null &&
    rgb.b !== null
  ) {
    const color = { r: rgb.r, g: rgb.g, b: rgb.b };
    return {
      color: { mode: "rgb", ...color },
      css: formatRgb(color),
    };
  } else if (
    hsl.mode === "hsl" &&
    hsl.h !== null &&
    hsl.s !== null &&
    hsl.l !== null
  ) {
    const color = { h: hsl.h, s: hsl.s, l: hsl.l };
    return {
      color: { mode: "hsl", ...color },
      css: formatHsl(color),
    };
  } else if (
    hwb.mode === "hwb" &&
    hwb.h !== null &&
    hwb.w !== null &&
    hwb.b !== null
  ) {
    const color = { h: hwb.h, w: hwb.w, b: hwb.b };
    return {
      color: { mode: "hwb", ...color },
      css: formatHwb(color),
    };
  } else if (
    lab.mode === "lab" &&
    lab.l !== null &&
    lab.a !== null &&
    lab.b !== null
  ) {
    const color = { l: lab.l, a: lab.a, b: lab.b };
    return {
      color: { mode: "lab", ...color },
      css: formatLab(color),
    };
  } else if (
    lch.mode === "lch" &&
    lch.l !== null &&
    lch.c !== null &&
    lch.h !== null
  ) {
    const color = { l: lch.l, c: lch.c, h: lch.h };
    return {
      color: { mode: "lch", ...color },
      css: formatLch(color),
    };
  } else if (
    oklab.mode === "oklab" &&
    oklab.l !== null &&
    oklab.a !== null &&
    oklab.b !== null
  ) {
    const color = { l: oklab.l, a: oklab.a, b: oklab.b };
    return {
      color: { mode: "oklab", ...color },
      css: formatOklab(color),
    };
  } else if (
    oklch.mode === "oklch" &&
    oklch.l !== null &&
    oklch.c !== null &&
    oklch.h !== null
  ) {
    const color = { l: oklch.l, c: oklch.c, h: oklch.h };
    return {
      color: { mode: "oklch", ...color },
      css: formatOklch(color),
    };
  } else {
    return null;
  }
}

export type ColorQuery = {
  mode: ColorFormat;
  r?: number;
  g?: number;
  b?: number;
  h?: number;
  s?: number;
  l?: number;
  w?: number;
  a?: number;
  c?: number;
};

export const parseColorQuery = (color: ColorQuery): ColorSpace => {
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

export const parseColorPath = (color: ColorQuery): string => {
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

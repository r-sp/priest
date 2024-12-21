import { type AnyColorMode } from "~/lib/color";
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

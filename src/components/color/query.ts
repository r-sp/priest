import { type AnyColor } from "~/lib/color";
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

export function useColorQuery(): { color: AnyColor; css: string } | null {
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
    const _rgb = { r: rgb.r, g: rgb.g, b: rgb.b };
    return {
      color: _rgb,
      css: formatRgb(_rgb),
    };
  } else if (
    hsl.mode === "hsl" &&
    hsl.h !== null &&
    hsl.s !== null &&
    hsl.l !== null
  ) {
    const _hsl = { h: hsl.h, s: hsl.s, l: hsl.l };
    return {
      color: _hsl,
      css: formatHsl(_hsl),
    };
  } else if (
    hwb.mode === "hwb" &&
    hwb.h !== null &&
    hwb.w !== null &&
    hwb.b !== null
  ) {
    const _hwb = { h: hwb.h, w: hwb.w, b: hwb.b };
    return {
      color: _hwb,
      css: formatHwb(_hwb),
    };
  } else if (
    lab.mode === "lab" &&
    lab.l !== null &&
    lab.a !== null &&
    lab.b !== null
  ) {
    const _lab = { l: lab.l, a: lab.a, b: lab.b };
    return {
      color: _lab,
      css: formatLab(_lab),
    };
  } else if (
    lch.mode === "lch" &&
    lch.l !== null &&
    lch.c !== null &&
    lch.h !== null
  ) {
    const _lch = { l: lch.l, c: lch.c, h: lch.h };
    return {
      color: _lch,
      css: formatLch(_lch),
    };
  } else if (
    oklab.mode === "oklab" &&
    oklab.l !== null &&
    oklab.a !== null &&
    oklab.b !== null
  ) {
    const _oklab = { l: oklab.l, a: oklab.a, b: oklab.b };
    return {
      color: _oklab,
      css: formatOklab(_oklab),
    };
  } else if (
    oklch.mode === "oklch" &&
    oklch.l !== null &&
    oklch.c !== null &&
    oklch.h !== null
  ) {
    const _oklch = { l: oklch.l, c: oklch.c, h: oklch.h };
    return {
      color: _oklch,
      css: formatOklch(_oklch),
    };
  } else {
    return null;
  }
}

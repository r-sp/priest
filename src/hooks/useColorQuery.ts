import { type AnyColorMode } from "~/lib/types";
import { useQueryStates, parseAsString, parseAsFloat } from "nuqs";

export default function useColorQuery(): AnyColorMode | null {
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
    const { r, g, b } = rgb;
    return { mode: "rgb", r, g, b };
  } else if (
    hsl.mode === "hsl" &&
    hsl.h !== null &&
    hsl.s !== null &&
    hsl.l !== null
  ) {
    const { h, s, l } = hsl;
    return { mode: "hsl", h, s, l };
  } else if (
    hwb.mode === "hwb" &&
    hwb.h !== null &&
    hwb.w !== null &&
    hwb.b !== null
  ) {
    const { h, w, b } = hwb;
    return { mode: "hwb", h, w, b };
  } else if (
    lab.mode === "lab" &&
    lab.l !== null &&
    lab.a !== null &&
    lab.b !== null
  ) {
    const { l, a, b } = lab;
    return { mode: "lab", l, a, b };
  } else if (
    lch.mode === "lch" &&
    lch.l !== null &&
    lch.c !== null &&
    lch.h !== null
  ) {
    const { l, c, h } = lch;
    return { mode: "lch", l, c, h };
  } else if (
    oklab.mode === "oklab" &&
    oklab.l !== null &&
    oklab.a !== null &&
    oklab.b !== null
  ) {
    const { l, a, b } = oklab;
    return { mode: "oklab", l, a, b };
  } else if (
    oklch.mode === "oklch" &&
    oklch.l !== null &&
    oklch.c !== null &&
    oklch.h !== null
  ) {
    const { l, c, h } = oklch;
    return { mode: "oklch", l, c, h };
  } else {
    return null;
  }
}

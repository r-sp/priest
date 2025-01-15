import type { ColorQuery, AnyColorMode } from "./types";

export const getColorQuery = (query: ColorQuery): AnyColorMode | undefined => {
  const { mode, r, g, b, h, s, l, w, a, c } = query;

  if (mode === "rgb" && r !== undefined && g !== undefined && b !== undefined) {
    return { mode, r, g, b };
  } else if (
    mode === "hsl" &&
    h !== undefined &&
    s !== undefined &&
    l !== undefined
  ) {
    return { mode, h, s, l };
  } else if (
    mode === "hwb" &&
    h !== undefined &&
    w !== undefined &&
    b !== undefined
  ) {
    return { mode, h, w, b };
  } else if (
    mode === "lab" &&
    l !== undefined &&
    a !== undefined &&
    b !== undefined
  ) {
    return { mode, l, a, b };
  } else if (
    mode === "lch" &&
    l !== undefined &&
    c !== undefined &&
    h !== undefined
  ) {
    return { mode, l, c, h };
  } else if (
    mode === "oklab" &&
    l !== undefined &&
    a !== undefined &&
    b !== undefined
  ) {
    return { mode, l, a, b };
  } else if (
    mode === "oklch" &&
    l !== undefined &&
    c !== undefined &&
    h !== undefined
  ) {
    return { mode, l, c, h };
  } else {
    return undefined;
  }
};

export const getColorPath = (path: string, query: ColorQuery): string => {
  const { mode, r, g, b, h, s, l, w, a, c } = query;
  const searchParams = new URLSearchParams([]);

  if (mode === "rgb" && r !== undefined && g !== undefined && b !== undefined) {
    searchParams.set("mode", mode);
    searchParams.set("r", `${r}`);
    searchParams.set("g", `${g}`);
    searchParams.set("b", `${b}`);
  } else if (
    mode === "hsl" &&
    h !== undefined &&
    s !== undefined &&
    l !== undefined
  ) {
    searchParams.set("mode", mode);
    searchParams.set("h", `${h}`);
    searchParams.set("s", `${s}`);
    searchParams.set("l", `${l}`);
  } else if (
    mode === "hwb" &&
    h !== undefined &&
    w !== undefined &&
    b !== undefined
  ) {
    searchParams.set("mode", mode);
    searchParams.set("h", `${h}`);
    searchParams.set("w", `${w}`);
    searchParams.set("b", `${b}`);
  } else if (
    mode === "lab" &&
    l !== undefined &&
    a !== undefined &&
    b !== undefined
  ) {
    searchParams.set("mode", mode);
    searchParams.set("l", `${l}`);
    searchParams.set("a", `${a}`);
    searchParams.set("b", `${b}`);
  } else if (
    mode === "lch" &&
    l !== undefined &&
    c !== undefined &&
    h !== undefined
  ) {
    searchParams.set("mode", mode);
    searchParams.set("l", `${l}`);
    searchParams.set("c", `${c}`);
    searchParams.set("h", `${h}`);
  } else if (
    mode === "oklab" &&
    l !== undefined &&
    a !== undefined &&
    b !== undefined
  ) {
    searchParams.set("mode", mode);
    searchParams.set("l", `${l}`);
    searchParams.set("a", `${a}`);
    searchParams.set("b", `${b}`);
  } else if (
    mode === "oklch" &&
    l !== undefined &&
    c !== undefined &&
    h !== undefined
  ) {
    searchParams.set("mode", mode);
    searchParams.set("l", `${l}`);
    searchParams.set("c", `${c}`);
    searchParams.set("h", `${h}`);
  } else {
    searchParams.set("error", "unknown-color-params");
  }

  return `${path}?${searchParams.toString()}`;
};

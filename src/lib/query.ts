import type { ColorQuery, AnyColorMode } from "./color";

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
  }
  if (mode === "hsl" && h !== undefined && s !== undefined && l !== undefined) {
    searchParams.set("mode", mode);
    searchParams.set("h", `${h}`);
    searchParams.set("s", `${s}`);
    searchParams.set("l", `${l}`);
  }
  if (mode === "hwb" && h !== undefined && w !== undefined && b !== undefined) {
    searchParams.set("mode", mode);
    searchParams.set("h", `${h}`);
    searchParams.set("w", `${w}`);
    searchParams.set("b", `${b}`);
  }
  if (mode === "lab" && l !== undefined && a !== undefined && b !== undefined) {
    searchParams.set("mode", mode);
    searchParams.set("l", `${l}`);
    searchParams.set("a", `${a}`);
    searchParams.set("b", `${b}`);
  }
  if (mode === "lch" && l !== undefined && c !== undefined && h !== undefined) {
    searchParams.set("mode", mode);
    searchParams.set("l", `${l}`);
    searchParams.set("c", `${c}`);
    searchParams.set("h", `${h}`);
  }
  if (
    mode === "oklab" &&
    l !== undefined &&
    a !== undefined &&
    b !== undefined
  ) {
    searchParams.set("mode", mode);
    searchParams.set("l", `${l}`);
    searchParams.set("a", `${a}`);
    searchParams.set("b", `${b}`);
  }
  if (
    mode === "oklch" &&
    l !== undefined &&
    c !== undefined &&
    h !== undefined
  ) {
    searchParams.set("mode", mode);
    searchParams.set("l", `${l}`);
    searchParams.set("c", `${c}`);
    searchParams.set("h", `${h}`);
  }

  return `${path}?${searchParams.toString()}`;
};

export const switchColorPath = (path: string, color: AnyColorMode): string => {
  const searchParams = new URLSearchParams([]);
  searchParams.set("mode", color.mode);

  switch (color.mode) {
    case "rgb": {
      const { r, g, b } = color;
      searchParams.set("r", `${r}`);
      searchParams.set("g", `${g}`);
      searchParams.set("b", `${b}`);
      break;
    }
    case "hsl": {
      const { h, s, l } = color;
      searchParams.set("h", `${h}`);
      searchParams.set("s", `${s}`);
      searchParams.set("l", `${l}`);
      break;
    }
    case "hwb": {
      const { h, w, b } = color;
      searchParams.set("h", `${h}`);
      searchParams.set("w", `${w}`);
      searchParams.set("b", `${b}`);
      break;
    }
    case "lab":
    case "oklab": {
      const { l, a, b } = color;
      searchParams.set("l", `${l}`);
      searchParams.set("a", `${a}`);
      searchParams.set("b", `${b}`);
      break;
    }
    case "lch":
    case "oklch": {
      const { l, c, h } = color;
      searchParams.set("l", `${l}`);
      searchParams.set("c", `${c}`);
      searchParams.set("h", `${h}`);
      break;
    }
  }

  return `${path}?${searchParams.toString()}`;
};

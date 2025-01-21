import type { AnyColorMode } from "./types";
import {
  formatHex,
  formatRgb,
  formatHsl,
  formatHwb,
  formatLab,
  formatLch,
  formatOklab,
  formatOklch,
} from "./format";

export const switchPath = (path: string, color: AnyColorMode): string => {
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

export const switchCss = (color: AnyColorMode, hex?: boolean): string => {
  switch (color.mode) {
    case "rgb": {
      if (hex) return formatHex(color);
      const { r, g, b } = color;
      return formatRgb({ r, g, b });
      break;
    }
    case "hsl": {
      const { h, s, l } = color;
      return formatHsl({ h, s, l });
      break;
    }
    case "hwb": {
      const { h, w, b } = color;
      return formatHwb({ h, w, b });
      break;
    }
    case "lab": {
      const { l, a, b } = color;
      return formatLab({ l, a, b });
      break;
    }
    case "lch": {
      const { l, c, h } = color;
      return formatLch({ l, c, h });
    }
    case "oklab": {
      const { l, a, b } = color;
      return formatOklab({ l, a, b });
      break;
    }
    case "oklch": {
      const { l, c, h } = color;
      return formatOklch({ l, c, h });
    }
  }
};

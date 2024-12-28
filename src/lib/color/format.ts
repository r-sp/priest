import type {
  RgbColor,
  HslColor,
  HwbColor,
  LabColor,
  LchColor,
  OklabColor,
  OklchColor,
  AnyColorMode,
  ColorFormat,
  ColorSpace,
} from "../types";
import { round } from "../utils";

export function formatHex(color: RgbColor): string {
  const { r, g, b } = color;

  const clamp = (value: number) => Math.max(0, Math.min(1, value || 0));
  const fixup = (value: number) => Math.round(clamp(value) * 255);

  const red = fixup(r);
  const green = fixup(g);
  const blue = fixup(b);

  return (
    "#" + ((1 << 24) | (red << 16) | (green << 8) | blue).toString(16).slice(1)
  );
}

export function formatRgb(color: RgbColor): string {
  const { r, g, b } = color;
  const red = round(r * 255);
  const green = round(g * 255);
  const blue = round(b * 255);

  return `rgb(${red} ${green} ${blue})`;
}

export function formatHsl(color: HslColor): string {
  const { h, s, l } = color;
  const hue = round(h || 0, 2);
  const saturation = round(s * 100, 2);
  const lightness = round(l * 100, 2);

  return `hsl(${hue} ${saturation}% ${lightness}%)`;
}

export function formatHwb(color: HwbColor): string {
  const { h, w, b } = color;
  const hue = round(h || 0, 2);
  const whiteness = round(w * 100, 2);
  const blackness = round(b * 100, 2);

  return `hwb(${hue} ${whiteness}% ${blackness}%)`;
}

export function formatLab(color: LabColor): string {
  const { l, a, b } = color;
  const lightness = round(l, 3);
  const greenRed = round(a, 3);
  const blueYellow = round(b, 3);

  return `lab(${lightness} ${greenRed} ${blueYellow})`;
}

export function formatLch(color: LchColor): string {
  const { l, c, h } = color;
  const lightness = round(l, 3);
  const chroma = round(c, 3);
  const hue = round(h || 0, 3);

  return `lch(${lightness} ${chroma} ${hue})`;
}

export function formatOklab(color: OklabColor): string {
  const { l, a, b } = color;
  const lightness = round(l, 3);
  const greenRed = round(a, 3);
  const blueYellow = round(b, 3);

  return `oklab(${lightness} ${greenRed} ${blueYellow})`;
}

export function formatOklch(color: OklchColor): string {
  const { l, c, h } = color;
  const lightness = round(l, 3);
  const chroma = round(c, 3);
  const hue = round(h || 0, 3);

  return `oklch(${lightness} ${chroma} ${hue})`;
}

export function formatPathMode(color: AnyColorMode): string {
  switch (color.mode) {
    case "rgb": {
      const { r, g, b } = color;
      return `/color?mode=rgb&r=${r}&g=${g}&b=${b}`;
      break;
    }
    case "hsl": {
      const { h, s, l } = color;
      return `/color?mode=hsl&h=${h}&s=${s}&l=${l}`;
      break;
    }
    case "hwb": {
      const { h, w, b } = color;
      return `/color?mode=hwb&h=${h}&w=${w}&b=${b}`;
      break;
    }
    case "lab": {
      const { l, a, b } = color;
      return `/color?mode=lab&l=${l}&a=${a}&b=${b}`;
      break;
    }
    case "lch": {
      const { l, c, h } = color;
      return `/color?mode=lch&l=${l}&c=${c}&h=${h}`;
      break;
    }
    case "oklab": {
      const { l, a, b } = color;
      return `/color?mode=oklab&l=${l}&a=${a}&b=${b}`;
      break;
    }
    case "oklch": {
      const { l, c, h } = color;
      return `/color?mode=oklch&l=${l}&c=${c}&h=${h}`;
      break;
    }
  }
}

export function formatColorMode(
  type: ColorFormat,
  color: ColorSpace,
): AnyColorMode {
  switch (type) {
    case "rgb": {
      return { mode: type, ...color.rgb };
      break;
    }
    case "hsl": {
      return { mode: type, ...color.hsl };
      break;
    }
    case "hwb": {
      return { mode: type, ...color.hwb };
      break;
    }
    case "lab": {
      return { mode: type, ...color.lab };
      break;
    }
    case "lch": {
      return { mode: type, ...color.lch };
      break;
    }
    case "oklab": {
      return { mode: type, ...color.oklab };
      break;
    }
    case "oklch": {
      return { mode: type, ...color.oklch };
    }
  }
}

export function formatCssMode(type: ColorFormat, color: ColorSpace): string {
  switch (type) {
    case "rgb": {
      return formatRgb(color.rgb);
      break;
    }
    case "hsl": {
      return formatHsl(color.hsl);
      break;
    }
    case "hwb": {
      return formatHwb(color.hwb);
      break;
    }
    case "lab": {
      return formatLab(color.lab);
      break;
    }
    case "lch": {
      return formatLch(color.lch);
      break;
    }
    case "oklab": {
      return formatOklab(color.oklab);
      break;
    }
    case "oklch": {
      return formatOklch(color.oklch);
    }
  }
}

import type { ColorSpace, ColorFormat, AnyColor, AnyColorMode } from "./types";
import type { ColorState } from "~/context/store";
import {
  formatRgb,
  formatHsl,
  formatHwb,
  formatLab,
  formatLch,
  formatOklab,
  formatOklch,
} from "./format";

export const switchColor = (mode: ColorFormat, color: ColorState): AnyColor => {
  const { rgb, hsl, hwb, lab, lch, oklab, oklch } = color;

  switch (mode) {
    case "rgb": {
      return rgb.color;
      break;
    }
    case "hsl": {
      return hsl.color;
      break;
    }
    case "hwb": {
      return hwb.color;
      break;
    }
    case "lab": {
      return lab.color;
      break;
    }
    case "lch": {
      return lch.color;
      break;
    }
    case "oklab": {
      return oklab.color;
      break;
    }
    case "oklch": {
      return oklch.color;
      break;
    }
  }
};

export const switchCss = (mode: ColorFormat, color: ColorState): string => {
  const { rgb, hsl, hwb, lab, lch, oklab, oklch } = color;

  switch (mode) {
    case "rgb": {
      return rgb.css;
      break;
    }
    case "hsl": {
      return hsl.css;
      break;
    }
    case "hwb": {
      return hwb.css;
      break;
    }
    case "lab": {
      return lab.css;
      break;
    }
    case "lch": {
      return lch.css;
      break;
    }
    case "oklab": {
      return oklab.css;
      break;
    }
    case "oklch": {
      return oklch.css;
      break;
    }
  }
};

export const switchColorMode = (
  type: ColorFormat,
  color: ColorSpace,
): AnyColorMode => {
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
      break;
    }
  }
};

export const switchCssMode = (type: ColorFormat, color: ColorSpace): string => {
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
      break;
    }
  }
};

export const switchPathMode = (color: AnyColorMode): string => {
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
};

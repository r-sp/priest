import type { ColorFormat, AnyColorMode } from "./color";
import {
  formatRgb,
  formatHsl,
  formatHwb,
  formatLab,
  formatLch,
  formatOklab,
  formatOklch,
} from "./color";

const tracks = (shades: string[]): string => shades.join(", ");

type FormatTracks = {
  [Key in ColorFormat]: (
    color: Extract<AnyColorMode, { mode: Key }>,
    dynamic: boolean,
  ) => [string, string, string];
};

export const formatTracks: FormatTracks = {
  rgb: (color, dynamic) => {
    const compose = (track: Partial<typeof color>): string => {
      return formatRgb({ ...color, ...track });
    };
    const preview = (
      track: Partial<typeof color>,
      shade: Partial<typeof color>,
    ): string => {
      return formatRgb(
        dynamic ? { ...color, ...track } : { ...color, ...shade },
      );
    };
    const red = tracks([
      compose({ r: 0 }),
      preview({ r: 255 }, { r: 255, g: 0, b: 0 }),
    ]);
    const green = tracks([
      compose({ g: 0 }),
      preview({ g: 255 }, { r: 0, g: 255, b: 0 }),
    ]);
    const blue = tracks([
      compose({ b: 0 }),
      preview({ b: 255 }, { r: 0, g: 0, b: 255 }),
    ]);
    return [red, green, blue];
  },
  hsl: (color, dynamic) => {
    const compose = (track: Partial<typeof color>): string => {
      return formatHsl({ ...color, ...track });
    };
    const preview = (
      track: Partial<typeof color>,
      shade: Partial<typeof color>,
    ): string => {
      return formatHsl(
        dynamic ? { ...color, ...track } : { ...color, ...shade },
      );
    };
    const angle = (hue: number, deg: number): string => {
      return (
        [preview({ h: hue }, { h: hue, s: 100, l: 50 }), deg].join(" ") + "%"
      );
    };
    const hue = tracks([
      angle(0, 0),
      angle(60, 17),
      angle(120, 33),
      angle(180, 50),
      angle(240, 67),
      angle(300, 83),
      angle(0, 100),
    ]);
    const saturation = tracks([
      preview({ s: 0 }, { s: 0, l: 50 }),
      preview({ s: 100 }, { s: 100, l: 50 }),
    ]);
    const lightness = tracks([
      "hsl(0 0% 0%)",
      compose({ s: 100, l: 50 }),
      "hsl(0 0% 100%)",
    ]);
    return [hue, saturation, lightness];
  },
  hwb: (color, dynamic) => {
    const preview = (
      track: Partial<typeof color>,
      shade: Partial<typeof color>,
    ): string => {
      return formatHwb(
        dynamic ? { ...color, ...track } : { ...color, ...shade },
      );
    };
    const angle = (hue: number, deg: number): string => {
      return [preview({ h: hue }, { h: hue, w: 0, b: 0 }), deg].join(" ") + "%";
    };
    const hue = tracks([
      angle(0, 0),
      angle(60, 17),
      angle(120, 33),
      angle(180, 50),
      angle(240, 67),
      angle(300, 83),
      angle(0, 100),
    ]);
    const whiteness = tracks([
      preview({ w: 0 }, { w: 0, b: 50 }),
      preview({ w: 100 }, { w: 100, b: 0 }),
    ]);
    const blackness = tracks([
      preview({ b: 0 }, { w: 0, b: 0 }),
      preview({ b: 100 }, { w: 0, b: 100 }),
    ]);
    return [hue, whiteness, blackness];
  },
  lab: (color, dynamic) => {
    const compose = (track: Partial<typeof color>): string => {
      return formatLab({ ...color, ...track });
    };
    const preview = (
      track: Partial<typeof color>,
      shade: Partial<typeof color>,
    ): string => {
      return formatLab(
        dynamic ? { ...color, ...track } : { ...color, ...shade },
      );
    };
    const lightness = tracks([compose({ l: 100 }), compose({ l: 0 })]);
    const greenRed = tracks([
      preview({ a: -100 }, { a: -100, b: 50 }),
      preview({ a: 100 }, { a: 100, b: 50 }),
    ]);
    const blueYellow = tracks([
      preview({ b: -100 }, { a: 0, b: -100 }),
      preview({ b: 100 }, { a: 0, b: 100 }),
    ]);
    return [lightness, greenRed, blueYellow];
  },
  lch: (color, dynamic) => {
    const preview = (
      track: Partial<typeof color>,
      shade: Partial<typeof color>,
    ): string => {
      return formatLch(
        dynamic ? { ...color, ...track } : { ...color, ...shade },
      );
    };
    const angle = (hue: number): string => {
      return preview({ h: hue }, { l: 67, c: 106.45, h: hue });
    };
    const lightness = tracks([
      preview({ l: 0 }, { l: 0, c: 73.06 }),
      preview({ l: 100 }, { l: 100, c: 73.06 }),
    ]);
    const chroma = tracks([
      preview({ c: 0 }, { l: 90, c: 0 }),
      preview({ c: 150 }, { l: 90, c: 150 }),
    ]);
    const hue = tracks([
      angle(0),
      angle(60),
      angle(120),
      angle(180),
      angle(240),
      angle(300),
      angle(360),
    ]);
    return [lightness, chroma, hue];
  },
  oklab: (color, dynamic) => {
    const compose = (track: Partial<typeof color>): string => {
      return formatOklab({ ...color, ...track });
    };
    const preview = (
      track: Partial<typeof color>,
      shade: Partial<typeof color>,
    ): string => {
      return formatOklab(
        dynamic ? { ...color, ...track } : { ...color, ...shade },
      );
    };
    const lightness = tracks([compose({ l: 0 }), compose({ l: 1 })]);
    const greenRed = tracks([
      preview({ a: -0.4 }, { a: -0.4, b: 0.4 }),
      preview({ a: 0.4 }, { a: 0.4, b: 0.4 }),
    ]);
    const blueYellow = tracks([
      preview({ b: -0.4 }, { a: 0, b: -0.4 }),
      preview({ b: 0.4 }, { a: 0, b: 0.4 }),
    ]);
    return [lightness, greenRed, blueYellow];
  },
  oklch: (color, dynamic) => {
    const preview = (
      track: Partial<typeof color>,
      shade: Partial<typeof color>,
    ): string => {
      return formatOklch(
        dynamic ? { ...color, ...track } : { ...color, ...shade },
      );
    };
    const angle = (hue: number): string => {
      return preview({ h: hue }, { l: 0.75, c: 0.333, h: hue });
    };
    const lightness = tracks([
      preview({ l: 0 }, { l: 0, c: 0.235 }),
      preview({ l: 1 }, { l: 1, c: 0.235 }),
    ]);
    const chroma = tracks([
      preview({ c: 0 }, { l: 0.875, c: 0 }),
      preview({ c: 0.4 }, { l: 0.875, c: 0.4 }),
    ]);
    const hue = tracks([
      angle(0),
      angle(60),
      angle(120),
      angle(180),
      angle(240),
      angle(300),
      angle(360),
    ]);
    return [lightness, chroma, hue];
  },
};

export const trackMode = <T extends ColorFormat>(
  mode: T,
): ((
  color: Extract<AnyColorMode, { mode: T }>,
  dynamic: boolean,
) => [string, string, string]) => {
  return formatTracks[mode];
};

export const createTracks = (
  color: AnyColorMode,
  dynamic: boolean,
): [string, string, string] => {
  const compose = trackMode(color.mode);
  return compose(color, dynamic);
};

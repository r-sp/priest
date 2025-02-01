import type {
  AnyColorMode,
  ColorFormat,
  ColorLabel,
  ExtractColor,
  ExtractColorMode,
} from "~/types/color";
import {
  formatRgb,
  formatHsl,
  formatHwb,
  formatLab,
  formatLch,
  formatOklab,
  formatOklch,
} from "./format";

const tracks = (shades: string[]): string => shades.join(", ");

const formatTracks: {
  [Key in ColorFormat]: (
    color: ExtractColorMode<Key>,
    dynamic: boolean,
  ) => [string, string, string];
} = {
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
    const lightness = tracks([compose({ l: 0 }), compose({ l: 100 })]);
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

const trackMode = <T extends ColorFormat>(
  mode: T,
): ((
  color: ExtractColorMode<T>,
  dynamic: boolean,
) => [string, string, string]) => {
  return formatTracks[mode];
};

const createTracks = (
  color: AnyColorMode,
  dynamic: boolean,
): [string, string, string] => {
  const compose = trackMode(color.mode);
  return compose(color, dynamic);
};

type TrackRange = {
  label: ColorLabel;
  min: number;
  max: number;
  base: number;
  decimal?: number;
};

type TrackUpdate<T extends ColorFormat> = {
  update: (
    value: number,
    color: ExtractColorMode<T>,
    store: (key: ExtractColorMode<T>) => void,
  ) => void;
};

type TrackFormat<T extends ColorFormat> = TrackRange & TrackUpdate<T>;

const formatRange: {
  [Key in ColorFormat]: {
    [Value in keyof ExtractColor<Key>]: TrackFormat<Key>;
  };
} = {
  rgb: {
    r: {
      label: "red",
      min: 0,
      max: 255,
      base: 1,
      update: (value, color, store) => store({ ...color, r: value }),
    },
    g: {
      label: "green",
      min: 0,
      max: 255,
      base: 1,
      update: (value, color, store) => store({ ...color, g: value }),
    },
    b: {
      label: "blue",
      min: 0,
      max: 255,
      base: 1,
      update: (value, color, store) => store({ ...color, b: value }),
    },
  },
  hsl: {
    h: {
      label: "hue",
      min: 0,
      max: 360,
      base: 1,
      decimal: 0.01,
      update: (value, color, store) => store({ ...color, h: value }),
    },
    s: {
      label: "saturation",
      min: 0,
      max: 100,
      base: 1,
      decimal: 0.01,
      update: (value, color, store) => store({ ...color, s: value }),
    },
    l: {
      label: "lightness",
      min: 0,
      max: 100,
      base: 1,
      decimal: 0.01,
      update: (value, color, store) => store({ ...color, l: value }),
    },
  },
  hwb: {
    h: {
      label: "hue",
      min: 0,
      max: 360,
      base: 1,
      decimal: 0.01,
      update: (value, color, store) => store({ ...color, h: value }),
    },
    w: {
      label: "whiteness",
      min: 0,
      max: 100,
      base: 1,
      decimal: 0.01,
      update: (value, color, store) => store({ ...color, w: value }),
    },
    b: {
      label: "blackness",
      min: 0,
      max: 100,
      base: 1,
      decimal: 0.01,
      update: (value, color, store) => store({ ...color, b: value }),
    },
  },
  lab: {
    l: {
      label: "lightness",
      min: 0,
      max: 100,
      base: 1,
      decimal: 0.01,
      update: (value, color, store) => store({ ...color, l: value }),
    },
    a: {
      label: "green-red",
      min: -100,
      max: 100,
      base: 1,
      decimal: 0.01,
      update: (value, color, store) => store({ ...color, a: value }),
    },
    b: {
      label: "blue-yellow",
      min: -100,
      max: 100,
      base: 1,
      decimal: 0.01,
      update: (value, color, store) => store({ ...color, b: value }),
    },
  },
  lch: {
    l: {
      label: "lightness",
      min: 0,
      max: 100,
      base: 1,
      decimal: 0.01,
      update: (value, color, store) => store({ ...color, l: value }),
    },
    c: {
      label: "chroma",
      min: 0,
      max: 150,
      base: 1,
      decimal: 0.01,
      update: (value, color, store) => store({ ...color, c: value }),
    },
    h: {
      label: "hue",
      min: 0,
      max: 360,
      base: 1,
      decimal: 0.001,
      update: (value, color, store) => store({ ...color, h: value }),
    },
  },
  oklab: {
    l: {
      label: "lightness",
      min: 0,
      max: 1,
      base: 0.01,
      decimal: 0.001,
      update: (value, color, store) => store({ ...color, l: value }),
    },
    a: {
      label: "green-red",
      min: -0.4,
      max: 0.4,
      base: 0.01,
      decimal: 0.001,
      update: (value, color, store) => store({ ...color, a: value }),
    },
    b: {
      label: "blue-yellow",
      min: -0.4,
      max: 0.4,
      base: 0.01,
      decimal: 0.001,
      update: (value, color, store) => store({ ...color, b: value }),
    },
  },
  oklch: {
    l: {
      label: "lightness",
      min: 0,
      max: 1,
      base: 0.01,
      decimal: 0.001,
      update: (value, color, store) => store({ ...color, l: value }),
    },
    c: {
      label: "chroma",
      min: 0,
      max: 0.4,
      base: 0.01,
      decimal: 0.001,
      update: (value, color, store) => store({ ...color, c: value }),
    },
    h: {
      label: "hue",
      min: 0,
      max: 360,
      base: 1,
      decimal: 0.001,
      update: (value, color, store) => store({ ...color, h: value }),
    },
  },
};

type Range<T extends ColorFormat> = [
  TrackFormat<T>,
  TrackFormat<T>,
  TrackFormat<T>,
];

const createRange = (color: AnyColorMode): Range<typeof color.mode> => {
  const compose = formatRange[color.mode];
  const values = Object.values(compose) as Range<typeof color.mode>;
  return [values[0], values[1], values[2]];
};

export { createTracks, createRange };

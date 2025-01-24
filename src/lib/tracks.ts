import type { AnyColor, AnyColorMode } from "./color";
import { parseCss } from "./color";

export const createTracks = (
  color: AnyColorMode,
  dynamic: boolean,
): [string, string, string] => {
  const compose = (shade: Partial<AnyColor>): string => {
    return parseCss({ ...color, ...shade });
  };

  const preview = (
    track: Partial<AnyColor>,
    disabled: Partial<AnyColor>,
  ): string => {
    return compose(dynamic ? track : disabled);
  };

  const track = (shades: string[]): string => shades.join(", ");

  switch (color.mode) {
    case "rgb": {
      const rgb = (shade: Partial<AnyColor>): string => {
        return preview(shade, { r: 0, g: 0, b: 0, ...shade });
      };
      const red = track([compose({ r: 0 }), rgb({ r: 255 })]);
      const green = track([compose({ g: 0 }), rgb({ g: 255 })]);
      const blue = track([compose({ b: 0 }), rgb({ b: 255 })]);
      return [red, green, blue];
      break;
    }
    case "hsl": {
      const angle = (hue: number, deg: number): string => {
        return (
          [preview({ h: hue }, { h: hue, s: 100, l: 50 }), deg].join(" ") + "%"
        );
      };
      const hue = track([
        angle(0, 0),
        angle(60, 17),
        angle(120, 33),
        angle(180, 50),
        angle(240, 67),
        angle(300, 83),
        angle(0, 100),
      ]);
      const saturation = track([
        preview({ s: 0 }, { s: 0, l: 50 }),
        preview({ s: 100 }, { s: 100, l: 50 }),
      ]);
      const lightness = track([
        "hsl(0 0% 0%)",
        compose({ s: 100, l: 50 }),
        "hsl(0 0% 100%)",
      ]);
      return [hue, saturation, lightness];
      break;
    }
    case "hwb": {
      const angle = (hue: number, deg: number): string => {
        return (
          [preview({ h: hue }, { h: hue, w: 0, b: 0 }), deg].join(" ") + "%"
        );
      };
      const hue = track([
        angle(0, 0),
        angle(60, 17),
        angle(120, 33),
        angle(180, 50),
        angle(240, 67),
        angle(300, 83),
        angle(0, 100),
      ]);
      const whiteness = track([
        preview({ w: 0 }, { w: 0, b: 50 }),
        preview({ w: 100 }, { w: 100, b: 0 }),
      ]);
      const blackness = track([
        preview({ b: 0 }, { w: 0, b: 0 }),
        preview({ b: 100 }, { w: 0, b: 100 }),
      ]);
      return [hue, whiteness, blackness];
      break;
    }
    case "lab": {
      const lightness = track([compose({ l: 0 }), compose({ l: 100 })]);
      const greenRed = track([
        preview({ a: -100 }, { a: -100, b: 50 }),
        preview({ a: 100 }, { a: 100, b: 50 }),
      ]);
      const blueYellow = track([
        preview({ b: -100 }, { a: 0, b: -100 }),
        preview({ b: 100 }, { a: 0, b: 100 }),
      ]);
      return [lightness, greenRed, blueYellow];
      break;
    }
    case "lch": {
      const angle = (hue: number): string => {
        return preview({ h: hue }, { l: 67, c: 106.45, h: hue });
      };
      const lightness = track([
        preview({ l: 0 }, { l: 0, c: 73.06 }),
        preview({ l: 100 }, { l: 100, c: 73.06 }),
      ]);
      const chroma = track([
        preview({ c: 0 }, { l: 90, c: 0 }),
        preview({ c: 150 }, { l: 90, c: 150 }),
      ]);
      const hue = track([
        angle(0),
        angle(60),
        angle(120),
        angle(180),
        angle(240),
        angle(300),
        angle(360),
      ]);
      return [lightness, chroma, hue];
      break;
    }
    case "oklab": {
      const lightness = track([compose({ l: 0 }), compose({ l: 1 })]);
      const greenRed = track([
        preview({ a: -0.4 }, { a: -0.4, b: 0.4 }),
        preview({ a: 0.4 }, { a: 0.4, b: 0.4 }),
      ]);
      const blueYellow = track([
        preview({ b: -0.4 }, { a: 0, b: -0.4 }),
        preview({ b: 0.4 }, { a: 0, b: 0.4 }),
      ]);
      return [lightness, greenRed, blueYellow];
      break;
    }
    case "oklch": {
      const angle = (hue: number): string => {
        return preview({ h: hue }, { l: 0.75, c: 0.333, h: hue });
      };
      const lightness = track([
        preview({ l: 0 }, { l: 0, c: 0.235 }),
        preview({ l: 1 }, { l: 1, c: 0.235 }),
      ]);
      const chroma = track([
        preview({ c: 0 }, { l: 0.875, c: 0 }),
        preview({ c: 0.4 }, { l: 0.875, c: 0.4 }),
      ]);
      const hue = track([
        angle(0),
        angle(60),
        angle(120),
        angle(180),
        angle(240),
        angle(300),
        angle(360),
      ]);
      return [lightness, chroma, hue];
      break;
    }
  }
};

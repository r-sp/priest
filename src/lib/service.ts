import type { Metadata } from "next";
import type { SessionState } from "./types";
import type {
  ColorState,
  ColorMode,
  ColorHue,
  ColorQuery,
  HueColorMode,
} from "./color";
import { getColorQuery, getColorPath } from "./query";
import { currentColor, parseCss } from "./color";

type HueFormat = {
  [Key in ColorMode]: (color: ColorHue) => HueColorMode;
};

const hueFormat: HueFormat = {
  hex: (color) => color[1],
  rgb: (color) => color[2],
  hsl: (color) => color[1],
  hwb: (color) => color[2],
  lab: (color) => color[3],
  lch: (color) => color[3],
  oklab: (color) => color[4],
  oklch: (color) => color[4],
};

const hueMode = (color: ColorHue): HueColorMode => {
  const [mode] = color;
  const compose = hueFormat[mode];
  return compose(color);
};

export const createHue = (color: ColorState, mode: ColorMode): HueColorMode => {
  const { hsl, hwb, lch, oklch } = color;

  return hueMode([
    mode,
    { mode: "hsl", ...hsl.color },
    { mode: "hwb", ...hwb.color },
    { mode: "lch", ...lch.color },
    { mode: "oklch", ...oklch.color },
  ]);
};

export const createService = (): SessionState => {
  const [current, shared] = currentColor();

  const colorHue = createHue(shared, "hex");

  const session: SessionState = {
    theme: undefined,
    color: current,
    mode: "hex",
    shared: shared,
    hue: { color: colorHue, value: colorHue.h!, min: 1, max: 36 },
  };

  return session;
};

export const createColorMetadata = (
  query: ColorQuery & { error?: string },
): Metadata => {
  const includes =
    query.error?.includes("under") || query.error?.includes("above");

  const createMetadata = (valid: string, invalid: string) => {
    return query.error ? (includes ? valid : invalid) : valid;
  };

  const repaint: ColorQuery =
    query.error || query.mode ? query : { mode: "rgb", r: 0, g: 0, b: 0 };

  const color = query.error
    ? includes
      ? parseCss(getColorQuery(repaint)!)
      : "Error"
    : parseCss(getColorQuery(repaint)!);

  const name = createMetadata(`Color: ${color}`, "Error");
  const text = createMetadata(
    `Explore color conversions from ${color} to various color models: RGB, HSL, HWB, LAB, LCH, OKLAB, OKLCH.`,
    "Something",
  );

  const colorParams = getColorPath("/color", query);
  const path = query.error
    ? includes
      ? `${colorParams}&error=${query.error}`
      : `/color?error=${query.error}`
    : colorParams;

  return {
    title: name,
    description: text,
    openGraph: { title: name, url: path },
    alternates: { canonical: path },
  };
};

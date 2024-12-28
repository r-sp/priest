"use client";

import type { ColorFormat, ColorShadeVariant } from "~/lib/types";
import { useMemo, useCallback } from "react";
import { useColor, useMode } from "~/app/store";
import {
  gamutLightness,
  gamutChroma,
  formatOklch,
  formatPathMode,
  formatColorMode,
  parseRgb,
  parseHsl,
  parseHwb,
  parseLab,
  parseLch,
  parseOklab,
  parseOklch,
} from "~/lib/color";
import Link from "next/link";

export default function ColorShade() {
  const [{ oklch }] = useColor();
  const [mode] = useMode();

  const lightness = useCallback(
    (type: ColorShadeVariant) =>
      gamutLightness(type, oklch.color.l, oklch.color.h!),
    [oklch],
  );

  const chroma = useCallback(
    (type: ColorShadeVariant) =>
      gamutChroma(type, oklch.color.c, oklch.color.h!),
    [oklch],
  );

  const hue = oklch.color.h!;

  const shades = useMemo(
    () => [
      formatOklch({
        l: lightness("50"),
        c: chroma("50"),
        h: hue,
      }),
      formatOklch({
        l: lightness("100"),
        c: chroma("100"),
        h: hue,
      }),
      formatOklch({
        l: lightness("200"),
        c: chroma("200"),
        h: hue,
      }),
      formatOklch({
        l: lightness("300"),
        c: chroma("300"),
        h: hue,
      }),
      formatOklch({
        l: lightness("400"),
        c: chroma("400"),
        h: hue,
      }),
      formatOklch({
        l: lightness("500"),
        c: chroma("500"),
        h: hue,
      }),
      formatOklch({
        l: lightness("600"),
        c: chroma("600"),
        h: hue,
      }),
      formatOklch({
        l: lightness("700"),
        c: chroma("700"),
        h: hue,
      }),
      formatOklch({
        l: lightness("800"),
        c: chroma("800"),
        h: hue,
      }),
      formatOklch({
        l: lightness("900"),
        c: chroma("900"),
        h: hue,
      }),
      formatOklch({
        l: lightness("950"),
        c: chroma("950"),
        h: hue,
      }),
    ],
    [lightness, chroma, hue],
  );

  return (
    <ol className="mx-auto grid w-full max-w-5xl gap-y-3">
      {shades.map((shade, index) => (
        <li key={index} className="inline-grid">
          <ColorCard color={shade} type={mode} />
        </li>
      ))}
    </ol>
  );
}

function ColorCard({ type, color }: { type: ColorFormat; color: string }) {
  const rgb = parseRgb(color);
  const hsl = parseHsl(color);
  const hwb = parseHwb(color);
  const lab = parseLab(color);
  const lch = parseLch(color);
  const oklab = parseOklab(color);
  const oklch = parseOklch(color);

  const path = formatPathMode(
    formatColorMode(type, {
      rgb: rgb.color,
      hsl: hsl.color,
      hwb: hwb.color,
      lab: lab.color,
      lch: lch.color,
      oklab: oklab.color,
      oklch: oklch.color,
    }),
  );

  const style =
    type === "rgb"
      ? rgb.css
      : type === "hsl"
        ? hsl.css
        : type === "hwb"
          ? hwb.css
          : type === "lab"
            ? lab.css
            : type === "lch"
              ? lch.css
              : type === "oklab"
                ? oklab.css
                : type === "oklch"
                  ? oklch.css
                  : color;

  return (
    <Link
      href={path}
      className="overflow-hidden rounded-md"
      aria-label={style}
      prefetch={false}
    >
      <span className="block h-16" style={{ backgroundColor: style }}></span>
    </Link>
  );
}

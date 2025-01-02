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

  const lightness = oklch.color.l;
  const chroma = oklch.color.c;
  const hue = oklch.color.h!;

  const color = useCallback(
    (type: ColorShadeVariant) =>
      formatOklch({
        l: gamutLightness(lightness, hue, type),
        c: gamutChroma(chroma, hue, type),
        h: hue,
      }),
    [lightness, chroma, hue],
  );

  const shades = useMemo(
    () => [
      color("50"),
      color("100"),
      color("200"),
      color("300"),
      color("400"),
      color("500"),
      color("600"),
      color("700"),
      color("800"),
      color("900"),
      color("950"),
    ],
    [color],
  );

  return (
    <ol className="mx-auto grid w-full max-w-5xl gap-y-3">
      {shades.map((shade, index) => (
        <ColorCard key={index} color={shade} type={mode} />
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
    <li className="inline-grid" style={{ ["--bg" as string]: style }}>
      <Link
        href={path}
        className="overflow-hidden rounded-md"
        aria-label={style}
        prefetch={false}
      >
        <span
          className="pointer-events-none block h-16"
          style={{ backgroundColor: "var(--bg)" }}
        ></span>
      </Link>
    </li>
  );
}

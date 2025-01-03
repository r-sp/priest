"use client";

import type { ColorFormat, ColorSpace } from "~/lib/types";
import { useMemo, useCallback } from "react";
import { useColor, useMode, useGamut } from "~/app/store";
import { limiter, multiplier } from "~/lib/utils";
import {
  convertRgb,
  convertLab,
  convertOklab,
  formatPathMode,
  formatColorMode,
  formatCssMode,
} from "~/lib/color";

import Link from "next/link";

export default function ColorHue() {
  const [{ hsl, hwb, lch, oklch }] = useColor();
  const [mode] = useMode();
  const [gamut] = useGamut();

  const hueBase = gamut
    ? mode === "lch"
      ? lch.color.h
      : oklch.color.h
    : mode === "hwb"
      ? hwb.color.h
      : hsl.color.h;

  const hueShift = useCallback(
    (angle: number[]) =>
      angle.map((deg) => {
        const colorHsl = { ...hsl.color, h: deg };
        const colorHwb = { ...hwb.color, h: deg };
        const colorLch = { ...lch.color, h: deg };
        const colorOklch = { ...oklch.color, h: deg };

        const rgb = convertRgb({ mode: "hsl", ...colorHsl });
        const colorRgb = { r: rgb.r, g: rgb.g, b: rgb.b };

        const lab = convertLab({ mode: "lch", ...colorLch });
        const colorLab = { l: lab.l, a: lab.a, b: lab.b };

        const oklab = convertOklab({ mode: "oklch", ...colorOklch });
        const colorOklab = { l: oklab.l, a: oklab.a, b: oklab.b };

        return {
          rgb: colorRgb,
          hsl: colorHsl,
          hwb: colorHwb,
          lab: colorLab,
          lch: colorLch,
          oklab: colorOklab,
          oklch: colorOklch,
        };
      }),
    [hsl, hwb, lch, oklch],
  );

  const hueShades = useMemo(
    () =>
      hueShift(
        multiplier(15, 0, 360).map((deg) =>
          limiter(hueBase ? hueBase + deg : deg, 0, 360),
        ),
      ),
    [hueBase, hueShift],
  );

  return (
    <ol className="grid w-full gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {hueShades.map((shade, index) => (
        <ColorCard key={index} color={shade} type={mode} />
      ))}
    </ol>
  );
}

function ColorCard({ type, color }: { type: ColorFormat; color: ColorSpace }) {
  const path = formatPathMode(formatColorMode(type, color));
  const style = formatCssMode(type, color);

  return (
    <li className="inline-gred" style={{ ["--bg" as string]: style }}>
      <Link
        href={path}
        className="rounded-lg"
        aria-label={style}
        prefetch={false}
      >
        <div
          role="presentation"
          className="frame pointer-events-none rounded-lg"
        >
          <span style={{ backgroundColor: "var(--bg)" }}></span>
        </div>
      </Link>
    </li>
  );
}

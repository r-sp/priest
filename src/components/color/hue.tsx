"use client";

import type { ColorFormat, ColorSpace } from "~/lib/color";
import { useMemo, useCallback } from "react";
import { useColorStore } from "~/app/provider";
import { limiter, multiplier } from "~/lib/utils";
import { convertRgb, convertLab, convertOklab } from "~/lib/convert";
import { formatPathMode, formatColorMode, formatCssMode } from "~/lib/format";
import Link from "next/link";

export default function ColorHue() {
  const { hsl, hwb, lch, oklch, gamut, mode } = useColorStore((state) => state);

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
        <li key={index} className="inline-grid">
          <ColorCard color={shade} type={mode} />
        </li>
      ))}
    </ol>
  );
}

function ColorCard({ type, color }: { type: ColorFormat; color: ColorSpace }) {
  const path = formatPathMode(formatColorMode(type, color));
  const style = formatCssMode(type, color);

  return (
    <Link href={path} className="rounded-lg" aria-label={style}>
      <div role="presentation" className="frame rounded-lg">
        <span style={{ backgroundColor: style }}></span>
      </div>
    </Link>
  );
}

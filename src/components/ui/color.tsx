"use client";

import { useMemo, useCallback } from "react";
import { useColorStore } from "~/app/provider";
import { useColorQuery } from "../color/query";
import { limiter, multiplier } from "~/lib/utils";
import { findColor, nearestColor } from "~/lib/web-colors";
import { formatHsl, formatOklch } from "~/lib/format";
import { parseHex } from "~/lib/parse";
import ColorPicker from "../color/picker";
import Wrapper from "./wrapper";
import Link from "next/link";

export default function Color() {
  const { gamut, hsl, oklch } = useColorStore((state) => state);
  const hueBase = gamut ? oklch.color.h : hsl.color.h;

  const hueShift = useCallback(
    (angle: number[]) =>
      angle.map((deg) => {
        const colorHsl = { ...hsl.color, h: deg };
        const colorOklch = { ...oklch.color, h: deg };
        const colorHex = gamut
          ? parseHex({ mode: "oklch", ...colorOklch })
          : parseHex({ mode: "hsl", ...colorHsl });
        return {
          css: gamut ? formatOklch(colorOklch) : formatHsl(colorHsl),
          hex: colorHex,
          slug: findColor(nearestColor(colorHex) || "unknown"),
        };
      }),
    [gamut, hsl, oklch],
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

  const colorQuery = useColorQuery();

  return (
    <Wrapper as="article" className="grid gap-y-8" outerStyle="py-4">
      {colorQuery ? (
        <div
          aria-hidden="true"
          className="mx-auto inline-grid w-full max-w-3xl gap-y-4 border-b border-b-neutral-400 pb-4 dark:border-b-neutral-700"
        >
          <div className="frame rounded-lg">
            <span style={{ backgroundColor: colorQuery.css }}></span>
          </div>
          <pre className="inline-grid max-w-full overflow-x-auto">
            <code>{colorQuery.css}</code>
            <code>{`from${JSON.stringify(colorQuery.color)}`}</code>
          </pre>
        </div>
      ) : null}
      <ColorPicker />
      <section
        aria-labelledby="color"
        className="grid w-full gap-x-3 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      >
        {hueShades.map((color, index) => (
          <Link
            href={`/color/${color.hex.replace("#", "")}`}
            className="grid gap-2 rounded-lg"
            key={index}
          >
            <div role="presentation" className="frame inline-grid rounded-lg">
              <span style={{ backgroundColor: color.css }}></span>
            </div>
            <p className="inline-grid">
              <span className="text-base font-medium text-neutral-700 dark:text-neutral-300">
                {color.slug}
              </span>
              <code>{color.hex}</code>
            </p>
          </Link>
        ))}
      </section>
    </Wrapper>
  );
}

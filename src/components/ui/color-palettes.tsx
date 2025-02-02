"use client";

import type { SessionPalettes } from "~/types/session";
import { useMemo, useCallback } from "react";
import { useSession } from "~/hooks";
import {
  createHue,
  createColor,
  round,
  multiply,
  limiter,
  formatCss,
  switchColorPath,
} from "~/utils";
import Link from "next/link";

export default function ColorPalettes() {
  const session: SessionPalettes = useSession((state) => [
    state.color,
    state.mode,
  ]);
  const [color, mode] = useMemo(() => session, [session]);

  const hueBase = useMemo(
    () => createHue(createColor(color), mode),
    [color, mode],
  );

  const hueShift = useCallback(
    (angle: number[]) =>
      angle.map((deg) => {
        const { mode, h } = hueBase;
        const hue = limiter(h! + deg, 0, 360);
        const decimal = mode === "lch" || mode === "oklch" ? 3 : 2;
        return {
          ...hueBase,
          h: round(hue, decimal),
        };
      }),
    [hueBase],
  );

  const hueShades = useMemo(() => hueShift(multiply(15, 0, 345)), [hueShift]);

  return (
    <ol className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {hueShades.map((shade, index) => (
        <Palette key={index} color={shade} />
      ))}
    </ol>
  );
}

interface ColorCard {
  color: ReturnType<typeof createHue>;
}

function Palette({ color }: ColorCard) {
  const css = formatCss(color);
  const path = switchColorPath("/color", color);

  return (
    <li className="inline-grid" style={{ ["--bg" as string]: css }}>
      <Link
        href={path}
        className="flex rounded-md"
        prefetch={false}
        scroll={false}
      >
        <div
          role="presentation"
          className="bg-ref aspect-cinema inline-flex w-full rounded-md"
        ></div>
        <code className="sr-only">{css}</code>
      </Link>
    </li>
  );
}

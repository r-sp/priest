"use client";

import type { SessionPalettes } from "~/types/session";
import type { ColorState } from "~/types/color";
import { useMemo, useCallback } from "react";
import { useSession } from "~/hooks";
import {
  createHue,
  createColor,
  round,
  multiply,
  limiter,
  formatCss,
  convertHue,
  checkGamut,
  switchColorPath,
} from "~/utils";
import Link from "next/link";

export default function ColorPalettes() {
  const session: SessionPalettes = useSession((state) => [
    state.color,
    state.mode,
    state.hue,
  ]);
  const [color, mode, hue] = useMemo(() => session, [session]);

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

  const hueShades = useMemo(() => {
    const { base, min, max } = hue;
    return hueShift(multiply(base, min, max));
  }, [hueShift, hue]);

  return (
    <ol className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {hueShades.map((shade, index) => (
        <Palette key={index} color={shade} type={mode} />
      ))}
    </ol>
  );
}

interface ColorCard {
  color: ReturnType<typeof createHue>;
  type: keyof ColorState;
}

function Palette({ color, type }: ColorCard) {
  const hue = convertHue(color, type);
  const css = formatCss(hue);
  const offset = checkGamut(hue);
  const path = switchColorPath("/color", hue);
  const link = offset ? `${path}&error=${offset}` : path;

  return (
    <li className="inline-grid" style={{ ["--bg" as string]: css }}>
      <Link
        href={link}
        className="flex rounded-md"
        prefetch={false}
        scroll={false}
      >
        <div
          role="presentation"
          className="bg-ref aspect-cinema inline-flex w-full rounded-md"
        ></div>
        <code className="sr-only">{`Color: ${css}`}</code>
      </Link>
    </li>
  );
}

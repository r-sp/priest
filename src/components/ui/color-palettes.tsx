"use client";

import type { SessionPalettes } from "~/types/session";
import type { ColorState, ColorValues } from "~/types/color";
import { useMemo, useCallback } from "react";
import { useSession } from "~/hooks";
import {
  createHue,
  round,
  multiply,
  limiter,
  formatCss,
  convertHue,
  checkGamut,
  switchColorPath,
  encodeId,
} from "~/utils";
import Link from "next/link";

export default function ColorPalettes() {
  const session: SessionPalettes = useSession((state) => [
    state.color,
    state.mode,
    state.hue,
  ]);
  const [color, mode, hue] = useMemo(() => session, [session]);

  const hueBase = useMemo(() => createHue(color), [color]);

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
    <ol
      id="color-palettes"
      data-length={hueShades.length}
      className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      {hueShades.map((shade, index) => (
        <Palette key={index} color={shade} type={mode} id={index + 1} />
      ))}
    </ol>
  );
}

interface ColorCard {
  color: ReturnType<typeof createHue>;
  type: keyof ColorState;
  id: number;
}

function Palette({ color, type, id }: ColorCard) {
  const hue = convertHue(color, type);
  const css = formatCss(hue);
  const offset = checkGamut(hue);
  const path = switchColorPath("/color", hue);
  const link = offset ? `${path}&error=${offset}` : path;
  const index = encodeId(Object.values(hue) as ColorValues);

  return (
    <li className="inline-grid" style={{ ["--bg" as string]: css }}>
      <Link
        href={link}
        id={`color-palette-${id}`}
        data-color={index}
        className="flex rounded-md"
        prefetch={false}
        scroll={false}
      >
        <div
          role="presentation"
          className="bg-ref aspect-cinema pointer-events-none inline-flex w-full rounded-md"
        ></div>
        <code className="sr-only">{`Color: ${css}`}</code>
      </Link>
    </li>
  );
}

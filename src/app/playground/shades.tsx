"use client";

import type { ColorFormat, OklchColor } from "~/lib/types";
import { useMemo, useCallback } from "react";
import { useColor, useMode } from "~/hooks";
import { createColor, switchCss } from "~/lib/color";
import { round, limiter } from "~/utils/number";
import { Inline } from "~/components";
import Navigation from "./navigation";

export default function Shades() {
  const [{ oklch }] = useColor();
  const [mode] = useMode();
  const { l, c, h } = oklch.color;

  const colors = useMemo(
    () =>
      [
        0, 22, 44, 66, 88, 110, 132, 154, 176, 198, 220, 242, 264, 286, 308,
        330, 352,
      ].map((deg) => ({
        l: round(l, 3),
        c: round(c, 3),
        h: round(limiter(h ? h + deg : deg, 0, 360), 3),
      })),
    [l, c, h],
  );

  return (
    <Navigation>
      {colors.map((color, index) => (
        <Palettes key={index} mode={mode} color={color} id={index} />
      ))}
    </Navigation>
  );
}

function Palettes({
  mode,
  color,
  id,
}: {
  mode: ColorFormat;
  color: OklchColor;
  id: number;
}) {
  const { l, c, h } = color;

  const lightness = useCallback(
    (min: number, max: number) => Math.max(min, Math.min(max, l)),
    [l],
  );

  const chroma = useCallback(
    (max: number) => Math.max(0, Math.min(max, c)),
    [c],
  );

  const hue = h!;

  const shader = useCallback(
    (newColor: OklchColor) =>
      switchCss(mode, createColor({ mode: "oklch", ...newColor })),
    [mode],
  );

  const shades = useMemo(
    () => [
      {
        key: 50,
        color: { l: lightness(0.792, 0.984), c: chroma(0.032), h: hue },
      },
      {
        key: 100,
        color: { l: lightness(0.744, 0.936), c: chroma(0.048), h: hue },
      },
      {
        key: 200,
        color: { l: lightness(0.68, 0.872), c: chroma(0.096), h: hue },
      },
      {
        key: 300,
        color: { l: lightness(0.608, 0.8), c: chroma(0.16), h: hue },
      },
      {
        key: 400,
        color: { l: lightness(0.536, 0.728), c: chroma(0.208), h: hue },
      },
      {
        key: 500,
        color: { l: lightness(0.44, 0.632), c: chroma(0.232), h: hue },
      },
      {
        key: 600,
        color: { l: lightness(0.368, 0.56), c: chroma(0.256), h: hue },
      },
      {
        key: 700,
        color: { l: lightness(0.256, 0.488), c: chroma(0.224), h: hue },
      },
      {
        key: 800,
        color: { l: lightness(0.224, 0.416), c: chroma(0.192), h: hue },
      },
      {
        key: 900,
        color: { l: lightness(0.16, 0.352), c: chroma(0.144), h: hue },
      },
      {
        key: 950,
        color: { l: lightness(0.12, 0.256), c: chroma(0.096), h: hue },
      },
    ],
    [lightness, chroma, hue],
  );

  return (
    <ol
      id={`color-${id + 1}`}
      className="flex grow-1 basis-auto flex-col gap-2 max-sm:flex-row max-sm:flex-wrap"
      data-color={JSON.stringify(color)}
    >
      {shades.map((shade, index) => (
        <Inline
          key={index}
          className="relative aspect-square max-sm:grow-1 max-sm:basis-auto"
          as="li"
          bg={shader(shade.color)}
        >
          <button
            id={`color-${id + 1}-variant-${shade.key}`}
            className="bg-ref absolute inset-0 rounded-md max-sm:rounded-sm"
            data-color={JSON.stringify(shade.color)}
          >
            <span className="sr-only">{`color ${id + 1} variant ${shade.key}`}</span>
          </button>
        </Inline>
      ))}
    </ol>
  );
}

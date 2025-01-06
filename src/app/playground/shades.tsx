"use client";

import type { OklchColor } from "~/lib/types";
import { useMemo, useCallback } from "react";
import { useColor, useMode } from "~/hooks";
import { createColor, switchCss } from "~/lib/color";
import { limiter, multiply } from "~/utils/number";

export default function Shades() {
  const [{ oklch }] = useColor();
  const { l, c, h } = oklch.color;

  const colors = useMemo(
    () =>
      multiply(24, 0, 336).map((deg) => ({
        l,
        c,
        h: limiter(h ? h + deg : deg, 0, 360),
      })),
    [l, c, h],
  );

  return (
    <div className="grid gap-2">
      {colors.map((color, index) => (
        <Shade key={index} color={color} />
      ))}
    </div>
  );
}

function Shade({ color }: { color: OklchColor }) {
  const [mode] = useMode();
  const { l, c } = color;

  const lightness = useCallback(
    (max: number) => Math.max(max / 2, Math.min(l, max)),
    [l],
  );

  const chroma = useCallback(
    (max: number) => Math.max(max / 2, Math.min(c, max)),
    [c],
  );

  const shader = useCallback(
    (newColor: Partial<OklchColor>) =>
      switchCss(mode, createColor({ mode: "oklch", ...color, ...newColor })),
    [color, mode],
  );

  const shades = useMemo(
    () => [
      shader({ l: lightness(0.977), c: chroma(0.018) }),
      shader({ l: lightness(0.95), c: chroma(0.042) }),
      shader({ l: lightness(0.905), c: chroma(0.057) }),
      shader({ l: lightness(0.84), c: chroma(0.135) }),
      shader({ l: lightness(0.754), c: chroma(0.189) }),
      shader({ l: lightness(0.685), c: chroma(0.214) }),
      shader({ l: lightness(0.587), c: chroma(0.213) }),
      shader({ l: lightness(0.515), c: chroma(0.187) }),
      shader({ l: lightness(0.446), c: chroma(0.154) }),
      shader({ l: lightness(0.395), c: chroma(0.124) }),
      shader({ l: lightness(0.278), c: chroma(0.088) }),
    ],
    [shader, lightness, chroma],
  );

  return (
    <ol className="flex flex-wrap gap-2">
      {shades.map((shade, index) => (
        <li
          key={index}
          className="grow-1 basis-4 md:basis-8"
          style={{ ["--bg" as string]: shade }}
        >
          <div
            className="aspect-square rounded-sm"
            style={{ backgroundColor: "var(--bg)" }}
          ></div>
        </li>
      ))}
    </ol>
  );
}

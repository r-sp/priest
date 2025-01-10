"use client";

import type { OklchColor } from "~/lib/types";
import { useMemo, useCallback } from "react";
import { useColor, useMode, useColorQuery } from "~/hooks";
import { createColor, switchCss, formatHex } from "~/lib/color";
import { measureColor, contrastColor } from "./a11y";
import { Wrapper, Progress } from "~/components";
import { Slider } from "~/features";
import ColorContrast from "./contrast";
import Link from "next/link";

export default function ColorDetail() {
  const colorQuery = useColorQuery();
  const [colorContext] = useColor();
  const [modeContext] = useMode();

  const color = colorQuery ? createColor(colorQuery) : colorContext;

  const { rgb, hsl, hwb, lab, lch, oklab, oklch } = color;

  const mode = colorQuery ? colorQuery.mode : modeContext;

  const hex = formatHex(rgb.color);
  const colorMode = switchCss(mode, color);
  const colorPicker = colorQuery ? false : true;

  const { brightness, luminance } = measureColor(rgb.color);

  const { white, black } = useMemo(
    () => ({
      white: contrastColor(rgb.color, { r: 1, g: 1, b: 1 }),
      black: contrastColor(rgb.color, { r: 0, g: 0, b: 0 }),
    }),
    [rgb],
  );

  const previewColor = useCallback(
    (newColor: Partial<OklchColor>) =>
      switchCss(
        mode,
        createColor({ mode: "oklch", ...oklch.color, ...newColor }),
      ),
    [mode, oklch],
  );

  const trackBrightnessLeft = previewColor({ l: 0.2, c: 0 });
  const trackBrightnessRight = previewColor({ l: 1, c: 0 });

  const trackLuminanceBlue = previewColor({ h: 250 });
  const trackLuminanceGreen = previewColor({ h: 180 });
  const trackLuminanceYellow = previewColor({ h: 90 });
  const trackLuminanceWhite = previewColor({ c: 0 });

  return (
    <Wrapper
      as="article"
      aria-labelledby="color"
      maxWidth="1280"
      className="grid gap-y-8"
      style={{ ["--currentColor" as string]: colorMode }}
    >
      <h1 id="color" className="sr-only">
        {colorMode}
      </h1>
      <section
        aria-label="details"
        className="mx-auto inline-grid w-full max-w-5xl gap-y-4"
      >
        <Link
          aria-label={`view color ${hex}`}
          href={`/color/${hex.replace("#", "")}`}
          className="frame rounded-lg focus-visible:z-69"
          prefetch={false}
        >
          <span
            className="pointer-events-none"
            style={{ backgroundColor: "var(--currentColor)" }}
          ></span>
        </Link>
        <div>
          <p>
            <code>{hex}</code>
          </p>
          <p
            className={
              mode === "rgb"
                ? "text-neutral-800 dark:text-neutral-200"
                : undefined
            }
          >
            <code>{rgb.css}</code>
          </p>
          <p
            className={
              mode === "hsl"
                ? "text-neutral-800 dark:text-neutral-200"
                : undefined
            }
          >
            <code>{hsl.css}</code>
          </p>
          <p
            className={
              mode === "hwb"
                ? "text-neutral-800 dark:text-neutral-200"
                : undefined
            }
          >
            <code>{hwb.css}</code>
          </p>
        </div>
        <div>
          <p
            className={
              mode === "lch"
                ? "text-neutral-800 dark:text-neutral-200"
                : undefined
            }
          >
            <code>{lch.css}</code>
          </p>
          <p
            className={
              mode === "oklch"
                ? "text-neutral-800 dark:text-neutral-200"
                : undefined
            }
          >
            <code>{oklch.css}</code>
          </p>
          <p
            className={
              mode === "lab"
                ? "text-neutral-800 dark:text-neutral-200"
                : undefined
            }
          >
            <code>{lab.css}</code>
          </p>
          <p
            className={
              mode === "oklab"
                ? "text-neutral-800 dark:text-neutral-200"
                : undefined
            }
          >
            <code>{oklab.css}</code>
          </p>
        </div>
      </section>
      {colorPicker ? (
        <div className="grid border-y border-y-neutral-400 py-8 dark:border-y-neutral-700">
          <Slider />
        </div>
      ) : null}
      <div className="inline-grid gap-8 md:grid-cols-2">
        <div className="grid gap-y-3">
          <p>Brightness</p>
          <Progress
            value={brightness}
            style={`linear-gradient(to right, ${trackBrightnessLeft}, ${trackBrightnessRight})`}
          />
        </div>
        <div className="grid gap-y-3">
          <p>Luminance</p>
          <Progress
            value={luminance}
            style={`linear-gradient(to right, ${trackLuminanceBlue}, ${trackLuminanceGreen} 25%, ${trackLuminanceYellow} 50%, ${trackLuminanceWhite} 80%)`}
          />
        </div>
      </div>
      <div className="mt-4 inline-grid gap-x-8 gap-y-12 md:grid-cols-2">
        <ColorContrast reflect={true} color={white} />
        <ColorContrast reflect={false} color={black} />
      </div>
    </Wrapper>
  );
}

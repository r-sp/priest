"use client";

import { useColorStore } from "~/app/provider";
import { findColor, nearestColor } from "~/lib/web-colors";
import { measureColor, contrastColor } from "~/lib/a11y";
import ColorPicker from "./picker";
import Wrapper from "../ui/wrapper";
import Link from "next/link";

export default function ColorView() {
  const { hex, rgb, hsl, hwb, lab, lch, oklab, oklch, mode } = useColorStore(
    (state) => state,
  );

  const colorHex = hex;
  const colorRgb = rgb.css;
  const colorHsl = hsl.css;
  const colorHwb = hwb.css;
  const colorLab = lab.css;
  const colorLch = lch.css;
  const colorOklab = oklab.css;
  const colorOklch = oklch.css;

  const modeRgb = mode === "rgb";
  const modeHsl = mode === "hsl";
  const modeHwb = mode === "hwb";
  const modeLab = mode === "lab";
  const modeLch = mode === "lch";
  const modeOklab = mode === "oklab";
  const modeOklch = mode === "oklch";

  const colorMode = modeRgb
    ? colorRgb
    : modeHsl
      ? colorHsl
      : modeHwb
        ? colorHwb
        : modeLab
          ? colorLab
          : modeLch
            ? colorLch
            : modeOklab
              ? colorOklab
              : modeOklch
                ? colorOklch
                : colorHex;

  const colorName = findColor(nearestColor(hex) || "black");

  const { brightness, luminance } = measureColor(rgb.color);
  const white = contrastColor(rgb.color, { r: 1, g: 1, b: 1 });
  const black = contrastColor(rgb.color, { r: 0, g: 0, b: 0 });

  return (
    <Wrapper
      as="article"
      aria-labelledby="color"
      maxWidth="1024"
      className="grid gap-y-4"
      outerStyle="py-4"
    >
      <header className="grid gap-y-3">
        <Link
          aria-label={`view color ${hex}`}
          href={`/color/${hex.replace("#", "")}`}
          className="frame inline-grid w-full rounded-lg"
        >
          <span style={{ backgroundColor: colorMode }}></span>
        </Link>
        <h1
          id="color"
          className="text-2xl font-medium text-neutral-800 dark:text-neutral-200"
        >
          <span>{colorName}</span>
        </h1>
      </header>
      <section aria-label="legacy">
        <p>
          <code>{colorHex}</code>
        </p>
        <p
          className={
            modeRgb ? "text-neutral-800 dark:text-neutral-200" : undefined
          }
        >
          <code>{colorRgb}</code>
        </p>
        <p
          className={
            modeHsl ? "text-neutral-800 dark:text-neutral-200" : undefined
          }
        >
          <code>{colorHsl}</code>
        </p>
        <p
          className={
            modeHwb ? "text-neutral-800 dark:text-neutral-200" : undefined
          }
        >
          <code>{colorHwb}</code>
        </p>
      </section>
      <section aria-label="modern">
        <p
          className={
            modeLch ? "text-neutral-800 dark:text-neutral-200" : undefined
          }
        >
          <code>{colorLch}</code>
        </p>
        <p
          className={
            modeOklch ? "text-neutral-800 dark:text-neutral-200" : undefined
          }
        >
          <code>{colorOklch}</code>
        </p>
        <p
          className={
            modeLab ? "text-neutral-800 dark:text-neutral-200" : undefined
          }
        >
          <code>{colorLab}</code>
        </p>
        <p
          className={
            modeOklab ? "text-neutral-800 dark:text-neutral-200" : undefined
          }
        >
          <code>{colorOklab}</code>
        </p>
      </section>
      <div className="my-4 grid border-y border-y-neutral-400 py-8 dark:border-y-neutral-700">
        <ColorPicker showColorMode={false} />
      </div>
      <section aria-label="analysis">
        <h3 className="text-neutral-800 dark:text-neutral-200">
          Color Analysis
        </h3>
        <p>{`Brightness: ${brightness}`}</p>
        <p>{`Luminance: ${luminance}`}</p>
        <section
          className="mt-4"
          aria-label="current color on white background"
        >
          <h2 className="mt-2 text-neutral-800 dark:text-neutral-200">
            Color on White Background
          </h2>
          <p>{`Contrast: ${white.ratio}`}</p>
          <dl className="mt-2">
            <dt className="text-neutral-700 dark:text-neutral-300">
              WCAG Normal
            </dt>
            <dd>{`AA: ${white.normal.aa}`}</dd>
            <dd>{`AAA: ${white.normal.aaa}`}</dd>
            <dt className="mt-2 text-neutral-700 dark:text-neutral-300">
              WCAG Large
            </dt>
            <dd>{`AA: ${white.large.aa}`}</dd>
            <dd>{`AAA: ${white.large.aaa}`}</dd>
          </dl>
        </section>
        <section
          className="mt-4"
          aria-label="current color on black background"
        >
          <h2 className="mt-2 text-neutral-800 dark:text-neutral-200">
            Color on Black Background
          </h2>
          <p>{`Contrast: ${black.ratio}`}</p>
          <dl className="mt-2">
            <dt className="text-neutral-700 dark:text-neutral-300">
              WCAG Normal
            </dt>
            <dd>{`AA: ${black.normal.aa}`}</dd>
            <dd>{`AAA: ${black.normal.aaa}`}</dd>
            <dt className="mt-2 text-neutral-700 dark:text-neutral-300">
              WCAG Large
            </dt>
            <dd>{`AA: ${black.large.aa}`}</dd>
            <dd>{`AAA: ${black.large.aaa}`}</dd>
          </dl>
        </section>
      </section>
    </Wrapper>
  );
}

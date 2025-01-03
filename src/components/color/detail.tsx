"use client";

import { useMemo } from "react";
import { useColor, useMode } from "~/app/store";
import { useColorQuery } from "~/app/query";
import { createColor, measureColor, contrastColor } from "~/lib/color";
import ColorPicker from "./picker";
import Wrapper from "../ui/wrapper";
import Link from "next/link";
import clsx from "clsx";

export default function ColorDetail() {
  const colorQuery = useColorQuery();
  const [colorContext] = useColor();
  const [modeContext] = useMode();

  const { hex, rgb, hsl, hwb, lab, lch, oklab, oklch } = colorQuery
    ? createColor(colorQuery)
    : colorContext;

  const mode = colorQuery ? colorQuery.mode : modeContext;

  const modeRgb = mode === "rgb";
  const modeHsl = mode === "hsl";
  const modeHwb = mode === "hwb";
  const modeLab = mode === "lab";
  const modeLch = mode === "lch";
  const modeOklab = mode === "oklab";
  const modeOklch = mode === "oklch";

  const colorMode = modeRgb
    ? rgb.css
    : modeHsl
      ? hsl.css
      : modeHwb
        ? hwb.css
        : modeLab
          ? lab.css
          : modeLch
            ? lch.css
            : modeOklab
              ? oklab.css
              : modeOklch
                ? oklch.css
                : hex;

  const colorPicker = colorQuery ? false : true;

  const { brightness, luminance } = useMemo(
    () => measureColor(rgb.color),
    [rgb],
  );

  const white = useMemo(
    () => contrastColor(rgb.color, { r: 1, g: 1, b: 1 }),
    [rgb],
  );

  const black = useMemo(
    () => contrastColor(rgb.color, { r: 0, g: 0, b: 0 }),
    [rgb],
  );

  return (
    <Wrapper
      as="article"
      aria-labelledby="color"
      maxWidth="1024"
      className="grid gap-y-4"
      style={{ ["--currentColor" as string]: colorMode }}
    >
      <header className="inline-grid gap-y-3">
        <Link
          aria-label={`view color ${hex}`}
          href={`/color/${hex.replace("#", "")}`}
          className="frame inline-grid w-full rounded-lg focus-visible:z-69"
          prefetch={false}
        >
          <span
            className="pointer-events-none"
            style={{ backgroundColor: "var(--currentColor)" }}
          ></span>
        </Link>
      </header>
      <section aria-label="legacy">
        <p>
          <code>{hex}</code>
        </p>
        <p
          className={
            modeRgb ? "text-neutral-800 dark:text-neutral-200" : undefined
          }
        >
          <code>{rgb.css}</code>
        </p>
        <p
          className={
            modeHsl ? "text-neutral-800 dark:text-neutral-200" : undefined
          }
        >
          <code>{hsl.css}</code>
        </p>
        <p
          className={
            modeHwb ? "text-neutral-800 dark:text-neutral-200" : undefined
          }
        >
          <code>{hwb.css}</code>
        </p>
      </section>
      <section aria-label="modern">
        <p
          className={
            modeLch ? "text-neutral-800 dark:text-neutral-200" : undefined
          }
        >
          <code>{lch.css}</code>
        </p>
        <p
          className={
            modeOklch ? "text-neutral-800 dark:text-neutral-200" : undefined
          }
        >
          <code>{oklch.css}</code>
        </p>
        <p
          className={
            modeLab ? "text-neutral-800 dark:text-neutral-200" : undefined
          }
        >
          <code>{lab.css}</code>
        </p>
        <p
          className={
            modeOklab ? "text-neutral-800 dark:text-neutral-200" : undefined
          }
        >
          <code>{oklab.css}</code>
        </p>
      </section>
      {colorPicker ? (
        <div className="my-4 grid border-y border-y-neutral-400 py-8 dark:border-y-neutral-700">
          <ColorPicker showTextbox={false} />
        </div>
      ) : null}
      <section aria-label="analysis">
        <h3 className="text-neutral-800 dark:text-neutral-200">
          Color Analysis
        </h3>
        <p>{`Brightness: ${brightness}`}</p>
        <p>{`Luminance: ${luminance}`}</p>
        <section
          className="mt-8"
          aria-label="current color on white background"
        >
          <h2 className="mt-2 text-neutral-800 dark:text-neutral-200">
            Color on White Background
          </h2>
          <p>{`Contrast: ${white.ratio}`}</p>
          <Preview
            background="bg-white"
            textNormal="Where clarity meets comfort"
            textLarge="Intuitive design for a stress-free experience"
          >
            <dl>
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
          </Preview>
        </section>
        <section
          className="mt-8"
          aria-label="current color on black background"
        >
          <h2 className="mt-2 text-neutral-800 dark:text-neutral-200">
            Color on Black Background
          </h2>
          <p>{`Contrast: ${black.ratio}`}</p>
          <Preview
            background="bg-black"
            textNormal="Where usability and comfort converge"
            textLarge="Experience the difference of thoughtful design"
          >
            <dl>
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
          </Preview>
        </section>
      </section>
    </Wrapper>
  );
}

function Preview({
  children,
  background,
  textNormal,
  textLarge,
}: {
  children: React.ReactNode;
  background: string;
  textNormal: string;
  textLarge: string;
}) {
  return (
    <div role="presentation" className="mt-2 grid gap-y-4 sm:grid-flow-col">
      {children}
      <div role="none">
        <figure
          className={clsx(
            background,
            "flex flex-col justify-center rounded-lg border",
            background === "bg-white" &&
              "border-neutral-400 dark:border-transparent",
            background === "bg-black" &&
              "border-transparent dark:border-neutral-700",
            "px-3 pt-3 pb-4",
          )}
        >
          <figcaption
            className="text-sm"
            style={{ color: "var(--currentColor)" }}
          >
            {textNormal}
          </figcaption>
          <figcaption
            className="text-2xl font-semibold"
            style={{ color: "var(--currentColor)" }}
          >
            {textLarge}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

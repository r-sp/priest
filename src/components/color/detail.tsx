"use client";

import { useColor, useMode } from "~/app/store";
import { useColorQuery } from "~/app/query";
import { createColor } from "~/lib/color";
import ColorPicker from "./picker";
import ColorAnalysis from "./analysis";
import Wrapper from "../ui/wrapper";
import Link from "next/link";

export default function ColorDetail() {
  const colorQuery = useColorQuery();
  const [colorContext] = useColor();
  const [modeContext] = useMode();

  const color = colorQuery ? createColor(colorQuery) : colorContext;

  const { hex, rgb, hsl, hwb, lab, lch, oklab, oklch } = color;

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
      <ColorAnalysis color={color} mode={mode} />
    </Wrapper>
  );
}

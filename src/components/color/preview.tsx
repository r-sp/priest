"use client";

import { useColorQuery } from "./query";
import { createColor } from "~/lib/color";
import { findColor, nearestColor } from "~/lib/web-colors";
import Wrapper from "../ui/wrapper";
import Link from "next/link";

export default function ColorPreview() {
  const { color, css } = useColorQuery()!;

  const { hex, rgb, hsl, hwb, lab, lch, oklab, oklch } = createColor(color);

  const colorHex = hex;
  const colorRgb = rgb.css;
  const colorHsl = hsl.css;
  const colorHwb = hwb.css;
  const colorLab = lab.css;
  const colorLch = lch.css;
  const colorOklab = oklab.css;
  const colorOklch = oklch.css;

  const colorName = findColor(nearestColor(hex) || "black");

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
          <span style={{ backgroundColor: css }}></span>
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
            css === colorRgb
              ? "text-neutral-800 dark:text-neutral-200"
              : undefined
          }
        >
          <code>{colorRgb}</code>
        </p>
        <p
          className={
            css === colorHsl
              ? "text-neutral-800 dark:text-neutral-200"
              : undefined
          }
        >
          <code>{colorHsl}</code>
        </p>
        <p
          className={
            css === colorHwb
              ? "text-neutral-800 dark:text-neutral-200"
              : undefined
          }
        >
          <code>{colorHwb}</code>
        </p>
      </section>
      <section aria-label="modern">
        <p
          className={
            css === colorLch
              ? "text-neutral-800 dark:text-neutral-200"
              : undefined
          }
        >
          <code>{colorLch}</code>
        </p>
        <p
          className={
            css === colorOklch
              ? "text-neutral-800 dark:text-neutral-200"
              : undefined
          }
        >
          <code>{colorOklch}</code>
        </p>
        <p
          className={
            css === colorLab
              ? "text-neutral-800 dark:text-neutral-200"
              : undefined
          }
        >
          <code>{colorLab}</code>
        </p>
        <p
          className={
            css === colorOklab
              ? "text-neutral-800 dark:text-neutral-200"
              : undefined
          }
        >
          <code>{colorOklab}</code>
        </p>
      </section>
    </Wrapper>
  );
}

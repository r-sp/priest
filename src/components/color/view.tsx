"use client";

import { useColorStore } from "~/app/provider";
import { findColor, nearestColor } from "~/lib/web-colors";
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
          <span style={{ backgroundColor: colorRgb }}></span>
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
      <div className="mt-4 grid border-t border-t-neutral-400 pt-8 dark:border-t-neutral-700">
        <ColorPicker showColorMode={false} />
      </div>
    </Wrapper>
  );
}

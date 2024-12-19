"use client";

import { useColorStore } from "../color/provider";
import { limiter, multiplier } from "~/lib/utils";
import { findColor, nearestColor } from "~/lib/web-colors";
import { formatOklch, formatHex } from "~/lib/format";
import {
  parseHex,
  parseRgb,
  parseHsl,
  parseHwb,
  parseLab,
  parseLch,
  parseOklab,
  parseOklch,
} from "~/lib/parse";
import InputRgb from "../color/input/rgb";
import InputHsl from "../color/input/hsl";
import InputHwb from "../color/input/hwb";
import InputLab from "../color/input/lab";
import InputLch from "../color/input/lch";
import InputOklab from "../color/input/oklab";
import InputOklch from "../color/input/oklch";
import Wrapper from "./wrapper";
import Link from "next/link";

export default function Color() {
  const store = useColorStore((state) => state);
  const { rgb, hsl, hwb, lab, lch, oklab, oklch, mode } = store;
  const base = oklch.color.h || 0;

  const hueShift = (angle: number[]) =>
    angle.map((deg) => {
      const colorOklch = { ...oklch.color, h: deg };
      const colorHex = parseHex({ mode: "oklch", ...colorOklch });
      return {
        css: formatOklch(colorOklch),
        hex: colorHex,
        slug: findColor(nearestColor(colorHex) || "black"),
      };
    });

  const harmony = hueShift(
    multiplier(15, 0, 360).map((deg) => limiter(base + deg, 0, 360)),
  );

  const modeRgb = mode === "rgb";
  const modeHsl = mode === "hsl";
  const modeHwb = mode === "hwb";
  const modeLab = mode === "lab";
  const modeLch = mode === "lch";
  const modeOklab = mode === "oklab";
  const modeOklch = mode === "oklch";

  return (
    <Wrapper as="article" className="grid gap-y-8" outerStyle="py-4">
      <header className="mx-auto inline-grid w-full max-w-3xl gap-4">
        <h1 id="color" className="text-neutral-800 dark:text-neutral-200">
          <code>
            {modeRgb
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
                          : oklch.css}
          </code>
        </h1>
        {modeRgb ? (
          <InputRgb
            id="color-rgb"
            onChange={(c) => {
              const src = formatHex(c);

              store.setHex(c);
              store.setHsl(parseHsl(src).color);
              store.setHwb(parseHwb(src).color);
              store.setLab(parseLab(src).color);
              store.setLch(parseLch(src).color);
              store.setOklab(parseOklab(src).color);
              store.setOklch(parseOklch(src).color);
            }}
          />
        ) : modeHsl ? (
          <InputHsl
            id="color-hsl"
            onChange={(c) => {
              const src = parseHex({ mode: "hsl", ...c });
              const _rgb = parseRgb(src).color;

              store.setHex(_rgb);
              store.setRgb(_rgb);
              store.setHwb(parseHwb(src).color);
              store.setLab(parseLab(src).color);
              store.setLch(parseLch(src).color);
              store.setOklab(parseOklab(src).color);
              store.setOklch(parseOklch(src).color);
            }}
          />
        ) : modeHwb ? (
          <InputHwb
            id="color-hwb"
            onChange={(c) => {
              const src = parseHex({ mode: "hwb", ...c });
              const _rgb = parseRgb(src).color;

              store.setHex(_rgb);
              store.setRgb(_rgb);
              store.setHsl(parseHsl(src).color);
              store.setLab(parseLab(src).color);
              store.setLch(parseLch(src).color);
              store.setOklab(parseOklab(src).color);
              store.setOklch(parseOklch(src).color);
            }}
          />
        ) : modeLch ? (
          <InputLch
            id="color-lch"
            onChange={(c) => {
              const src = parseHex({ mode: "lch", ...c });
              const _rgb = parseRgb(src).color;

              store.setHex(_rgb);
              store.setRgb(_rgb);
              store.setHsl(parseHsl(src).color);
              store.setHwb(parseHwb(src).color);
              store.setLab(parseLab(src).color);
              store.setOklab(parseOklab(src).color);
              store.setOklch(parseOklch(src).color);
            }}
          />
        ) : modeOklch ? (
          <InputOklch
            id="color-oklch"
            onChange={(c) => {
              const src = parseHex({ mode: "oklch", ...c });
              const _rgb = parseRgb(src).color;

              store.setHex(_rgb);
              store.setRgb(_rgb);
              store.setHsl(parseHsl(src).color);
              store.setHwb(parseHwb(src).color);
              store.setLab(parseLab(src).color);
              store.setLch(parseLch(src).color);
              store.setOklab(parseOklab(src).color);
            }}
          />
        ) : modeLab ? (
          <InputLab
            id="color-lab"
            onChange={(c) => {
              const src = parseHex({ mode: "lab", ...c });
              const _rgb = parseRgb(src).color;

              store.setHex(_rgb);
              store.setRgb(_rgb);
              store.setHsl(parseHsl(src).color);
              store.setHwb(parseHwb(src).color);
              store.setLch(parseLch(src).color);
              store.setOklab(parseOklab(src).color);
              store.setOklch(parseOklch(src).color);
            }}
          />
        ) : modeOklab ? (
          <InputOklab
            id="color-oklab"
            onChange={(c) => {
              const src = parseHex({ mode: "oklab", ...c });
              const _rgb = parseRgb(src).color;

              store.setHex(_rgb);
              store.setRgb(_rgb);
              store.setHsl(parseHsl(src).color);
              store.setHwb(parseHwb(src).color);
              store.setLab(parseLab(src).color);
              store.setLch(parseLch(src).color);
              store.setOklch(parseOklch(src).color);
            }}
          />
        ) : null}
      </header>
      <section
        aria-labelledby="color"
        className="grid w-full gap-x-3 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      >
        {harmony.map((color, index) => (
          <Link
            href={`/color/${color.hex.replace("#", "")}`}
            className="grid gap-2 rounded-lg"
            key={index}
          >
            <div role="presentation" className="frame inline-grid rounded-lg">
              <span style={{ backgroundColor: color.css }}></span>
            </div>
            <p className="inline-grid">
              <span className="text-base font-medium text-neutral-700 dark:text-neutral-300">
                {color.slug}
              </span>
              <code>{color.hex}</code>
            </p>
          </Link>
        ))}
      </section>
    </Wrapper>
  );
}

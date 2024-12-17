"use client";

import { useColorStore } from "../color/provider";
import { formatOklch, formatHex, parseColor } from "~/lib/color";
import { limiter, multiplier } from "~/lib/utils";
import { findColor, nearestColor } from "~/lib/web-colors";
import { ColorInput } from "../color";
import Link from "next/link";

export default function Color() {
  const store = useColorStore((state) => state);
  const { rgb, hsl, hwb, lab, lch, oklab, oklch, mode } = store;
  const base = oklch.color.h || 0;
  const parse = parseColor();

  const hueShift = (angle: number[]) =>
    angle.map((deg) => {
      const colorOklch = { ...oklch.color, h: deg };
      const colorHex = parse.hex({ mode: "oklch", ...colorOklch });
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
    <article className="grid gap-8 px-3 py-4">
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
          <ColorInput.Rgb
            id="color-rgb"
            onChange={(c) => {
              const parse = parseColor();
              const src = formatHex(c);

              store.setHex(c);
              store.setHsl(parse.hsl(src).color);
              store.setHwb(parse.hwb(src).color);
              store.setLab(parse.lab(src).color);
              store.setLch(parse.lch(src).color);
              store.setOklab(parse.oklab(src).color);
              store.setOklch(parse.oklch(src).color);
            }}
          />
        ) : null}
        {modeHsl ? (
          <ColorInput.Hsl
            id="color-hsl"
            onChange={(c) => {
              const parse = parseColor();
              const src = parse.hex({ mode: "hsl", ...c });
              const _rgb = parse.rgb(src).color;

              store.setHex(_rgb);
              store.setRgb(_rgb);
              store.setHwb(parse.hwb(src).color);
              store.setLab(parse.lab(src).color);
              store.setLch(parse.lch(src).color);
              store.setOklab(parse.oklab(src).color);
              store.setOklch(parse.oklch(src).color);
            }}
          />
        ) : null}
        {modeHwb && (
          <ColorInput.Hwb
            id="color-hwb"
            onChange={(c) => {
              const parse = parseColor();
              const src = parse.hex({ mode: "hwb", ...c });
              const _rgb = parse.rgb(src).color;

              store.setHex(_rgb);
              store.setRgb(_rgb);
              store.setHsl(parse.hsl(src).color);
              store.setLab(parse.lab(src).color);
              store.setLch(parse.lch(src).color);
              store.setOklab(parse.oklab(src).color);
              store.setOklch(parse.oklch(src).color);
            }}
          />
        )}
        {modeLch ? (
          <ColorInput.Lch
            id="color-lch"
            onChange={(c) => {
              const parse = parseColor();
              const src = parse.hex({ mode: "lch", ...c });
              const _rgb = parse.rgb(src).color;

              store.setHex(_rgb);
              store.setRgb(_rgb);
              store.setHsl(parse.hsl(src).color);
              store.setHwb(parse.hwb(src).color);
              store.setLab(parse.lab(src).color);
              store.setOklab(parse.oklab(src).color);
              store.setOklch(parse.oklch(src).color);
            }}
          />
        ) : null}
        {modeOklch ? (
          <ColorInput.Oklch
            id="color-oklch"
            onChange={(c) => {
              const parse = parseColor();
              const src = parse.hex({ mode: "oklch", ...c });
              const _rgb = parse.rgb(src).color;

              store.setHex(_rgb);
              store.setRgb(_rgb);
              store.setHsl(parse.hsl(src).color);
              store.setHwb(parse.hwb(src).color);
              store.setLab(parse.lab(src).color);
              store.setLch(parse.lch(src).color);
              store.setOklab(parse.oklab(src).color);
            }}
          />
        ) : null}
        {modeLab ? (
          <ColorInput.Lab
            id="color-lab"
            onChange={(c) => {
              const parse = parseColor();
              const src = parse.hex({ mode: "lab", ...c });
              const _rgb = parse.rgb(src).color;

              store.setHex(_rgb);
              store.setRgb(_rgb);
              store.setHsl(parse.hsl(src).color);
              store.setHwb(parse.hwb(src).color);
              store.setLch(parse.lch(src).color);
              store.setOklab(parse.oklab(src).color);
              store.setOklch(parse.oklch(src).color);
            }}
          />
        ) : null}
        {modeOklab ? (
          <ColorInput.Oklab
            id="color-oklab"
            onChange={(c) => {
              const parse = parseColor();
              const src = parse.hex({ mode: "oklab", ...c });
              const _rgb = parse.rgb(src).color;

              store.setHex(_rgb);
              store.setRgb(_rgb);
              store.setHsl(parse.hsl(src).color);
              store.setHwb(parse.hwb(src).color);
              store.setLab(parse.lab(src).color);
              store.setLch(parse.lch(src).color);
              store.setOklch(parse.oklch(src).color);
            }}
          />
        ) : null}
      </header>
      <section
        aria-labelledby="color"
        className="mx-auto grid w-full max-w-7xl gap-x-3 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
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
    </article>
  );
}

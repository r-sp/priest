"use client";

import { useParams } from "next/navigation";
import { useColorStore } from "./provider";
import {
  createColor,
  isValidHex,
  isReadable,
  brightness,
  luminance,
  contrast,
  formatHex,
  parseColor,
} from "~/lib/color";
import { ColorInput } from "./index";
import Link from "next/link";

export default function ColorDetail() {
  const colorBy = useParams<{ hex: string }>();
  const store = useColorStore((state) => state);

  const { hex, rgb, hsl, hwb, lab, lch, oklab, oklch } = colorBy.hex
    ? createColor(isValidHex(colorBy.hex))
    : store;

  const colorHex = hex;
  const colorRgb = rgb.css;
  const colorHsl = hsl.css;
  const colorHwb = hwb.css;
  const colorLab = lab.css;
  const colorLch = lch.css;
  const colorOklab = oklab.css;
  const colorOklch = oklch.css;

  const check = rgb.color;
  const colorWhite = { r: 1, g: 1, b: 1 };
  const colorBrightness = brightness(check);
  const colorLuminance = luminance(check);
  const colorContrast = contrast(check, colorWhite);
  const colorNormalAA = isReadable(check, colorWhite, {
    level: "AA",
    size: "normal",
  })
    ? "Pass"
    : "Fail";
  const colorNormalAAA = isReadable(check, colorWhite, {
    level: "AAA",
    size: "normal",
  })
    ? "Pass"
    : "Fail";
  const colorLargeAA = isReadable(check, colorWhite, {
    level: "AA",
    size: "large",
  })
    ? "Pass"
    : "Fail";
  const colorLargeAAA = isReadable(check, colorWhite, {
    level: "AAA",
    size: "large",
  })
    ? "Pass"
    : "Fail";

  return (
    <article className="grid gap-8 px-4 pt-4 pb-8 md:grid-cols-2">
      <header className="mx-auto w-full max-w-3xl md:relative">
        <Link
          href="/playground"
          className="inline-grid"
          style={{ color: colorRgb }}
        >
          <svg
            role="img"
            aria-label="the holy sign"
            className="h-12 w-8"
            viewBox="0 0 150 200"
            fill="none"
          >
            <path
              stroke="currentColor"
              strokeWidth={12}
              strokeLinejoin="round"
              d="M46.1698 194C27.041 106.95 -28.9989 -69.3396 37.9717 43.6711C127.057 194 144 8.97726 144 8.97726C144 8.97726 54.3678 -15.4245 46.1698 194Z"
            />
          </svg>
        </Link>
        <div role="none" className="md:sticky md:top-4">
          <div role="presentation" className="frame mt-4 rounded-lg">
            <span style={{ backgroundColor: colorRgb }}></span>
          </div>
          <h1 className="mt-4">
            <code>{colorHex}</code>
          </h1>
          <p>
            <code>{colorRgb}</code>
          </p>
          <p>
            <code>{colorHsl}</code>
          </p>
          <p>
            <code>{colorHwb}</code>
          </p>
          <p>
            <code>{colorLch}</code>
          </p>
          <p>
            <code>{colorOklch}</code>
          </p>
          <p>
            <code>{colorLab}</code>
          </p>
          <p>
            <code>{colorOklab}</code>
          </p>
          <p className="mt-4">Brightness: {colorBrightness}</p>
          <p>Luminance: {colorLuminance}</p>
          <p>Contrast: {colorContrast}</p>
          <p className="mt-4">WCAG Normal AA: {colorNormalAA}</p>
          <p>WCAG Normal AAA: {colorNormalAAA}</p>
          <p>WCAG Large AA: {colorLargeAA}</p>
          <p>WCAG Large AAA: {colorLargeAAA}</p>
        </div>
      </header>
      {!colorBy.hex && (
        <aside className="mx-auto grid w-full max-w-3xl gap-8 md:content-baseline">
          <section
            aria-labelledby="color-rgb"
            className="grid gap-4 border-t-neutral-400 max-md:border-t max-md:pt-8 md:pt-16 dark:border-t-neutral-700"
          >
            <h2
              id="color-rgb"
              className="text-neutral-700 dark:text-neutral-300"
            >
              RGB
            </h2>
            <ColorInput.Rgb
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
          </section>
          <section
            aria-labelledby="color-hsl"
            className="grid gap-4 border-t border-t-neutral-400 pt-8 dark:border-t-neutral-700"
          >
            <h2
              id="color-hsl"
              className="text-neutral-700 dark:text-neutral-300"
            >
              HSL
            </h2>
            <ColorInput.Hsl
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
          </section>
          <section
            aria-labelledby="color-hwb"
            className="grid gap-4 border-t border-t-neutral-400 pt-8 dark:border-t-neutral-700"
          >
            <h2
              id="color-hwb"
              className="text-neutral-700 dark:text-neutral-300"
            >
              HWB
            </h2>
            <ColorInput.Hwb
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
          </section>
          <section
            aria-labelledby="color-lch"
            className="grid gap-4 border-t border-t-neutral-400 pt-8 dark:border-t-neutral-700"
          >
            <h2
              id="color-lch"
              className="text-neutral-700 dark:text-neutral-300"
            >
              LCH
            </h2>
            <ColorInput.Lch
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
          </section>
          <section
            aria-labelledby="color-oklch"
            className="grid gap-4 border-t border-t-neutral-400 pt-8 dark:border-t-neutral-700"
          >
            <h2
              id="color-oklch"
              className="text-neutral-700 dark:text-neutral-300"
            >
              OKLCH
            </h2>
            <ColorInput.Oklch
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
          </section>
          <section
            aria-labelledby="color-lab"
            className="grid gap-4 border-t border-t-neutral-400 pt-8 dark:border-t-neutral-700"
          >
            <h2
              id="color-lab"
              className="text-neutral-700 dark:text-neutral-300"
            >
              LAB
            </h2>
            <ColorInput.Lab
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
          </section>
          <section
            aria-labelledby="color-oklab"
            className="grid gap-4 border-t border-t-neutral-400 pt-8 dark:border-t-neutral-700"
          >
            <h2
              id="color-oklab"
              className="text-neutral-700 dark:text-neutral-300"
            >
              OKLAB
            </h2>
            <ColorInput.Oklab
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
          </section>
        </aside>
      )}
    </article>
  );
}

"use client";

import { type ColorStore, parseColor, formatHex } from "~/lib/color";
import ColorInput from "./input";

export default function ColorSlider(props: { state: ColorStore }) {
  const store = props.state;

  return (
    <aside
      aria-label="color input"
      className="mx-auto grid w-full max-w-3xl gap-8 md:content-baseline"
    >
      <section
        aria-labelledby="color-rgb"
        className="grid gap-4 border-t-neutral-400 max-md:border-t max-md:pt-8 dark:border-t-neutral-700"
      >
        <h2 id="color-rgb" className="text-neutral-700 dark:text-neutral-300">
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
        <h2 id="color-hsl" className="text-neutral-700 dark:text-neutral-300">
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
        <h2 id="color-hwb" className="text-neutral-700 dark:text-neutral-300">
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
        <h2 id="color-lch" className="text-neutral-700 dark:text-neutral-300">
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
        <h2 id="color-oklch" className="text-neutral-700 dark:text-neutral-300">
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
        <h2 id="color-lab" className="text-neutral-700 dark:text-neutral-300">
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
        <h2 id="color-oklab" className="text-neutral-700 dark:text-neutral-300">
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
  );
}

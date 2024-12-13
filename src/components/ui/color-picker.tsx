"use client";

import { useColorStore } from "../color/provider";
import { parseColor, formatHex } from "~/lib/color";
import { ColorInput } from "../color";
import clsx from "clsx";

export default function ColorPicker() {
  const store = useColorStore((state) => state);
  const { hex, rgb, hsl, hwb, lab, lch, oklab, oklch, mode } = store;

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

  return (
    <article className="mx-auto grid max-w-3xl gap-y-6 max-md:px-3">
      <header>
        <div role="presentation" className="frame rounded-lg">
          <span style={{ backgroundColor: colorRgb }}></span>
        </div>
        <h1 className="mt-4">
          <code>{colorHex}</code>
        </h1>
        <p
          className={clsx(modeRgb && "text-neutral-800 dark:text-neutral-200")}
        >
          <code>{colorRgb}</code>
        </p>
        <p
          className={clsx(modeHsl && "text-neutral-800 dark:text-neutral-200")}
        >
          <code>{colorHsl}</code>
        </p>
        <p
          className={clsx(modeHwb && "text-neutral-800 dark:text-neutral-200")}
        >
          <code>{colorHwb}</code>
        </p>
        <p
          className={clsx(
            modeLch && "text-neutral-800 dark:text-neutral-200",
            "mt-4",
          )}
        >
          <code>{colorLch}</code>
        </p>
        <p
          className={clsx(
            modeOklch && "text-neutral-800 dark:text-neutral-200",
          )}
        >
          <code>{colorOklch}</code>
        </p>
        <p
          className={clsx(modeLab && "text-neutral-800 dark:text-neutral-200")}
        >
          <code>{colorLab}</code>
        </p>
        <p
          className={clsx(
            modeOklab && "text-neutral-800 dark:text-neutral-200",
          )}
        >
          <code>{colorOklab}</code>
        </p>
        <div role="none" className="mt-6">
          {modeRgb && (
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
          )}
          {modeHsl && (
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
          )}
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
          {modeLch && (
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
          )}
          {modeOklch && (
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
          )}
          {modeLab && (
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
          )}
          {modeOklab && (
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
          )}
        </div>
      </header>
    </article>
  );
}

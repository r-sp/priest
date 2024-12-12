"use client";

import { type ColorStore, parseColor, formatHex } from "~/lib/color";
import ColorInput from "./input";
import clsx from "clsx";

export default function ColorSlider(props: { state: ColorStore }) {
  const store = props.state;

  return (
    <aside
      aria-label="color input"
      className="mx-auto grid w-full max-w-3xl gap-8 md:content-baseline"
    >
      <Section label="RGB" isFirst={true}>
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
      </Section>
      <Section label="HSL">
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
      </Section>
      <Section label="HWB">
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
      </Section>
      <Section label="LCH">
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
      </Section>
      <Section label="OKLCH">
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
      </Section>
      <Section label="LAB">
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
      </Section>
      <Section label="OKLAB">
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
      </Section>
    </aside>
  );
}

function Section(props: {
  children: React.ReactNode;
  label: string;
  isFirst?: boolean;
}) {
  const section = `color-${props.label.toLowerCase()}`;
  const border = props.isFirst ? false : true;

  return (
    <section
      aria-labelledby={section}
      className={clsx(
        "grid gap-4 border-t-neutral-400 dark:border-t-neutral-700",
        border ? "border-t pt-8" : "max-md:border-t max-md:pt-8",
      )}
    >
      <h2 id={section} className="text-neutral-700 dark:text-neutral-300">
        {props.label}
      </h2>
      {props.children}
    </section>
  );
}

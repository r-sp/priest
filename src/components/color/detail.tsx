"use client";

import { useColorStore } from "./provider";
import { initColorDetail, parseHex } from "~/lib/color";

export default function ColorDetail(props: { hex?: string }) {
  const store = useColorStore((state) => state.hex);
  const detail = initColorDetail(props.hex ? parseHex(`#${props.hex}`) : store);

  const colorHex = detail.hex;
  const colorRgb = detail.rgb.css;
  const colorHsl = detail.hsl.css;
  const colorHwb = detail.hwb.css;
  const colorLab = detail.lab.css;
  const colorLch = detail.lch.css;
  const colorOklab = detail.oklab.css;
  const colorOklch = detail.oklch.css;

  return (
    <article className="grid gap-8 px-4 py-8">
      <header className="mx-auto w-full max-w-3xl">
        <span
          role="presentation"
          className="h-svh-1/2 grid rounded-md"
          style={{ backgroundColor: colorRgb }}
        ></span>
        <h1>
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
      </header>
    </article>
  );
}

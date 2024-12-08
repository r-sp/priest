"use client";

import { useColorStore } from "./provider";
import {
  initColorDetail,
  isValidHex,
  isReadable,
  brightness,
  luminance,
  contrast,
} from "~/lib/color";

export default function ColorDetail(props: { hex?: string }) {
  const store = useColorStore((state) => state.hex);
  const detail = initColorDetail(
    props.hex ? isValidHex(`#${props.hex}`) : store,
  );

  const colorHex = detail.hex;
  const colorRgb = detail.rgb.css;
  const colorHsl = detail.hsl.css;
  const colorHwb = detail.hwb.css;
  const colorLab = detail.lab.css;
  const colorLch = detail.lch.css;
  const colorOklab = detail.oklab.css;
  const colorOklch = detail.oklch.css;

  const check = detail.rgb.color;
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
    <article className="grid gap-8 px-4 py-8">
      <header className="mx-auto w-full max-w-3xl">
        <div role="presentation" className="frame rounded-lg">
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
      </header>
    </article>
  );
}

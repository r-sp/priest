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
} from "~/lib/color";

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

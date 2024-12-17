"use client";

import {
  createColor,
  brightness,
  luminance,
  contrast,
  isReadable,
  isValidHex,
} from "~/lib/color";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useColorStore } from "./provider";
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
  const colorBrightness = brightness(check);
  const colorLuminance = luminance(check);

  const [isDark, setIsDark] = useState<boolean>(false);

  const colorWhite = { r: 1, g: 1, b: 1 };
  const whiteContrast = contrast(check, colorWhite);
  const whiteNormalAA = isReadable(check, colorWhite, {
    level: "AA",
    size: "normal",
  })
    ? "Pass"
    : "Fail";
  const whiteNormalAAA = isReadable(check, colorWhite, {
    level: "AAA",
    size: "normal",
  })
    ? "Pass"
    : "Fail";
  const whiteLargeAA = isReadable(check, colorWhite, {
    level: "AA",
    size: "large",
  })
    ? "Pass"
    : "Fail";
  const whiteLargeAAA = isReadable(check, colorWhite, {
    level: "AAA",
    size: "large",
  })
    ? "Pass"
    : "Fail";

  const colorBlack = { r: 0, g: 0, b: 0 };
  const blackContrast = contrast(check, colorBlack);
  const blackNormalAA = isReadable(check, colorBlack, {
    level: "AA",
    size: "normal",
  })
    ? "Pass"
    : "Fail";
  const blackNormalAAA = isReadable(check, colorBlack, {
    level: "AAA",
    size: "normal",
  })
    ? "Pass"
    : "Fail";
  const blackLargeAA = isReadable(check, colorBlack, {
    level: "AA",
    size: "large",
  })
    ? "Pass"
    : "Fail";
  const blackLargeAAA = isReadable(check, colorBlack, {
    level: "AAA",
    size: "large",
  })
    ? "Pass"
    : "Fail";

  return (
    <div className="grid gap-x-4 gap-y-8 px-3 py-4">
      <article className="mx-auto w-full max-w-3xl">
        <Link
          aria-label={`view color ${hex}`}
          href={`/color/${hex.replace("#", "")}/img`}
          className="frame inline-grid w-full rounded-lg"
        >
          <span style={{ backgroundColor: colorRgb }}></span>
        </Link>
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
        <p className="mt-4">
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
        <button
          aria-label={`change contrast background color to ${isDark ? "white" : "black"}`}
          className="mt-4 text-neutral-800 dark:text-neutral-200"
          onClick={() => setIsDark(!isDark)}
        >
          {`Color on ${isDark ? "Black" : "White"}`}
        </button>
        <p>{`Contrast: ${isDark ? blackContrast : whiteContrast}`}</p>
        <p className="mt-2">{`Normal AA: ${isDark ? blackNormalAA : whiteNormalAA}`}</p>
        <p>{`Normal AAA: ${isDark ? blackNormalAAA : whiteNormalAAA}`}</p>
        <p className="mt-2">{`Large AA: ${isDark ? blackLargeAA : whiteLargeAA}`}</p>
        <p>{`Large AAA: ${isDark ? blackLargeAAA : whiteLargeAAA}`}</p>
      </article>
    </div>
  );
}

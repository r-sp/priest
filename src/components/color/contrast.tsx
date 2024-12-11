"use client";

import {
  type RgbColor,
  brightness,
  luminance,
  contrast,
  isReadable,
} from "~/lib/color";

export default function ColorContrast(props: { rgb: RgbColor }) {
  const check = props.rgb;
  const colorBrightness = brightness(check);
  const colorLuminance = luminance(check);
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
    <div className="mt-4">
      <p>Brightness: {colorBrightness}</p>
      <p>Luminance: {colorLuminance}</p>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="inline-grid content-baseline">
          <p className="text-neutral-800 dark:text-neutral-200">
            Color on White
          </p>
          <p>Contrast: {whiteContrast}</p>
          <p className="mt-2">Normal AA: {whiteNormalAA}</p>
          <p>Normal AAA: {whiteNormalAAA}</p>
          <p className="mt-2">Large AA: {whiteLargeAA}</p>
          <p>Large AAA: {whiteLargeAAA}</p>
        </div>
        <div className="inline-grid content-baseline">
          <p className="text-neutral-800 dark:text-neutral-200">
            Color on Black
          </p>
          <p>Contrast: {blackContrast}</p>
          <p className="mt-2">Normal AA: {blackNormalAA}</p>
          <p>Normal AAA: {blackNormalAAA}</p>
          <p className="mt-2">Large AA: {blackLargeAA}</p>
          <p>Large AAA: {blackLargeAAA}</p>
        </div>
      </div>
    </div>
  );
}

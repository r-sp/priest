"use client";

import { createColor, isValidHex } from "~/lib/color";
import { brightness, luminance, inspectColor } from "~/lib/a11y";
import { findColor, nearestColor } from "~/lib/web-colors";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useColorStore } from "~/app/provider";
import Wrapper from "../ui/wrapper";
import Separator from "../ui/separator";
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

  const colorName = findColor(nearestColor(colorHex) || "black");

  const check = rgb.color;
  const colorBrightness = brightness(check);
  const colorLuminance = luminance(check);

  const [isDark, setIsDark] = useState<boolean>(false);

  const colorWhite = { r: 1, g: 1, b: 1 };
  const white = inspectColor(check, colorWhite);
  const whiteContrast = white.ratio;
  const whiteNormalAA = white.normal.aa;
  const whiteNormalAAA = white.normal.aaa;
  const whiteLargeAA = white.large.aa;
  const whiteLargeAAA = white.large.aaa;

  const colorBlack = { r: 0, g: 0, b: 0 };
  const black = inspectColor(check, colorBlack);
  const blackContrast = black.ratio;
  const blackNormalAA = black.normal.aa;
  const blackNormalAAA = black.normal.aaa;
  const blackLargeAA = black.large.aa;
  const blackLargeAAA = black.large.aaa;

  return (
    <Wrapper
      as="article"
      maxWidth="1024"
      className="grid gap-y-4"
      outerStyle="py-2"
    >
      <header className="grid gap-y-3">
        <Link
          aria-label={`view color ${hex}`}
          href={`/color/${hex.replace("#", "")}/img`}
          className="frame inline-grid w-full rounded-lg"
        >
          <span style={{ backgroundColor: colorRgb }}></span>
        </Link>
        <h1 className="text-3xl font-medium text-neutral-800 dark:text-neutral-200">
          <span>{colorName}</span>
        </h1>
      </header>
      <div>
        <p>
          <code>{colorHex}</code>
        </p>
        <p>
          <code>{colorRgb}</code>
        </p>
        <p>
          <code>{colorHsl}</code>
        </p>
        <p>
          <code>{colorHwb}</code>
        </p>
      </div>
      <div>
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
      </div>
      <Separator className="my-4" />
      <div>
        <p>Brightness: {colorBrightness}</p>
        <p>Luminance: {colorLuminance}</p>
      </div>
      <div>
        <button
          aria-label={`change contrast background color to ${isDark ? "white" : "black"}`}
          className="font-medium text-neutral-700 dark:text-neutral-300"
          onClick={() => setIsDark(!isDark)}
        >
          {`Color on ${isDark ? "Black" : "White"}`}
        </button>
        <p>{`Contrast: ${isDark ? blackContrast : whiteContrast}`}</p>
        <p className="mt-2">{`Normal AA: ${isDark ? blackNormalAA : whiteNormalAA}`}</p>
        <p>{`Normal AAA: ${isDark ? blackNormalAAA : whiteNormalAAA}`}</p>
        <p className="mt-2">{`Large AA: ${isDark ? blackLargeAA : whiteLargeAA}`}</p>
        <p>{`Large AAA: ${isDark ? blackLargeAAA : whiteLargeAAA}`}</p>
      </div>
    </Wrapper>
  );
}

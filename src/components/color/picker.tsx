"use client";

import type { AnyColorMode } from "~/lib/types";
import { useColor, useMode } from "~/app/store";
import {
  parseHex,
  parseRgb,
  parseHsl,
  parseHwb,
  parseLab,
  parseLch,
  parseOklab,
  parseOklch,
} from "~/lib/color";
import InputRgb from "./input/rgb";
import InputHsl from "./input/hsl";
import InputHwb from "./input/hwb";
import InputLab from "./input/lab";
import InputLch from "./input/lch";
import InputOklab from "./input/oklab";
import InputOklch from "./input/oklch";

export default function ColorPicker({
  showColorMode = true,
}: {
  showColorMode?: boolean;
}) {
  const [{ rgb, hsl, hwb, lab, lch, oklab, oklch }, setColor] = useColor();
  const [mode] = useMode();

  const modeRgb = mode === "rgb";
  const modeHsl = mode === "hsl";
  const modeHwb = mode === "hwb";
  const modeLab = mode === "lab";
  const modeLch = mode === "lch";
  const modeOklab = mode === "oklab";
  const modeOklch = mode === "oklch";

  const updateColor = (newColor: AnyColorMode) =>
    setColor({
      hex: parseHex(newColor),
      rgb: parseRgb(newColor),
      hsl: parseHsl(newColor),
      hwb: parseHwb(newColor),
      lab: parseLab(newColor),
      lch: parseLch(newColor),
      oklab: parseOklab(newColor),
      oklch: parseOklch(newColor),
    });

  return (
    <div role="none" className="mx-auto inline-grid w-full max-w-3xl gap-4">
      {showColorMode ? (
        <h1 id="color" className="text-neutral-800 dark:text-neutral-200">
          <code>
            {modeRgb
              ? rgb.css
              : modeHsl
                ? hsl.css
                : modeHwb
                  ? hwb.css
                  : modeLab
                    ? lab.css
                    : modeLch
                      ? lch.css
                      : modeOklab
                        ? oklab.css
                        : modeOklch
                          ? oklch.css
                          : oklch.css}
          </code>
        </h1>
      ) : null}
      {modeRgb ? (
        <InputRgb id="color-rgb" onChange={(c) => updateColor(c)} />
      ) : modeHsl ? (
        <InputHsl id="color-hsl" onChange={(c) => updateColor(c)} />
      ) : modeHwb ? (
        <InputHwb id="color-hwb" onChange={(c) => updateColor(c)} />
      ) : modeLch ? (
        <InputLch id="color-lch" onChange={(c) => updateColor(c)} />
      ) : modeOklch ? (
        <InputOklch id="color-oklch" onChange={(c) => updateColor(c)} />
      ) : modeLab ? (
        <InputLab id="color-lab" onChange={(c) => updateColor(c)} />
      ) : modeOklab ? (
        <InputOklab id="color-oklab" onChange={(c) => updateColor(c)} />
      ) : null}
    </div>
  );
}

"use client";

import type { AnyColorMode } from "~/lib/types";
import { useColor, useMode } from "~/hooks";
import {
  parseRgb,
  parseHsl,
  parseHwb,
  parseLab,
  parseLch,
  parseOklab,
  parseOklch,
} from "~/lib/color";
import InputRgb from "./color/rgb";
import InputHsl from "./color/hsl";
import InputHwb from "./color/hwb";
import InputLab from "./color/lab";
import InputLch from "./color/lch";
import InputOklab from "./color/oklab";
import InputOklch from "./color/oklch";

export default function Slider({
  dynamicPreview = true,
}: {
  dynamicPreview?: boolean;
}) {
  const [{}, setColor] = useColor();
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
      rgb: parseRgb(newColor),
      hsl: parseHsl(newColor),
      hwb: parseHwb(newColor),
      lab: parseLab(newColor),
      lch: parseLch(newColor),
      oklab: parseOklab(newColor),
      oklch: parseOklch(newColor),
    });

  return (
    <div role="group" aria-label="color slider" className="grid gap-4">
      {modeRgb ? (
        <InputRgb
          dynamicPreview={dynamicPreview}
          onChange={(c) => updateColor(c)}
        />
      ) : modeHsl ? (
        <InputHsl
          dynamicPreview={dynamicPreview}
          onChange={(c) => updateColor(c)}
        />
      ) : modeHwb ? (
        <InputHwb
          dynamicPreview={dynamicPreview}
          onChange={(c) => updateColor(c)}
        />
      ) : modeLch ? (
        <InputLch
          dynamicPreview={dynamicPreview}
          onChange={(c) => updateColor(c)}
        />
      ) : modeOklch ? (
        <InputOklch
          dynamicPreview={dynamicPreview}
          onChange={(c) => updateColor(c)}
        />
      ) : modeLab ? (
        <InputLab
          dynamicPreview={dynamicPreview}
          onChange={(c) => updateColor(c)}
        />
      ) : modeOklab ? (
        <InputOklab
          dynamicPreview={dynamicPreview}
          onChange={(c) => updateColor(c)}
        />
      ) : null}
    </div>
  );
}

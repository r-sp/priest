"use client";

import type { AnyColorMode } from "~/lib/types";
import { useColorStore, useMode } from "~/hooks";
import {
  parseRgb,
  parseHsl,
  parseHwb,
  parseLab,
  parseLch,
  parseOklab,
  parseOklch,
} from "~/lib";
import {
  InputRgb,
  InputHsl,
  InputHwb,
  InputLab,
  InputLch,
  InputOklab,
  InputOklch,
} from "~/features";

export default function ColorInput({
  dynamicPreview = true,
}: {
  dynamicPreview?: boolean;
}) {
  const setColor = useColorStore((state) => state.setColor);
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
    <div role="group" aria-label="color slider" className="grid gap-y-3">
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

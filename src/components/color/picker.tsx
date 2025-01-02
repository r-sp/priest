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
import ColorInput from "./input";
import InputRgb from "./model/rgb";
import InputHsl from "./model/hsl";
import InputHwb from "./model/hwb";
import InputLab from "./model/lab";
import InputLch from "./model/lch";
import InputOklab from "./model/oklab";
import InputOklch from "./model/oklch";

export default function ColorPicker({
  showTextbox = true,
  dynamicPreview = true,
}: {
  showTextbox?: boolean;
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
    <div
      role="form"
      aria-label="color input"
      className="mx-auto inline-grid w-full max-w-3xl gap-4"
    >
      {showTextbox ? <ColorInput /> : null}
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

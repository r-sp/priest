"use client";

import { useColorStore, useMode } from "~/hooks";
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
  const [{ rgb, hsl, hwb, lab, lch, oklab, oklch }, setColor] = useColorStore();
  const [mode] = useMode();

  const modeHex = mode === "hex";
  const modeRgb = mode === "rgb";
  const modeHsl = mode === "hsl";
  const modeHwb = mode === "hwb";
  const modeLab = mode === "lab";
  const modeLch = mode === "lch";
  const modeOklab = mode === "oklab";
  const modeOklch = mode === "oklch";

  return (
    <div role="group" aria-label="color slider" className="grid gap-y-3">
      {modeHex || modeRgb ? (
        <InputRgb
          color={rgb.color}
          action={setColor}
          dynamicPreview={dynamicPreview}
        />
      ) : modeHsl ? (
        <InputHsl
          color={hsl.color}
          action={setColor}
          dynamicPreview={dynamicPreview}
        />
      ) : modeHwb ? (
        <InputHwb
          color={hwb.color}
          action={setColor}
          dynamicPreview={dynamicPreview}
        />
      ) : modeLch ? (
        <InputLch
          color={lch.color}
          action={setColor}
          dynamicPreview={dynamicPreview}
        />
      ) : modeOklch ? (
        <InputOklch
          color={oklch.color}
          action={setColor}
          dynamicPreview={dynamicPreview}
        />
      ) : modeLab ? (
        <InputLab
          color={lab.color}
          action={setColor}
          dynamicPreview={dynamicPreview}
        />
      ) : modeOklab ? (
        <InputOklab
          color={oklab.color}
          action={setColor}
          dynamicPreview={dynamicPreview}
        />
      ) : null}
    </div>
  );
}

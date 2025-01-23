"use client";

import type { AnyColorMode, ColorState, ColorMode } from "~/lib/color";
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
  color,
  mode,
  action,
  dynamicPreview = true,
  prefix = "slider",
  label = "color slider",
}: {
  color: ColorState;
  mode: ColorMode;
  action: (state: AnyColorMode) => void;
  dynamicPreview?: boolean;
  prefix?: string;
  label?: string;
}) {
  const { rgb, hsl, hwb, lab, lch, oklab, oklch } = color;

  const modeHex = mode === "hex";
  const modeRgb = mode === "rgb";
  const modeHsl = mode === "hsl";
  const modeHwb = mode === "hwb";
  const modeLab = mode === "lab";
  const modeLch = mode === "lch";
  const modeOklab = mode === "oklab";
  const modeOklch = mode === "oklch";

  return (
    <div role="group" aria-label={label} className="grid gap-y-3">
      {modeHex || modeRgb ? (
        <InputRgb
          color={rgb.color}
          action={action}
          dynamicPreview={dynamicPreview}
          prefix={`${prefix}-rgb`}
        />
      ) : modeHsl ? (
        <InputHsl
          color={hsl.color}
          action={action}
          dynamicPreview={dynamicPreview}
          prefix={`${prefix}-hsl`}
        />
      ) : modeHwb ? (
        <InputHwb
          color={hwb.color}
          action={action}
          dynamicPreview={dynamicPreview}
          prefix={`${prefix}-hwb`}
        />
      ) : modeLch ? (
        <InputLch
          color={lch.color}
          action={action}
          dynamicPreview={dynamicPreview}
          prefix={`${prefix}-lch`}
        />
      ) : modeOklch ? (
        <InputOklch
          color={oklch.color}
          action={action}
          dynamicPreview={dynamicPreview}
          prefix={`${prefix}-oklch`}
        />
      ) : modeLab ? (
        <InputLab
          color={lab.color}
          action={action}
          dynamicPreview={dynamicPreview}
          prefix={`${prefix}-lab`}
        />
      ) : modeOklab ? (
        <InputOklab
          color={oklab.color}
          action={action}
          dynamicPreview={dynamicPreview}
          prefix={`${prefix}-oklab`}
        />
      ) : null}
    </div>
  );
}

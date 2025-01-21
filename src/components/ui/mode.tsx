"use client";

import type { AnyColorMode, ColorState, ColorMode } from "~/lib/types";
import { useCallback } from "react";
import { Chip } from "~/components";

export default function ColorMode({
  color,
  mode,
  action,
}: {
  color: ColorState;
  mode: ColorMode;
  action: (state: AnyColorMode, target?: ColorMode) => void;
}) {
  const { rgb, hsl, hwb, lab, lch, oklab, oklch } = color;

  const updateColor = useCallback(
    (newColor: AnyColorMode, mode?: ColorMode) => action(newColor, mode),
    [action],
  );

  return (
    <div role="none" className="relative block h-7">
      <div className="no-scrollbar absolute -right-4 -left-4 -my-2 grid overflow-x-auto px-4 py-2 whitespace-nowrap">
        <fieldset
          role="radiogroup"
          aria-label="color mode"
          className="flex flex-nowrap items-center gap-3 font-mono text-sm font-medium select-none"
        >
          <div className="inline-flex">
            <Chip
              prefix="hex"
              label="HEX"
              group="mode"
              isActive={mode === "hex"}
              onChange={() => updateColor({ mode: "rgb", ...rgb.color }, "hex")}
            />
          </div>
          <div className="inline-flex">
            <Chip
              prefix="rgb"
              label="RGB"
              group="mode"
              isActive={mode === "rgb"}
              onChange={() => updateColor({ mode: "rgb", ...rgb.color })}
            />
          </div>
          <div className="inline-flex">
            <Chip
              prefix="hsl"
              label="HSL"
              group="mode"
              isActive={mode === "hsl"}
              onChange={() => updateColor({ mode: "hsl", ...hsl.color })}
            />
          </div>
          <div className="inline-flex">
            <Chip
              prefix="hwb"
              label="HWB"
              group="mode"
              isActive={mode === "hwb"}
              onChange={() => updateColor({ mode: "hwb", ...hwb.color })}
            />
          </div>
          <div className="inline-flex">
            <Chip
              prefix="lch"
              label="LCH"
              group="mode"
              isActive={mode === "lch"}
              onChange={() => updateColor({ mode: "lch", ...lch.color })}
            />
          </div>
          <div className="inline-flex">
            <Chip
              prefix="oklch"
              label="OKLCH"
              group="mode"
              isActive={mode === "oklch"}
              onChange={() => updateColor({ mode: "oklch", ...oklch.color })}
            />
          </div>
          <div className="inline-flex">
            <Chip
              prefix="lab"
              label="LAB"
              group="mode"
              isActive={mode === "lab"}
              onChange={() => updateColor({ mode: "lab", ...lab.color })}
            />
          </div>
          <div className="inline-flex">
            <Chip
              prefix="oklab"
              label="OKLAB"
              group="mode"
              isActive={mode === "oklab"}
              onChange={() => updateColor({ mode: "oklab", ...oklab.color })}
            />
          </div>
        </fieldset>
      </div>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-2 -bottom-2 -left-4 z-1 w-4 bg-linear-to-r from-gray-50 to-gray-950/0 dark:from-gray-950"
      ></span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-2 -right-4 -bottom-2 z-1 w-4 bg-linear-to-l from-gray-50 to-gray-950/0 dark:from-gray-950"
      ></span>
    </div>
  );
}

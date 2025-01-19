"use client";

import { useMode } from "~/hooks";
import { Chip } from "~/components";

export default function ColorMode() {
  const [mode, setMode] = useMode();

  return (
    <div
      role="none"
      className="no-scrollbar -mx-4 -my-2 grid overflow-x-auto px-4 py-2 whitespace-nowrap"
    >
      <fieldset
        role="radiogroup"
        aria-label="color mode"
        className="flex flex-nowrap items-center gap-3 font-mono text-sm font-medium select-none"
      >
        <div className="inline-flex">
          <Chip
            prefix="rgb"
            label="RGB"
            group="mode"
            isActive={mode === "rgb"}
            onChange={() => setMode("rgb")}
          />
        </div>
        <div className="inline-flex">
          <Chip
            prefix="hsl"
            label="HSL"
            group="mode"
            isActive={mode === "hsl"}
            onChange={() => setMode("hsl")}
          />
        </div>
        <div className="inline-flex">
          <Chip
            prefix="hwb"
            label="HWB"
            group="mode"
            isActive={mode === "hwb"}
            onChange={() => setMode("hwb")}
          />
        </div>
        <div className="inline-flex">
          <Chip
            prefix="lch"
            label="LCH"
            group="mode"
            isActive={mode === "lch"}
            onChange={() => setMode("lch")}
          />
        </div>
        <div className="inline-flex">
          <Chip
            prefix="oklch"
            label="OKLCH"
            group="mode"
            isActive={mode === "oklch"}
            onChange={() => setMode("oklch")}
          />
        </div>
        <div className="inline-flex">
          <Chip
            prefix="lab"
            label="LAB"
            group="mode"
            isActive={mode === "lab"}
            onChange={() => setMode("lab")}
          />
        </div>
        <div className="inline-flex">
          <Chip
            prefix="oklab"
            label="OKLAB"
            group="mode"
            isActive={mode === "oklab"}
            onChange={() => setMode("oklab")}
          />
        </div>
      </fieldset>
    </div>
  );
}

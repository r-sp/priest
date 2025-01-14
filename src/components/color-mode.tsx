"use client";

import { useMode } from "~/hooks";
import Chip from "./chip";

export default function ColorMode() {
  const [mode, setMode] = useMode();

  return (
    <fieldset role="radiogroup" className="grid">
      <legend className="inline-grid text-gray-600 dark:text-gray-400">
        Select color mode:
      </legend>
      <div className="mt-4 flex flex-wrap gap-3 font-mono text-sm font-medium select-none">
        <div className="inline-flex flex-col">
          <Chip
            prefix="rgb"
            label="RGB"
            group="mode"
            isActive={mode === "rgb"}
            onChange={() => setMode("rgb")}
          />
        </div>
        <div className="inline-flex flex-col">
          <Chip
            prefix="hsl"
            label="HSL"
            group="mode"
            isActive={mode === "hsl"}
            onChange={() => setMode("hsl")}
          />
        </div>
        <div className="inline-flex flex-col">
          <Chip
            prefix="hwb"
            label="HWB"
            group="mode"
            isActive={mode === "hwb"}
            onChange={() => setMode("hwb")}
          />
        </div>
        <div className="inline-flex flex-col">
          <Chip
            prefix="lch"
            label="LCH"
            group="mode"
            isActive={mode === "lch"}
            onChange={() => setMode("lch")}
          />
        </div>
        <div className="inline-flex flex-col">
          <Chip
            prefix="oklch"
            label="OKLCH"
            group="mode"
            isActive={mode === "oklch"}
            onChange={() => setMode("oklch")}
          />
        </div>
        <div className="inline-flex flex-col">
          <Chip
            prefix="lab"
            label="LAB"
            group="mode"
            isActive={mode === "lab"}
            onChange={() => setMode("lab")}
          />
        </div>
        <div className="inline-flex flex-col">
          <Chip
            prefix="oklab"
            label="OKLAB"
            group="mode"
            isActive={mode === "oklab"}
            onChange={() => setMode("oklab")}
          />
        </div>
      </div>
    </fieldset>
  );
}

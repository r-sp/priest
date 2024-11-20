"use client";

import { useColorProvider } from "../provider";

export default function ColorHsl() {
  const { hsl, setHsl } = useColorProvider();

  const updateHsl = (newColor: Partial<typeof hsl>) => setHsl({ ...hsl, ...newColor });

  return (
    <div
      role="toolbar"
      aria-orientation="vertical"
      aria-label="HSLA color input"
      className="input-hsl flex flex-row gap-4 max-sm:justify-between"
    >
      <div className="inline-flex w-1/4 flex-col gap-2">
        <label htmlFor="input-hsl-hue" className="text-sm font-medium text-holy-300">
          Hue
        </label>
        <input
          type="number"
          name="hsl"
          id="input-hsl-hue"
          min={0}
          max={360}
          value={hsl.h}
          className="rounded-md bg-holy-800 px-2 py-1 font-mono text-base font-normal text-holy-100"
          onChange={(e) => updateHsl({ h: e.target.valueAsNumber })}
        />
      </div>
      <div className="inline-flex w-1/4 flex-col gap-2">
        <label htmlFor="input-hsl-saturation" className="text-sm font-normal text-holy-300">
          Saturation
        </label>
        <input
          type="number"
          name="hsl"
          id="input-hsl-saturation"
          min={0}
          max={100}
          value={hsl.s}
          className="rounded-md bg-holy-800 px-2 py-1 font-mono text-base font-normal text-holy-100"
          onChange={(e) => updateHsl({ s: e.target.valueAsNumber })}
        />
      </div>
      <div className="inline-flex w-1/4 flex-col gap-2">
        <label htmlFor="input-hsl-lightness" className="text-sm font-normal text-holy-200">
          Lightness
        </label>
        <input
          type="number"
          name="hsl"
          id="input-hsl-lightness"
          min={0}
          max={100}
          value={hsl.l}
          className="rounded-md bg-holy-800 px-2 py-1 font-mono text-base font-normal text-holy-100"
          onChange={(e) => updateHsl({ l: e.target.valueAsNumber })}
        />
      </div>
      <div className="inline-flex w-1/4 flex-col gap-2">
        <label htmlFor="input-hsl-alpha" className="text-sm font-normal text-holy-200">
          Alpha
        </label>
        <input
          type="number"
          name="hsl"
          id="input-hsl-alpha"
          min={0}
          max={1}
          step={0.01}
          value={hsl.a}
          className="rounded-md bg-holy-800 px-2 py-1 font-mono text-base font-normal text-holy-100"
          onChange={(e) => updateHsl({ a: e.target.valueAsNumber })}
        />
      </div>
    </div>
  );
}

"use client";

import { useColorProvider } from "../provider";

export default function ColorRgb() {
  const { rgb, setRgb } = useColorProvider();

  const updateRgb = (newColor: Partial<typeof rgb>) => setRgb({ ...rgb, ...newColor });

  return (
    <div
      role="toolbar"
      aria-orientation="vertical"
      aria-label="RGBA color input"
      className="input-rgb flex flex-row gap-4 max-sm:justify-between"
    >
      <div className="inline-flex w-1/4 flex-col gap-2">
        <label htmlFor="input-rgb-red" className="text-sm font-medium text-holy-300">
          Red
        </label>
        <input
          type="number"
          name="rgb"
          id="input-rgb-red"
          min={0}
          max={255}
          value={rgb.r}
          className="rounded-md bg-holy-800 px-2 py-1 font-mono text-base font-normal text-holy-100"
          onChange={(e) => updateRgb({ r: e.target.valueAsNumber })}
        />
      </div>
      <div className="inline-flex w-1/4 flex-col gap-2">
        <label htmlFor="input-rgb-green" className="text-sm font-medium text-holy-300">
          Green
        </label>
        <input
          type="number"
          name="rgb"
          id="input-rgb-green"
          min={0}
          max={255}
          value={rgb.g}
          className="rounded-md bg-holy-800 px-2 py-1 font-mono text-base font-normal text-holy-100"
          onChange={(e) => updateRgb({ g: e.target.valueAsNumber })}
        />
      </div>
      <div className="inline-flex w-1/4 flex-col gap-2">
        <label htmlFor="input-rgb-blue" className="text-sm font-medium text-holy-300">
          Blue
        </label>
        <input
          type="number"
          name="rgb"
          id="input-rgb-blue"
          min={0}
          max={255}
          value={rgb.b}
          className="rounded-md bg-holy-800 px-2 py-1 font-mono text-base font-normal text-holy-100"
          onChange={(e) => updateRgb({ b: e.target.valueAsNumber })}
        />
      </div>
      <div className="inline-flex w-1/4 flex-col gap-2">
        <label htmlFor="input-rgb-alpha" className="text-sm font-medium text-holy-300">
          Alpha
        </label>
        <input
          type="number"
          name="rgb"
          id="input-rgb-alpha"
          min={0}
          max={1}
          step={0.01}
          value={rgb.a}
          className="rounded-md bg-holy-800 px-2 py-1 font-mono text-base font-normal text-holy-100"
          onChange={(e) => updateRgb({ a: e.target.valueAsNumber })}
        />
      </div>
    </div>
  );
}

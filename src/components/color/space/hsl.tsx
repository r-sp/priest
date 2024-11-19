"use client";

import { create } from "zustand";
import { type ColorHslProps } from "../types";

type ColorSpace = {
  hsl: ColorHslProps["raw"];
};
type ColorAction = {
  setHsl: (newColor: ColorSpace["hsl"] | ((currentColor: ColorSpace["hsl"]) => ColorSpace["hsl"])) => void;
};
type ColorState = ColorSpace & ColorAction;

const useColorState = (initValue: ColorSpace) => {
  return create<ColorState>()((set) => ({
    ...initValue,
    setHsl: (newColor) =>
      set((state) => ({
        hsl: typeof newColor === "function" ? newColor(state.hsl) : newColor,
      })),
  }));
};

export default function ColorHsl({ raw, action }: ColorHslProps) {
  const { hsl, setHsl } = useColorState({ hsl: raw })((state) => state);

  const updateHsl = (value: Partial<typeof raw>) =>
    setHsl((currentColor) => {
      const newColor = { ...currentColor, ...value };

      action(newColor);
      return newColor;
    });

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
          className="font-mono rounded-md bg-holy-800 px-2 py-1 text-base font-normal text-holy-100"
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
          className="font-mono rounded-md bg-holy-800 px-2 py-1 text-base font-normal text-holy-100"
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
          className="font-mono rounded-md bg-holy-800 px-2 py-1 text-base font-normal text-holy-100"
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
          className="font-mono rounded-md bg-holy-800 px-2 py-1 text-base font-normal text-holy-100"
          onChange={(e) => updateHsl({ a: e.target.valueAsNumber })}
        />
      </div>
    </div>
  );
}

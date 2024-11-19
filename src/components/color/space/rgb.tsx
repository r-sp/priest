"use client";

import { create } from "zustand";
import { type ColorRgbProps } from "../types";

type ColorSpace = {
  rgb: ColorRgbProps["raw"];
};
type ColorAction = {
  setRgb: (newColor: ColorSpace["rgb"] | ((currentColor: ColorSpace["rgb"]) => ColorSpace["rgb"])) => void;
};
type ColorState = ColorSpace & ColorAction;

const useColorState = (initValue: ColorSpace) => {
  return create<ColorState>()((set) => ({
    ...initValue,
    setRgb: (newColor) =>
      set((state) => ({
        rgb: typeof newColor === "function" ? newColor(state.rgb) : newColor,
      })),
  }));
};

export default function ColorRgb({ raw, action }: ColorRgbProps) {
  const { rgb, setRgb } = useColorState({ rgb: raw })((state) => state);

  const updateRgb = (value: Partial<typeof raw>) =>
    setRgb((currentColor) => {
      const newColor = { ...currentColor, ...value };

      action(newColor);
      return newColor;
    });

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
          className="font-mono rounded-md bg-holy-800 px-2 py-1 text-base font-normal text-holy-100"
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
          className="font-mono rounded-md bg-holy-800 px-2 py-1 text-base font-normal text-holy-100"
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
          className="font-mono rounded-md bg-holy-800 px-2 py-1 text-base font-normal text-holy-100"
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
          className="font-mono rounded-md bg-holy-800 px-2 py-1 text-base font-normal text-holy-100"
          onChange={(e) => updateRgb({ a: e.target.valueAsNumber })}
        />
      </div>
    </div>
  );
}

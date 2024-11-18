"use client";

import { create } from "zustand";
import { useColor as getColor } from "~/lib/color";
import { type ColorToolkitProps } from "./types";
import Input from "./input";

type ColorState = ColorToolkitProps["color"];

type ColorActions = {
  setHex: (newColor: ColorState["hex"] | ((currentColor: ColorState["hex"]) => ColorState["hex"])) => void;
  setHsl: (newColor: ColorState["hsl"] | ((currentColor: ColorState["hsl"]) => ColorState["hsl"])) => void;
  setRgb: (newColor: ColorState["rgb"] | ((currentColor: ColorState["rgb"]) => ColorState["rgb"])) => void;
};

type ColorStore = ColorState & ColorActions;

const useColorStore = (initValue: ColorState) => {
  return create<ColorStore>()((set) => ({
    ...initValue,
    setHex: (newColor) =>
      set((state) => ({
        hex: typeof newColor === "function" ? newColor(state.hex) : newColor,
      })),
    setHsl: (newColor) =>
      set((state) => ({
        hsl: typeof newColor === "function" ? newColor(state.hsl) : newColor,
      })),
    setRgb: (newColor) =>
      set((state) => ({
        rgb: typeof newColor === "function" ? newColor(state.rgb) : newColor,
      })),
  }));
};

export default function Toolkit({ color, action }: ColorToolkitProps) {
  const { hex, hsl, rgb, setHex, setHsl, setRgb } = useColorStore(color)((state) => state);

  const updateHex = (value: string) => {
    const currentColor = getColor(value);
    const isValidColor = currentColor.isValid();

    if (isValidColor) {
      setHex(value);
      action(currentColor.minify({ alphaHex: true }));
    }
    return value;
  };

  const updateHsl = (value: Partial<typeof color.hsl>) =>
    setHsl((currentColor) => {
      const newColor = { ...currentColor, ...value };

      action(newColor);
      return newColor;
    });

  const updateRgb = (value: Partial<typeof color.rgb>) =>
    setRgb((currentColor) => {
      const newColor = { ...currentColor, ...value };

      action(newColor);
      return newColor;
    });

  return (
    <div className="inline-grid gap-8 xs:max-w-sm">
      <div className="input-hex">
        <label htmlFor="hex" className="sr-only">
          Hex
        </label>
        <Input
          type="text"
          name="hex"
          id="hex"
          autoCorrect="false"
          autoComplete="false"
          value={hex}
          update={(e) => updateHex(e.target.value)}
          leave={(e) => {
            if (hex !== e.target.value) {
              e.target.value = hex;
            }
          }}
          className="bg-holy-900 text-xl font-medium text-holy-200"
        />
      </div>
      <div className="input-hsl flex flex-row gap-4 max-sm:justify-between">
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
            className="rounded-md bg-holy-800 px-2 py-1 text-base font-normal text-holy-100"
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
            className="rounded-md bg-holy-800 px-2 py-1 text-base font-normal text-holy-100"
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
            className="rounded-md bg-holy-800 px-2 py-1 text-base font-normal text-holy-100"
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
            className="rounded-md bg-holy-800 px-2 py-1 text-base font-normal text-holy-100"
            onChange={(e) => updateHsl({ a: e.target.valueAsNumber })}
          />
        </div>
      </div>
      <div className="input-rgb flex flex-row gap-4 max-sm:justify-between">
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
            className="rounded-md bg-holy-800 px-2 py-1 text-base font-normal text-holy-100"
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
            className="rounded-md bg-holy-800 px-2 py-1 text-base font-normal text-holy-100"
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
            className="rounded-md bg-holy-800 px-2 py-1 text-base font-normal text-holy-100"
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
            className="rounded-md bg-holy-800 px-2 py-1 text-base font-normal text-holy-100"
            onChange={(e) => updateRgb({ a: e.target.valueAsNumber })}
          />
        </div>
      </div>
    </div>
  );
}

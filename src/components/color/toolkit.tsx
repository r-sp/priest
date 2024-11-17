"use client";

import { create } from "zustand";
import { useColor as getColor } from "~/lib/color";
import type { Dispatch, SetStateAction } from "react";
import type { AnyColor, HslaColor } from "~/lib/types";
import ColorInput from "./input";

type ColorState = {
  hex: string;
  rgb: string;
  raw: HslaColor;
};

type ColorActions = {
  setHex: (newColor: ColorState["hex"] | ((currentColor: ColorState["hex"]) => ColorState["hex"])) => void;
  setRaw: (newColor: ColorState["raw"] | ((currentColor: ColorState["raw"]) => ColorState["raw"])) => void;
};

type ColorStore = ColorState & ColorActions;

const useColorStore = (initValue: ColorState) => {
  return create<ColorStore>()((set) => ({
    ...initValue,
    setHex: (newColor) =>
      set((state) => ({
        hex: typeof newColor === "function" ? newColor(state.hex) : newColor,
      })),
    setRaw: (newColor) =>
      set((state) => ({
        raw: typeof newColor === "function" ? newColor(state.raw) : newColor,
      })),
  }));
};

export default function ColorToolkit(props: { color: ColorState; action: Dispatch<SetStateAction<AnyColor>> }) {
  const { hex, raw, setHex, setRaw } = useColorStore(props.color)((state) => state);

  const updateHex = (color: string) => {
    const currentColor = getColor(color);
    const isValidColor = currentColor.isValid();

    if (isValidColor) {
      setHex(color);
      props.action(currentColor.minify({ alphaHex: true }));
    }
    return color;
  };

  const updateHsl = (hsl: HslaColor) => {
    props.action(hsl);
    return hsl;
  };
  const updateHue = (hue: number) => setRaw((currentColor) => updateHsl({ ...currentColor, h: hue }));
  const updateSaturation = (saturation: number) => setRaw((currentColor) => updateHsl({ ...currentColor, s: saturation }));
  const updateLightness = (lightness: number) => setRaw((currentColor) => updateHsl({ ...currentColor, l: lightness }));
  const updateAlpha = (alpha: number) => setRaw((currentColor) => updateHsl({ ...currentColor, a: alpha }));

  return (
    <div>
      <div className="hex">
        <label htmlFor="hex">Hex</label>
        <ColorInput
          type="text"
          name="hex"
          id="hex"
          autoCorrect="false"
          autoComplete="false"
          value={hex}
          update={(e) => updateHex(e.target.value)}
        />
      </div>
      <div className="hue">
        <label htmlFor="hue">Hue</label>
        <input
          type="number"
          name="hsl"
          id="hue"
          min={0}
          max={360}
          value={raw.h}
          onChange={(e) => updateHue(e.target.valueAsNumber)}
        />
      </div>
      <div className="saturation">
        <label htmlFor="saturation">Saturation</label>
        <input
          type="number"
          name="hsl"
          id="saturation"
          min={0}
          max={100}
          value={raw.s}
          onChange={(e) => updateSaturation(e.target.valueAsNumber)}
        />
      </div>
      <div className="lightness">
        <label htmlFor="lightness">Lightness</label>
        <input
          type="number"
          name="hsl"
          id="lightness"
          min={0}
          max={100}
          value={raw.l}
          onChange={(e) => updateLightness(e.target.valueAsNumber)}
        />
      </div>
      <div className="alpha">
        <label htmlFor="alpha">Alpha</label>
        <input
          type="number"
          name="hsl"
          id="alpha"
          min={0}
          max={1}
          step={0.01}
          value={raw.a}
          onChange={(e) => updateAlpha(e.target.valueAsNumber)}
        />
      </div>
    </div>
  );
}

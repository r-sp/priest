"use client";

import { create } from "zustand";
import { convertColor } from "~/lib/color";
import { type ColorHexProps } from "../types";
import Input from "../input";

type ColorSpace = {
  hex: string;
};
type ColorAction = {
  setHex: (newColor: ColorSpace["hex"] | ((currentColor: ColorSpace["hex"]) => ColorSpace["hex"])) => void;
};
type ColorState = ColorSpace & ColorAction;

const useColorState = (initValue: ColorSpace) => {
  return create<ColorState>()((set) => ({
    ...initValue,
    setHex: (newColor) =>
      set((state) => ({
        hex: typeof newColor === "function" ? newColor(state.hex) : newColor,
      })),
  }));
};

export default function ColorHex({ raw, action }: ColorHexProps) {
  const { hex, setHex } = useColorState({ hex: raw })((state) => state);

  const updateHex = (value: string) => {
    const currentColor = convertColor(value);
    const isValidColor = currentColor.isValid();

    if (isValidColor) {
      setHex(value);
      action(currentColor.minify({ alphaHex: true }));
    }
    return value;
  };

  return (
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
        className="font-mono bg-holy-900 text-2xl font-medium text-holy-200 outline-0"
      />
    </div>
  );
}

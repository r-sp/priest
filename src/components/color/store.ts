import { createStore } from "zustand";
import { getRandomColor } from "~/lib/color";
import type { ColorSpace, ColorAction } from "~/lib/types";

export type ColorState = ColorSpace & ColorAction;

export function createColorStore(initValue: ColorSpace) {
  return createStore<ColorState>()((set) => ({
    ...initValue,
    update: (newColor) =>
      set((state) => ({
        ...state,
        ...newColor,
      })),
  }));
}

export const initColorStore = () => {
  const color = getRandomColor();

  return {
    raw: color.toRgb(),
    hex: color.toHex(),
    hsl: color.toHsl(),
    hsv: color.toHsv(),
    rgb: color.toRgb(),
  };
};

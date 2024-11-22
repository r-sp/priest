import { createStore } from "zustand";
import type { ColorSpace, ColorAction } from "~/lib/types";

type ColorState = ColorSpace & ColorAction;

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

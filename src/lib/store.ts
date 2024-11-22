import type { ColorSpace, ColorAction } from "~/lib/types";
import { createStore } from "zustand";

export function createColorStore(initValue: ColorSpace) {
  return createStore<ColorSpace & ColorAction>()((set) => ({
    ...initValue,
    update: (newColor) =>
      set((state) => ({
        ...state,
        ...newColor,
      })),
  }));
}

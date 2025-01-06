import type { ThemeVariant, ColorFormat, ComposeColor } from "~/lib/types";
import { createStore } from "zustand";
import { createContext } from "react";

export type SharedState = {
  theme: ThemeVariant | undefined;
  mode: ColorFormat;
  gamut: boolean;
};
export type SharedAction = {
  setTheme: (variant: ThemeVariant) => void;
  setMode: (format: ColorFormat) => void;
  setGamut: (p3: boolean) => void;
};

export type ColorState = {
  rgb: ComposeColor<"rgb">;
  hsl: ComposeColor<"hsl">;
  hwb: ComposeColor<"hwb">;
  lab: ComposeColor<"lab">;
  lch: ComposeColor<"lch">;
  oklab: ComposeColor<"oklab">;
  oklch: ComposeColor<"oklch">;
};
export type ColorAction = {
  setColor: (state: ColorState) => void;
};

export type SharedStore = SharedState & SharedAction;
export function createSharedStore(initValue: SharedState) {
  return createStore<SharedStore>()((set) => ({
    ...initValue,
    setTheme: (variant) => set(() => ({ theme: variant })),
    setMode: (format) => set(() => ({ mode: format })),
    setGamut: (p3) => set(() => ({ gamut: p3 })),
  }));
}

export type ColorStore = ColorState & ColorAction;
export function createColorStore(initValue: ColorState) {
  return createStore<ColorStore>()((set) => ({
    ...initValue,
    setColor: (state) => set((prev) => ({ ...prev, ...state })),
  }));
}

export type SharedApi = ReturnType<typeof createSharedStore>;
export const SharedContext = createContext<SharedApi | undefined>(undefined);

export type ColorApi = ReturnType<typeof createColorStore>;
export const ColorContext = createContext<ColorApi | undefined>(undefined);

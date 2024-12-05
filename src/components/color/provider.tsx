"use client";

import { type ColorStore, createColorStore } from "~/lib/color";
import { createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

type ColorApi = ReturnType<typeof createColorStore>;

const ColorContext = createContext<ColorApi | undefined>(undefined);

export function ColorProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<ColorApi>();

  if (!storeRef.current) {
    storeRef.current = createColorStore({
      rgb: {
        color: { r: 0.457, g: 0.927, b: 0.456 },
        css: "rgb(117, 236, 116)",
      },
      hsl: {
        color: { h: 119.5, s: 0.7595, l: 0.6902 },
        css: "hsl(119.5, 75.95%, 69.02%)",
      },
      lab: {
        color: { l: 85, a: -52.74, b: 46.91 },
        css: "lab(85 -52.74 46.91)",
      },
      lch: {
        color: { l: 85, c: 69.47, h: 138.42 },
        css: "lch(85 69.47 138.42)",
      },
      oklab: {
        color: { l: 0.85, a: -0.15, b: 0.11 },
        css: "oklab(0.85 -0.15 0.11)",
      },
      oklch: {
        color: { l: 0.85, c: 0.19, h: 143.48 },
        css: "oklch(0.85 0.19 143.48)",
      },
    });
  }

  return (
    <ColorContext.Provider value={storeRef.current}>
      {children}
    </ColorContext.Provider>
  );
}

export function useColorStore<T>(selector: (store: ColorStore) => T) {
  const colorContext = useContext(ColorContext);

  if (!colorContext) {
    throw new Error("useColorStore must be used within ColorProvider");
  }

  return useStore(colorContext, selector);
}

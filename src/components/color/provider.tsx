"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import type { ColorSpace, ColorAction } from "~/lib/types";
import { convertColor } from "~/lib/color";
import { createColorStore } from "./store";
import { useStore } from "zustand";

type ColorState = ColorSpace & ColorAction;

export type ColorApi = ReturnType<typeof createColorStore>;

export const ColorContext = createContext<ColorApi | undefined>(undefined);

export function ColorProvider({ children, initValue }: { children: ReactNode; initValue: ColorSpace }) {
  const storeRef = useRef<ColorApi>();

  if (!storeRef.current) {
    storeRef.current = createColorStore(initValue);
  }

  return <ColorContext.Provider value={storeRef.current}>{children}</ColorContext.Provider>;
}

export function useColorStore<T>(selector: (store: ColorState) => T) {
  const colorContext = useContext(ColorContext);

  if (!colorContext) {
    throw new Error("useColorStore must be used within ColorProvider");
  }

  return useStore(colorContext, selector);
}

export function useColorProvider() {
  const store = useColorStore((state) => state);

  const updateColor = (newColor: typeof store.raw) => {
    const color = convertColor(newColor);

    return store.update({
      raw: newColor,
      hex: color.toHex(),
      hsl: color.toHsl(),
      hsv: color.toHsv(),
      rgb: color.toRgb(),
    });
  };

  return {
    raw: store.raw,
    hex: store.hex,
    hsl: store.hsl,
    hsv: store.hsv,
    rgb: store.rgb,
    setRaw: (newColor: typeof store.raw) => updateColor(newColor),
    setHex: (newColor: typeof store.hex) => updateColor(newColor),
    setHsl: (newColor: typeof store.hsl) => updateColor(newColor),
    setHsv: (newColor: typeof store.hsv) => updateColor(newColor),
    setRgb: (newColor: typeof store.rgb) => updateColor(newColor),
  };
}

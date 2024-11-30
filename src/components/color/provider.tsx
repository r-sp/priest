"use client";

import type { ReactNode } from "react";
import type { ColorState, ColorSpace, AnyColor } from "~/lib/types";
import { createContext, useRef, useContext, useCallback, useMemo } from "react";
import { convertColor } from "~/lib/utils";
import { createStore, useStore } from "zustand";

const createColorStore = (initValue: ColorSpace) => {
  return createStore<ColorState>()((set) => ({
    ...initValue,
    update: (newColor) =>
      set((state) => ({
        ...state,
        ...newColor,
      })),
    setHarmony: (type) => set(() => ({ harmony: type })),
  }));
};

type ColorApi = ReturnType<typeof createColorStore>;

const ColorContext = createContext<ColorApi | undefined>(undefined);

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

export const useColorProvider = () => {
  const store = useColorStore((state) => state);

  const updateColor = useCallback(
    (newColor: AnyColor) => {
      const color = convertColor(newColor);

      return store.update({
        hex: color.toHex(),
        hsl: color.toHsl(),
        rgb: color.toRgb(),
      });
    },
    [store],
  );

  const color = useMemo(() => {
    return {
      hex: store.hex,
      hsl: store.hsl,
      rgb: store.rgb,
      setHex: (newColor: typeof store.hex) => updateColor(newColor),
      setHsl: (newColor: typeof store.hsl) => updateColor(newColor),
      setRgb: (newColor: typeof store.rgb) => updateColor(newColor),
      convert: (newColor: AnyColor) => convertColor(newColor),
    };
  }, [store, updateColor]);

  return color;
};

"use client";

import type { ColorStore, ColorState } from "~/lib/color";
import { createContext, useRef, useContext } from "react";
import { createColorStore } from "~/lib/color";
import { useStore } from "zustand";

type ColorApi = ReturnType<typeof createColorStore>;

const ColorContext = createContext<ColorApi | undefined>(undefined);

export function ColorProvider({
  children,
  initValue,
}: {
  children: React.ReactNode;
  initValue: ColorState;
}) {
  const storeRef = useRef<ColorApi>();

  if (!storeRef.current) {
    storeRef.current = createColorStore(initValue);
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

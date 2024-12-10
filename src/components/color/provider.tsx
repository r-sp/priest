"use client";

import type { ColorStore } from "~/lib/color";
import { createContext, useRef, useContext } from "react";
import { createColorStore, createColor, isValidHex } from "~/lib/color";
import { useParams } from "next/navigation";
import { useStore } from "zustand";

type ColorApi = ReturnType<typeof createColorStore>;

const ColorContext = createContext<ColorApi | undefined>(undefined);

export function ColorProvider({
  children,
  initValue,
}: {
  children: React.ReactNode;
  initValue: string;
}) {
  const storeRef = useRef<ColorApi>();
  const colorBy = useParams<{ hex: string }>();

  if (!storeRef.current) {
    storeRef.current = createColorStore(
      colorBy.hex
        ? createColor(isValidHex(colorBy.hex))
        : createColor(initValue),
    );
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

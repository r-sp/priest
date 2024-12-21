"use client";

import type { ColorStore, ColorState } from "~/lib/color";
import { createContext, useRef, useContext, useEffect } from "react";
import { createColorStore, createColor, isValidHex } from "~/lib/color";
import { getLocalTheme, localThemeListener } from "~/lib/theme";
import { convertRgb } from "~/lib/convert";
import { useParams } from "next/navigation";
import { useStore } from "zustand";

type ColorApi = ReturnType<typeof createColorStore>;
type ColorModeApi = ReturnType<typeof createColor>;

const ColorContext = createContext<ColorApi | undefined>(undefined);

export function ColorProvider({
  children,
  initValue,
}: {
  children: React.ReactNode;
  initValue: ColorModeApi;
}) {
  const storeRef = useRef<ColorApi>(undefined);
  const colorBy = useParams<{ hex: string }>();

  if (!storeRef.current) {
    const color = colorBy.hex
      ? createColor(convertRgb(isValidHex(colorBy.hex)))
      : initValue;

    const defaultValue: ColorState = {
      ...color,
      gamut: true,
      theme: getLocalTheme(),
      mode: "oklch",
    };

    storeRef.current = createColorStore(defaultValue);
  }

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", localThemeListener);
    return () => media.removeEventListener("change", localThemeListener);
  }, []);

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

"use client";

import type { ColorStore } from "~/lib/color";
import { createContext, useRef, useContext } from "react";
import { createColorStore, createColor, isValidHex } from "~/lib/color";
import { useParams } from "next/navigation";
import { useStore } from "zustand";

type ColorApi = ReturnType<typeof createColorStore>;

const ColorContext = createContext<ColorApi | undefined>(undefined);

export function ColorProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<ColorApi>();
  const colorBy = useParams<{ hex: string }>();

  if (!storeRef.current) {
    storeRef.current = createColorStore(
      colorBy.hex
        ? createColor(isValidHex(colorBy.hex))
        : createColor(generateRandomColorByDate()),
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

function generateRandomColorByDate(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const seed = `${year}${month}${day}1234567890`;

  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash + seed.charCodeAt(i)) | 0;
  }

  const randomNum = Math.abs(hash) % 16777215;
  const hexColor = "#" + randomNum.toString(16).padStart(6, "0");

  return hexColor;
}

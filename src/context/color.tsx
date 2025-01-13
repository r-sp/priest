"use client";

import { type ReactNode, useRef } from "react";
import type { ColorApi, ColorState } from "./store";
import { ColorContext, createColorStore } from "./store";

export default function ColorProvider({
  children,
  initValue,
}: Readonly<{
  children: ReactNode;
  initValue: ColorState;
}>) {
  const ref = useRef<ColorApi>(undefined);

  if (!ref.current) {
    ref.current = createColorStore(initValue);
  }

  return (
    <ColorContext.Provider value={ref.current}>
      {children}
    </ColorContext.Provider>
  );
}

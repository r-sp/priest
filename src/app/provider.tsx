"use client";

import type { GlobalStates, ColorState } from "~/lib/types";
import { type StoreApi, StoreContext, createGlobalStore } from "./store";
import { getLocalTheme, localThemeListener } from "~/lib/theme";
import { useRef, useEffect } from "react";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export default function AppProvider({
  children,
  initValue,
}: {
  children: React.ReactNode;
  initValue: ColorState;
}) {
  const storeRef = useRef<StoreApi>(undefined);

  if (!storeRef.current) {
    const defaultValue: GlobalStates = {
      theme: getLocalTheme(),
      color: initValue,
      mode: "oklch",
      gamut: true,
    };

    storeRef.current = createGlobalStore(defaultValue);
  }

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", localThemeListener);
    return () => media.removeEventListener("change", localThemeListener);
  }, []);

  return (
    <NuqsAdapter>
      <StoreContext.Provider value={storeRef.current}>
        {children}
      </StoreContext.Provider>
    </NuqsAdapter>
  );
}

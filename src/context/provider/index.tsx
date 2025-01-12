"use client";

import type { ReactNode } from "react";
import type { SharedState, ColorState } from "../session";
import { createColor, initColor } from "~/lib/color";
import { handleThemeListener } from "~/utils/theme";
import { useEffect } from "react";
import Consumer from "../consumer";

export default function Provider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const sharedState: SharedState = {
    theme: undefined,
    mode: "oklch",
  };

  const colorState: ColorState = createColor(initColor());

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", handleThemeListener);
    return () => media.removeEventListener("change", handleThemeListener);
  }, []);

  return (
    <Consumer shared={sharedState} color={colorState}>
      {children}
    </Consumer>
  );
}

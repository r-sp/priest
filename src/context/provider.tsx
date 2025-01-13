"use client";

import type { ReactNode } from "react";
import type { SharedState, ColorState } from "./store";
import { createColor, initColor } from "~/lib";
import Consumer from "./consumer";

export default function Provider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const sharedState: SharedState = {
    theme: undefined,
    mode: "oklch",
  };

  const colorState: ColorState = createColor(initColor());

  return (
    <Consumer shared={sharedState} color={colorState}>
      {children}
    </Consumer>
  );
}

"use client";

import type { ReactNode } from "react";
import type { SharedState, ColorState } from "./session";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import SharedProvider from "./provider/shared";
import ColorProvider from "./provider/color";

export default function Consumer({
  children,
  shared,
  color,
}: Readonly<{
  children: ReactNode;
  shared: SharedState;
  color: ColorState;
}>) {
  return (
    <NuqsAdapter>
      <SharedProvider initValue={shared}>
        <ColorProvider initValue={color}>{children}</ColorProvider>
      </SharedProvider>
    </NuqsAdapter>
  );
}

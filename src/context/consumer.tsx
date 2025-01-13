"use client";

import type { ReactNode } from "react";
import type { SharedState, ColorState } from "./store";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import SharedProvider from "./shared";
import ColorProvider from "./color";

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

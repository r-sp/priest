"use client";

import { type ReactNode, useRef } from "react";
import type { SharedApi, SharedState } from "../session";
import { SharedContext, createSharedStore } from "../session";

export default function SharedProvider({
  children,
  initValue,
}: Readonly<{
  children: ReactNode;
  initValue: SharedState;
}>) {
  const ref = useRef<SharedApi>(undefined);

  if (!ref.current) {
    ref.current = createSharedStore(initValue);
  }

  return (
    <SharedContext.Provider value={ref.current}>
      {children}
    </SharedContext.Provider>
  );
}

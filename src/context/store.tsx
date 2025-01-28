"use client";

import type { ReactNode } from "react";
import type { SessionState, SessionStore } from "~/lib/types";
import { createContext, useRef } from "react";
import { create } from "zustand";

export function createSession(initValue: SessionState) {
  return create<SessionStore>()((set) => ({
    ...initValue,
    setColor: (state) => set(() => ({ color: state })),
    setMode: (state) => set(() => ({ mode: state })),
    setTheme: (state) => set(() => ({ theme: state })),
    setShared: (state) => set(() => ({ shared: state })),
    setHue: (state) =>
      set((current) => ({ hue: { ...current.hue, ...state } })),
  }));
}

export type SessionApi = ReturnType<typeof createSession>;

export const SessionContext = createContext<SessionApi | undefined>(undefined);

export default function Store({
  children,
  initValue,
}: Readonly<{ children: ReactNode; initValue: SessionState }>) {
  const ref = useRef<SessionApi>(undefined);

  if (!ref.current) {
    ref.current = createSession(initValue);
  }

  return (
    <SessionContext.Provider value={ref.current}>
      {children}
    </SessionContext.Provider>
  );
}

"use client";

import type { ReactNode } from "react";
import type { SessionState, SessionStore } from "~/types/session";
import { createContext, useRef, useEffect } from "react";
import { create } from "zustand";

export function createSession(initValue: SessionState) {
  return create<SessionStore>()((set) => ({
    ...initValue,
    setColor: (state) => set(() => ({ color: state })),
    setMode: (state) => set(() => ({ mode: state })),
    setTheme: (state) => set(() => ({ theme: state })),
    setHue: (state) =>
      set((current) => ({ hue: { ...current.hue, ...state } })),
  }));
}

export type SessionApi = ReturnType<typeof createSession>;

export const SessionContext = createContext<SessionApi | undefined>(undefined);

interface Props {
  children: ReactNode;
  initValue: SessionState;
}

export default function Store({ children, initValue }: Props) {
  const ref = useRef<SessionApi>(undefined);

  if (!ref.current) {
    ref.current = createSession(initValue);
  }

  useEffect(() => {
    const handleRouter = () => {
      const body = document.body;
      if (body.hasAttribute("style")) {
        body.removeAttribute("style");
      }
    };

    window.addEventListener("popstate", handleRouter);
    return () => window.removeEventListener("popstate", handleRouter);
  });

  return (
    <SessionContext.Provider value={ref.current}>
      {children}
    </SessionContext.Provider>
  );
}

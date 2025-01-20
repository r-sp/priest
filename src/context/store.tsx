"use client";

import type { ReactNode } from "react";
import type { SessionApi, SessionState } from "./session";
import { createSession } from "./session";
import { createContext, useRef } from "react";

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

import type {
  AnyColorMode,
  ColorScheme,
  ColorMode,
  ColorState,
} from "~/lib/types";
import { create } from "zustand";

export type SessionState = {
  color: AnyColorMode;
  mode: ColorMode;
  theme: ColorScheme | undefined;
  shared: ColorState;
};

export type SessionAction = {
  setColor: (state: AnyColorMode) => void;
  setMode: (state: ColorMode) => void;
  setTheme: (state: ColorScheme) => void;
  setShared: (state: ColorState) => void;
};

export type SessionStore = SessionState & SessionAction;

export function createSession(initValue: SessionState) {
  return create<SessionStore>()((set) => ({
    ...initValue,
    setColor: (state) => set(() => ({ color: state })),
    setMode: (state) => set(() => ({ mode: state })),
    setTheme: (state) => set(() => ({ theme: state })),
    setShared: (state) => set(() => ({ shared: state })),
  }));
}

export type SessionApi = ReturnType<typeof createSession>;

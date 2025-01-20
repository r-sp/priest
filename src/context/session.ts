import type {
  AnyColorMode,
  ColorScheme,
  ColorMode,
  ColorState,
} from "~/lib/types";
import { createColor } from "~/lib";
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
};

export type SessionStore = SessionState & SessionAction;

export function createSession(initValue: SessionState) {
  return create<SessionStore>()((set) => ({
    ...initValue,
    setColor: (state) =>
      set(() => ({ color: state, shared: createColor(state) })),
    setMode: (state) => set(() => ({ mode: state })),
    setTheme: (state) => set(() => ({ theme: state })),
  }));
}

export type SessionApi = ReturnType<typeof createSession>;

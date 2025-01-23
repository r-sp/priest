import type { AnyColorMode, ColorState, ColorMode, ColorScheme } from "./color";

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

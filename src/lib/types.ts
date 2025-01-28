import type {
  ColorState,
  ColorMode,
  ColorScheme,
  AnyColorMode,
  HueColorMode,
} from "./color";

export type SessionState = {
  color: AnyColorMode;
  mode: ColorMode;
  theme: ColorScheme | undefined;
  shared: ColorState;
  hue: { color: HueColorMode; value: number; min: number; max: number };
};

export type SessionAction = {
  setColor: (state: AnyColorMode) => void;
  setMode: (state: ColorMode) => void;
  setTheme: (state: ColorScheme) => void;
  setShared: (state: ColorState) => void;
  setHue: (state: Partial<SessionState["hue"]>) => void;
};

export type SessionStore = SessionState & SessionAction;

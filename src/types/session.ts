import type {
  AnyColorMode,
  ColorState,
  ColorScheme,
  ColorQuery,
  ColorHue,
} from "./color";

export interface SessionState {
  color: AnyColorMode;
  mode: keyof ColorState;
  theme: ColorScheme | undefined;
  hue: ColorHue;
}

export interface SessionAction {
  setColor: (state: AnyColorMode) => void;
  setMode: (state: keyof ColorState) => void;
  setTheme: (state: ColorScheme) => void;
  setHue: (state: ColorHue) => void;
}

export type SessionStore = SessionState & SessionAction;

export interface SessionQuery {
  searchParams: Promise<ColorQuery & { error?: string }>;
}

export type SessionCss = [
  AnyColorMode,
  keyof ColorState,
  (state: AnyColorMode) => void,
  (state: keyof ColorState) => void,
];

export type SessionSlider = [AnyColorMode, (state: AnyColorMode) => void];

export type SessionPalettes = [AnyColorMode, keyof ColorState, ColorHue];

export type SessionHue = [ColorHue, (state: ColorHue) => void];

export type SessionSubscribe = [AnyColorMode, (state: AnyColorMode) => void];

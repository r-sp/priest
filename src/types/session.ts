import type {
  AnyColorMode,
  ColorState,
  ColorScheme,
  ColorQuery,
} from "./color";

export interface SessionState {
  color: AnyColorMode;
  mode: keyof ColorState;
  theme: ColorScheme | undefined;
}

export interface SessionAction {
  setColor: (state: AnyColorMode) => void;
  setMode: (state: keyof ColorState) => void;
  setTheme: (state: ColorScheme) => void;
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

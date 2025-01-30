import type { AnyColorMode, ColorState, ColorScheme, ColorMode } from "./color";

export interface ColorHue {
  color:
    | ColorMode<"hsl">
    | ColorMode<"hwb">
    | ColorMode<"lch">
    | ColorMode<"oklch">;
  value: number;
  min: number;
  max: number;
}

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
  setHue: (state: Partial<ColorHue>) => void;
}

export type SessionStore = SessionState & SessionAction;

export type SessionCss = [
  AnyColorMode,
  keyof ColorState,
  (state: AnyColorMode) => void,
  (state: keyof ColorState) => void,
  (state: Partial<ColorHue>) => void,
];

export type SessionSlider = [
  AnyColorMode,
  keyof ColorState,
  (state: AnyColorMode) => void,
  (state: Partial<ColorHue>) => void,
];

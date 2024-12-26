import type {
  GlobalStates,
  GlobalActions,
  ThemeVariant,
  ColorState,
  ColorFormat,
} from "~/lib/types";
import { createStore, useStore } from "zustand";
import { createContext, useContext } from "react";

export type GlobalStore = GlobalStates & GlobalActions;

export function createGlobalStore(initValue: GlobalStates) {
  return createStore<GlobalStore>()((set) => ({
    ...initValue,
    setTheme: (variant) => set(() => ({ theme: variant })),
    setColor: (state) => set(() => ({ color: state })),
    setMode: (format) => set(() => ({ mode: format })),
    setGamut: (p3) => set(() => ({ gamut: p3 })),
  }));
}

export type StoreApi = ReturnType<typeof createGlobalStore>;

export const StoreContext = createContext<StoreApi | undefined>(undefined);

function useGlobalStore<T>(selector: (store: GlobalStore) => T) {
  const storeContext = useContext(StoreContext);

  if (!storeContext) {
    throw new Error("useGlobalStore must be used within Global State Adapter");
  }

  return useStore(storeContext, selector);
}

export function useTheme(): [ThemeVariant, (variant: ThemeVariant) => void] {
  const theme = useGlobalStore((state) => state.theme);
  const setTheme = useGlobalStore((state) => state.setTheme);

  return [theme, setTheme];
}

export function useColor(): [ColorState, (color: ColorState) => void] {
  const color = useGlobalStore((state) => state.color);
  const setColor = useGlobalStore((state) => state.setColor);

  return [color, setColor];
}

export function useMode(): [ColorFormat, (format: ColorFormat) => void] {
  const mode = useGlobalStore((state) => state.mode);
  const setMode = useGlobalStore((state) => state.setMode);

  return [mode, setMode];
}

export function useGamut(): [boolean, (p3: boolean) => void] {
  const gamut = useGlobalStore((state) => state.gamut);
  const setGamut = useGlobalStore((state) => state.setGamut);

  return [gamut, setGamut];
}

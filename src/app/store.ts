import type {
  GlobalStates,
  GlobalActions,
  ThemeVariant,
  ColorState,
  ColorFormat,
  HarmonyVariant,
} from "~/lib/types";
import { createContext, useContext } from "react";
import { createStore, useStore } from "zustand";
import { useShallow } from "zustand/shallow";

export type GlobalStore = GlobalStates & GlobalActions;

export function createGlobalStore(initValue: GlobalStates) {
  return createStore<GlobalStore>()((set) => ({
    ...initValue,
    setTheme: (variant) => set(() => ({ theme: variant })),
    setColor: (state) => set(() => ({ color: state })),
    setMode: (format) => set(() => ({ mode: format })),
    setGamut: (p3) => set(() => ({ gamut: p3 })),
    setHarmony: (type) => set(() => ({ harmony: type })),
  }));
}

export type StoreApi = ReturnType<typeof createGlobalStore>;

export const StoreContext = createContext<StoreApi | undefined>(undefined);

function useGlobalStore<T>(selector: (store: GlobalStore) => T) {
  const storeContext = useContext(StoreContext);

  if (!storeContext) {
    throw new Error("useGlobalStore must be used within App Provider");
  }

  return useStore(storeContext, selector);
}

export function useTheme(): [
  ThemeVariant | undefined,
  (variant: ThemeVariant) => void,
] {
  const [theme, setTheme] = useGlobalStore(
    useShallow((state) => [state.theme, state.setTheme]),
  );
  return [theme, setTheme];
}

export function useColor(): [ColorState, (color: ColorState) => void] {
  const [color, setColor] = useGlobalStore(
    useShallow((state) => [state.color, state.setColor]),
  );
  return [color, setColor];
}

export function useMode(): [ColorFormat, (format: ColorFormat) => void] {
  const [mode, setMode] = useGlobalStore(
    useShallow((state) => [state.mode, state.setMode]),
  );
  return [mode, setMode];
}

export function useGamut(): [boolean, (p3: boolean) => void] {
  const [gamut, setGamut] = useGlobalStore(
    useShallow((state) => [state.gamut, state.setGamut]),
  );
  return [gamut, setGamut];
}

export function useHarmony(): [HarmonyVariant, (type: HarmonyVariant) => void] {
  const [harmony, setHarmony] = useGlobalStore(
    useShallow((state) => [state.harmony, state.setHarmony]),
  );
  return [harmony, setHarmony];
}

import { createStore } from "zustand";
import chroma from "chroma-js";

export type ChromaState = {
  hex: string;
  hsl: string;
};

export type ChromaActions = {
  random: () => void;
};

export type ChromaStore = ChromaState & ChromaActions;

export const initChromaStore = (): ChromaState => {
  const randomHEX = chroma.random().hex();
  const randomHSL = chroma(randomHEX).css("hsl");
  return {
    hex: randomHEX,
    hsl: randomHSL,
  };
};

export const defaultInitState: ChromaState = {
  hex: "",
  hsl: "",
};

export const createChromaStore = (initState: ChromaState = defaultInitState) => {
  return createStore<ChromaStore>()((set) => ({
    ...initState,
    random: () =>
      set(() => {
        const randomHEX = chroma.random().hex();
        const randomHSL = chroma(randomHEX).css("hsl");
        return {
          hex: randomHEX,
          hsl: randomHSL,
        };
      }),
  }));
};

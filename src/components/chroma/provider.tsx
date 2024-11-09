"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import { type ChromaStore, createChromaStore, initChromaStore } from "./store";

export type ChromaApi = ReturnType<typeof createChromaStore>;

export const ChromaContext = createContext<ChromaApi | undefined>(undefined);

export interface ChromaProviderProps {
  children: ReactNode;
}

export const ChromaProvider = ({ children }: ChromaProviderProps) => {
  const storeRef = useRef<ChromaApi>();
  if (!storeRef.current) {
    storeRef.current = createChromaStore(initChromaStore());
  }

  return <ChromaContext.Provider value={storeRef.current}>{children}</ChromaContext.Provider>;
};

export const useChroma = <T,>(selector: (store: ChromaStore) => T): T => {
  const chromaStoreContext = useContext(ChromaContext);

  if (!chromaStoreContext) {
    throw new Error(`useChroma must be used within ChromaProvider`);
  }

  return useStore(chromaStoreContext, selector);
};

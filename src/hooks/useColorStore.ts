import { type ColorStore, ColorContext } from "~/context/store";
import { useContext } from "react";
import { useStore } from "zustand";
import { useShallow } from "zustand/shallow";

export default function useColorStore<T>(selector: (store: ColorStore) => T) {
  const context = useContext(ColorContext);

  if (!context) {
    throw new Error("useColorStore must be used within ColorProvider");
  }

  return useStore(context, useShallow(selector));
}

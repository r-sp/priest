import { type SharedStore, SharedContext } from "~/context/session";
import { useContext } from "react";
import { useStore } from "zustand";
import { useShallow } from "zustand/shallow";

export default function useSharedStore<T>(selector: (store: SharedStore) => T) {
  const context = useContext(SharedContext);

  if (!context) {
    throw new Error("useSharedStore must be used within SharedProvider");
  }

  return useStore(context, useShallow(selector));
}

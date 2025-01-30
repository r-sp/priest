import type { SessionStore } from "~/types/session";
import { useContext } from "react";
import { useStore } from "zustand";
import { useShallow } from "zustand/shallow";
import { SessionContext } from "~/context";

export default function useSession<T>(selector: (store: SessionStore) => T) {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error("useSession must be used within RootLayout");
  }

  return useStore(context, useShallow(selector));
}

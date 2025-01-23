import type { SessionStore } from "~/lib/types";
import { useContext } from "react";
import { useStore } from "zustand";
import { useShallow } from "zustand/shallow";
import { SessionContext } from "~/context";

export default function useSession<T>(selector: (store: SessionStore) => T) {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error("useSession must be used within Provider");
  }

  return useStore(context, useShallow(selector));
}

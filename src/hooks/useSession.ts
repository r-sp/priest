import { type SessionStore, SessionContext } from "~/context";
import { useContext } from "react";
import { useStore } from "zustand";
import { useShallow } from "zustand/shallow";

export default function useSession<T>(selector: (store: SessionStore) => T) {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error("useSession must be used within Provider");
  }

  return useStore(context, useShallow(selector));
}

import type { ReactNode } from "react";
import type { SessionState } from "./session";
import { createColor, initColor } from "~/lib";
import Store from "./store";

export default function Provider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const currentColor = initColor();
  const sharedColor = createColor(currentColor);

  const session: SessionState = {
    theme: undefined,
    color: currentColor,
    mode: "hex",
    shared: sharedColor,
  };

  return <Store initValue={session}>{children}</Store>;
}

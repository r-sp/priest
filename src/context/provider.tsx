import type { ReactNode } from "react";
import type { SessionState } from "./session";
import { createColor, initColor } from "~/lib";
import { NuqsAdapter } from "nuqs/adapters/next/app";
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

  return (
    <NuqsAdapter>
      <Store initValue={session}>{children}</Store>
    </NuqsAdapter>
  );
}

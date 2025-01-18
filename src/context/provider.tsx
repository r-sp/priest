import type { ReactNode } from "react";
import type { SharedState, ColorState } from "./store";
import { createColor, initColor } from "~/lib";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import SharedProvider from "./shared";
import ColorProvider from "./color";

export default function Provider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const sharedState: SharedState = {
    theme: undefined,
    mode: "oklch",
  };

  const colorState: ColorState = createColor(initColor());

  return (
    <NuqsAdapter>
      <SharedProvider initValue={sharedState}>
        <ColorProvider initValue={colorState}>{children}</ColorProvider>
      </SharedProvider>
    </NuqsAdapter>
  );
}

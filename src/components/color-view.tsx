"use client";

import { useColor, useMode } from "~/hooks";
import { switchCss } from "~/lib";

export default function ColorView() {
  const [color] = useColor();
  const [mode] = useMode();

  const currentColor = switchCss(mode, color);

  return (
    <div style={{ ["--bg" as string]: currentColor }}>
      <div className="bg-ref aspect-cinema rounded-md"></div>
    </div>
  );
}

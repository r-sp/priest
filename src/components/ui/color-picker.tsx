"use client";

import type { ReactNode } from "react";
import type { AnyColorMode, ColorState } from "~/lib/color";
import { useMemo } from "react";
import { useSession } from "~/hooks";
import { createColor } from "~/lib/color";
import ColorMode from "./color-mode";
import ColorView from "./color-view";
import InputCss from "./input-css";
import InputSlider from "./input-slider";

export default function ColorPicker({ children }: { children?: ReactNode }) {
  const color = useSession((state) => state.color);
  const mode = useSession((state) => state.mode);
  const shared = useSession((state) => state.shared);

  const getColor = useMemo(() => color, [color]);
  const getMode = useMemo(() => mode, [mode]);
  const getShared = useMemo(() => shared, [shared]);

  const setColor = useSession((state) => state.setColor);
  const setMode = useSession((state) => state.setMode);
  const setShared = useSession((state) => state.setShared);

  const COLOR_MODE = /^(rgb|hsl|hwb|lab|lch|oklab|oklch)\(/;
  const HEX_MODE = /^#([0-9A-Fa-f]{3}){1,2}$/;

  const handleInput = (state: AnyColorMode) => {
    setColor(state);
    setShared(createColor(state));
  };

  const handleCss = (state: AnyColorMode, target: string) => {
    if (COLOR_MODE.test(target)) {
      setMode(state.mode);
    } else if (HEX_MODE.test(target)) {
      setMode("hex");
    } else {
      setMode(state.mode);
    }
    setColor(state);
    setShared(createColor(state));
  };

  const handleMode = (state: AnyColorMode, target?: keyof ColorState) => {
    setColor(state);
    setMode(target ? target : state.mode);
  };

  return (
    <div className="max-w-8xl mx-auto flex w-full flex-col gap-x-4 gap-y-6 md:flex-row">
      <div className="inline-flex grow-1 flex-col gap-y-6">
        <ColorView color={getColor} />
        <InputSlider color={getColor} action={handleInput} dynamic={true} />
      </div>
      <div className="inline-flex grow-1 flex-col gap-y-6">
        <InputCss color={getColor} mode={getMode} action={handleCss} />
        <ColorMode color={getShared} mode={getMode} action={handleMode} />
        {children}
      </div>
    </div>
  );
}

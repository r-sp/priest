"use client";

import type { ReactNode } from "react";
import type { AnyColorMode, ColorState } from "~/lib/color";
import { useMemo } from "react";
import { useSession } from "~/hooks";
import { createColor } from "~/lib/color";
import { createHue } from "~/lib/service";
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
  const setHue = useSession((state) => state.setHue);

  const COLOR_MODE = /^(rgb|hsl|hwb|lab|lch|oklab|oklch)\(/;
  const HEX_MODE = /^#([0-9A-Fa-f]{3}){1,2}$/;

  const handleInput = (state: AnyColorMode) => {
    const hue = createHue(getShared, getMode);
    setColor(state);
    setShared(createColor(state));
    setHue({ color: hue, value: hue.h });
  };

  const handleCss = (state: AnyColorMode, target: string) => {
    const hue = createHue(getShared, state.mode);
    if (COLOR_MODE.test(target)) {
      setMode(state.mode);
    } else if (HEX_MODE.test(target)) {
      setMode("hex");
    } else {
      setMode(state.mode);
    }
    setColor(state);
    setShared(createColor(state));
    setHue({ color: hue, value: hue.h });
  };

  const handleMode = (state: AnyColorMode, target?: keyof ColorState) => {
    const hue = createHue(getShared, target ? target : state.mode);
    setColor(state);
    setMode(target ? target : state.mode);
    setHue({ color: hue, value: hue.h });
  };

  return (
    <div
      role="toolbar"
      className="max-w-8xl mx-auto grid w-full gap-x-4 gap-y-6 md:grid-cols-(--toolbar)"
    >
      <div role="none" className="inline-grid content-baseline gap-y-6">
        <ColorView color={getColor} />
        <InputSlider color={getColor} action={handleInput} dynamic={true} />
      </div>
      <div role="none" className="inline-grid content-baseline gap-y-6">
        <InputCss color={getColor} mode={getMode} action={handleCss} />
        <ColorMode color={getShared} mode={getMode} action={handleMode} />
        {children}
      </div>
    </div>
  );
}

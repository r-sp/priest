"use client";

import { type ColorPickerProps } from "./types";
import Hue from "@uiw/react-color-hue";
import Saturation from "@uiw/react-color-saturation";
import ShadeSlider from "@uiw/react-color-shade-slider";

export default function Picker({ raw, action }: ColorPickerProps) {
  const updateColor = (color: typeof raw | Partial<typeof raw>) => {
    action({ ...raw, ...color });
  };

  return (
    <div role="toolbar" aria-label="Color picker" className="flex flex-col gap-4">
      <div className="pick-saturation">
        <Saturation hsva={raw} hue={raw.h} style={{ height: "100%", width: "100%" }} onChange={updateColor} />
      </div>
      <div className="pick-hue">
        <Hue hue={raw.h} onChange={updateColor} />
      </div>
      <div className="pick-lightness">
        <ShadeSlider hsva={raw} onChange={updateColor} />
      </div>
    </div>
  );
}

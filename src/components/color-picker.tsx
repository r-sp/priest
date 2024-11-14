"use client";

import { useState, Dispatch, SetStateAction } from "react";
import { useColor } from "~/lib/color";
import type { HsvaColor, HslaColor } from "~/lib/types";
import clsx from "clsx";
import Hue from "@uiw/react-color-hue";
import Saturation from "@uiw/react-color-saturation";
import ShadeSlider from "@uiw/react-color-shade-slider";

export default function ColorPicker(props: {
  color: { rgb: string; raw: HslaColor };
  action: Dispatch<SetStateAction<HslaColor>>;
}) {
  const [colorPicker, setColorPicker] = useState<boolean>(false);
  const [colorHSV, setColorHSV] = useState<HsvaColor>(useColor(props.color.raw).toHsv());

  const colorRGB = props.color.rgb;
  const setColor = props.action;
  const getColor = useColor;

  const newColor = (color: HsvaColor | { h: number } | { v: number }) => {
    setColorHSV({ ...colorHSV, ...color });
    setColor(getColor(colorHSV).toHsl());
  };

  const handleColorPicker = () => setColorPicker(!colorPicker);

  return (
    <div className="color-box" role="none">
      <button
        className="color-preview"
        aria-haspopup="dialog"
        aria-expanded={colorPicker ? true : false}
        aria-controls="color-dialog"
        aria-label={clsx(colorPicker ? "close color picker" : "open color picker")}
        style={{ backgroundColor: colorRGB }}
        tabIndex={0}
        onClick={handleColorPicker}
      ></button>
      <div
        className={clsx("color-picker", colorPicker ? "is-open" : "is-close")}
        role="dialog"
        aria-modal="true"
        aria-hidden={colorPicker ? false : true}
        aria-label="color picker"
        id="color-dialog"
      >
        <div className="color-saturation" role="toolbar" aria-label="color saturation">
          <Saturation hsva={colorHSV} hue={colorHSV.h} style={{ height: "100%", width: "100%" }} onChange={newColor} />
        </div>
        <div className="color-hue" role="toolbar" aria-label="color hue" aria-orientation="horizontal">
          <Hue hue={colorHSV.h} onChange={newColor} />
        </div>
        <div className="color-lightness" role="toolbar" aria-label="color lightness" aria-orientation="horizontal">
          <ShadeSlider hsva={colorHSV} onChange={newColor} onBlur={handleColorPicker} />
        </div>
      </div>
      <div className="color-overlay" aria-hidden="true" onClick={handleColorPicker}></div>
    </div>
  );
}

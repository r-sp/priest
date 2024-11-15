"use client";

import { useState, Dispatch, SetStateAction } from "react";
import { createPortal } from "react-dom";
import { useColor } from "~/lib/color";
import type { CustomColor, HsvaColor } from "~/lib/types";
import clsx from "clsx";
import Hue from "@uiw/react-color-hue";
import Saturation from "@uiw/react-color-saturation";
import ShadeSlider from "@uiw/react-color-shade-slider";

export default function ColorPicker(props: {
  color: { rgb: string; raw: CustomColor };
  action: Dispatch<SetStateAction<CustomColor>>;
}) {
  const [colorPicker, setColorPicker] = useState<boolean>(false);
  const [colorHSV, setColorHSV] = useState<HsvaColor>(useColor(props.color.raw).toHsv());

  const previewColor = props.color.rgb;
  const setColor = props.action;
  const getColor = useColor;

  const newColor = (color: HsvaColor | { h: number } | { v: number }) => {
    setColorHSV({ ...colorHSV, ...color });
    setColor(getColor(colorHSV).toRgb());
  };

  const handleColorPicker = () => setColorPicker(!colorPicker);

  return (
    <div className="color-box" role="none">
      <button
        className="color-preview"
        aria-haspopup="dialog"
        aria-expanded={colorPicker ? true : false}
        aria-controls="color-dialog"
        aria-label={colorPicker ? "close color picker" : "open color picker"}
        style={{ backgroundColor: previewColor }}
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
      {colorPicker &&
        createPortal(<div className="color-overlay" aria-hidden="true" onClick={handleColorPicker} />, document.body)}
    </div>
  );
}

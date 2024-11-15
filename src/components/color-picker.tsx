"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import type { Dispatch, SetStateAction } from "react";
import type { CustomColor, HsvaColor } from "~/lib/types";
import clsx from "clsx";
import Hue from "@uiw/react-color-hue";
import Saturation from "@uiw/react-color-saturation";
import ShadeSlider from "@uiw/react-color-shade-slider";

export default function ColorPicker(props: {
  color: { rgb: string; raw: HsvaColor };
  action: Dispatch<SetStateAction<CustomColor>>;
}) {
  const [colorPicker, setColorPicker] = useState<boolean>(false);

  const colorRaw = props.color.raw;
  const previewColor = props.color.rgb;

  const updateColor = (color: HsvaColor | { h: number } | { v: number }) => {
    props.action({ ...colorRaw, ...color });
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
          <Saturation hsva={colorRaw} hue={colorRaw.h} style={{ height: "100%", width: "100%" }} onChange={updateColor} />
        </div>
        <div className="color-hue" role="toolbar" aria-label="color hue" aria-orientation="horizontal">
          <Hue hue={colorRaw.h} onChange={updateColor} />
        </div>
        <div className="color-lightness" role="toolbar" aria-label="color lightness" aria-orientation="horizontal">
          <ShadeSlider hsva={colorRaw} onChange={updateColor} onBlur={handleColorPicker} />
        </div>
      </div>
      {colorPicker &&
        createPortal(<div className="color-overlay" aria-hidden="true" onClick={handleColorPicker} />, document.body)}
    </div>
  );
}

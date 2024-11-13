"use client";

import { useState, Dispatch, SetStateAction } from "react";
import { type HsvaColor } from "colord";
import clsx from "clsx";
import Hue from "@uiw/react-color-hue";
import Saturation from "@uiw/react-color-saturation";
import ShadeSlider from "@uiw/react-color-shade-slider";

export default function ColorPicker(props: { rgb: string; hsva: HsvaColor; action: Dispatch<SetStateAction<HsvaColor>> }) {
  const [colorPicker, setColorPicker] = useState<boolean>(false);

  const setColor = props.action;
  const colorHSV = props.hsva;
  const colorRGB = props.rgb;

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
        onClick={() => setColorPicker(!colorPicker)}
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
          <Saturation
            hsva={colorHSV}
            hue={colorHSV.h}
            style={{ height: "100%", width: "100%" }}
            onChange={(newColor) => setColor({ ...colorHSV, ...newColor })}
          />
        </div>
        <div className="color-hue" role="toolbar" aria-label="color hue" aria-orientation="horizontal">
          <Hue hue={colorHSV.h} onChange={(newHue) => setColor({ ...colorHSV, ...newHue })} />
        </div>
        <div className="color-lightness" role="toolbar" aria-label="color lightness" aria-orientation="horizontal">
          <ShadeSlider hsva={colorHSV} onChange={(newShade) => setColor({ ...colorHSV, ...newShade })} />
        </div>
      </div>
      <div className="color-overlay" aria-hidden="true" onClick={() => setColorPicker(!colorPicker)}></div>
    </div>
  );
}

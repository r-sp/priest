"use client";

import { useState } from "react";
import { colord, random } from "colord";
import Hue from "@uiw/react-color-hue";
import Saturation from "@uiw/react-color-saturation";
import ShadeSlider from "@uiw/react-color-shade-slider";
import clsx from "clsx";

export default function Color(props: { hsv: { h: number; s: number; v: number; a: number } }) {
  const [picker, setPicker] = useState<boolean>(false);
  const [hsva, setHsva] = useState(props.hsv);
  const color = colord(hsva);

  return (
    <section className="color" aria-label={clsx("color", color.toHex())}>
      <div className="color-box" role="none">
        <button
          className="color-preview"
          aria-haspopup="dialog"
          aria-expanded={picker ? true : false}
          aria-controls="color-dialog"
          aria-label={clsx(picker ? "close color picker" : "open color picker")}
          style={{ backgroundColor: color.toRgbString() }}
          tabIndex={0}
          onClick={() => setPicker(!picker)}
        ></button>
        <div
          className={clsx("color-picker", picker ? "is-open" : "is-close")}
          role="dialog"
          aria-modal="true"
          aria-hidden={picker ? false : true}
          aria-label="color picker"
          id="color-dialog"
        >
          <div className="color-saturation" role="toolbar" aria-label="color saturation">
            <Saturation
              hsva={hsva}
              style={{ height: "100%", width: "100%" }}
              onChange={(newColor) => {
                setHsva({ ...hsva, ...newColor, a: hsva.a });
              }}
            />
          </div>
          <div className="color-hue" role="toolbar" aria-label="color hue" aria-orientation="horizontal">
            <Hue
              hue={hsva.h}
              onChange={(newHue) => {
                setHsva({ ...hsva, ...newHue });
              }}
            />
          </div>
          <div className="color-lightness" role="toolbar" aria-label="color lightness" aria-orientation="horizontal">
            <ShadeSlider
              hsva={hsva}
              onChange={(newShade) => {
                setHsva({ ...hsva, ...newShade });
              }}
            />
          </div>
        </div>
        <div className="color-overlay" aria-hidden="true" onClick={() => setPicker(!picker)}></div>
      </div>
      <code className="color-hex">{color.toHex()}</code>
      <code className="color-hsl">{color.toHslString()}</code>
      <button
        className="color-random"
        aria-label="generate random color"
        onClick={() => {
          setHsva(random().toHsv());
        }}
      >
        <span>Random Color</span>
      </button>
    </section>
  );
}

"use client";

import { useState, useRef } from "react";
import { createPortal } from "react-dom";
import { type ColorPickerProps } from "./types";
import Hue from "@uiw/react-color-hue";
import Saturation from "@uiw/react-color-saturation";
import ShadeSlider from "@uiw/react-color-shade-slider";

export default function Picker({ color, action }: ColorPickerProps) {
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [showColor, setShowColor] = useState<boolean>(false);
  const { hsv, rgb } = color;

  const focusButton = useRef<HTMLButtonElement>(null);
  const updateColor = (hsva: typeof hsv | Partial<typeof hsv>) => {
    action({ ...hsv, ...hsva });
  };

  return (
    <div role="toolbar" aria-label="Color picker" className="relative">
      <button
        ref={focusButton}
        aria-label={showPicker ? "Close color picker" : "Open color picker"}
        aria-expanded={showPicker ? "true" : "false"}
        aria-controls="color-picker"
        aria-haspopup="dialog"
        className="flex overflow-hidden rounded-lg"
        onClick={(e) => {
          e.preventDefault();
          if (showPicker) {
            setShowPicker(false);
            focusButton.current?.focus();
          } else {
            setShowPicker(true);
            focusButton.current?.blur();
          }
        }}
        onContextMenu={(e) => {
          e.preventDefault();
          setShowColor(true);
        }}
      >
        <span className="inline-flex h-12 w-12" style={{ backgroundColor: rgb }}></span>
      </button>
      <div id="color-picker-portal" className="absolute left-0 top-12" role="none"></div>
      {showPicker
        ? createPortal(
            <div
              aria-modal="true"
              id="color-picker"
              role="dialog"
              className="relative z-20 flex flex-col gap-4 bg-holy-900 py-4"
            >
              <div className="pick-saturation">
                <Saturation hsva={hsv} hue={hsv.h} style={{ height: "100%", width: "100%" }} onChange={updateColor} />
              </div>
              <div className="pick-hue">
                <Hue hue={hsv.h} onChange={updateColor} />
              </div>
              <div className="pick-lightness">
                <ShadeSlider hsva={hsv} onChange={updateColor} />
              </div>
            </div>,
            document.getElementById("color-picker-portal") || document.body,
          )
        : null}
      {showPicker
        ? createPortal(
            <span
              className="overlay z-10 block"
              role="none"
              tabIndex={0}
              onFocus={() => {
                setShowPicker(false);
                focusButton.current?.focus();
              }}
            ></span>,
            document.getElementById("color-picker-portal") || document.body,
          )
        : null}
      {showColor
        ? createPortal(
            <span
              className="overlay z-10 block"
              role="none"
              style={{ backgroundColor: rgb }}
              tabIndex={0}
              onClick={() => {
                setShowColor(false);
                focusButton.current?.focus();
              }}
            ></span>,
            document.getElementById("color-picker-portal") || document.body,
          )
        : null}
    </div>
  );
}

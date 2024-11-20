"use client";

import { useState, useRef } from "react";
import { createPortal } from "react-dom";
import { useColor } from "~/lib/color";
import { useColorProvider } from "./provider";

import Hue from "@uiw/react-color-hue";
import Saturation from "@uiw/react-color-saturation";
import ShadeSlider from "@uiw/react-color-shade-slider";

export default function ColorPicker() {
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [showColor, setShowColor] = useState<boolean>(false);

  const focusButton = useRef<HTMLButtonElement>(null);
  const focusPortal = useRef<HTMLDivElement>(null);

  const { hsv, rgb, setHsv } = useColorProvider();

  const updateHsv = (newColor: typeof hsv | Partial<typeof hsv>) => setHsv({ ...hsv, ...newColor });

  const previewColor = useColor(rgb).toRgbString();

  return (
    <div role="toolbar" aria-label="Color picker" className="relative">
      <button
        ref={focusButton}
        aria-label={showPicker ? "Close color picker" : "Open color picker"}
        aria-expanded={showPicker ? "true" : "false"}
        aria-controls="color-picker"
        aria-haspopup="dialog"
        className="flex overflow-hidden rounded-md"
        onClick={(e) => {
          e.preventDefault();
          if (showPicker) {
            setShowPicker(false);
            focusButton.current?.focus();
          } else {
            setShowPicker(true);
            focusButton.current?.blur();
            focusPortal.current?.focus();
          }
        }}
        onContextMenu={(e) => {
          e.preventDefault();
          setShowColor(true);
        }}
      >
        <span className="inline-flex h-8 w-8" style={{ backgroundColor: previewColor }} suppressHydrationWarning></span>
      </button>
      <div
        ref={focusPortal}
        id="color-picker-portal"
        className="focus-within:no-outline absolute left-0 top-8"
        role="none"
        tabIndex={showPicker ? 0 : showColor ? 0 : -1}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            if (showPicker) {
              setShowPicker(false);
            } else if (showColor) {
              setShowPicker(false);
            }
            focusButton.current?.focus();
          }
        }}
      ></div>
      {showPicker
        ? createPortal(
            <div
              aria-modal="true"
              id="color-picker"
              role="dialog"
              className="relative z-20 flex flex-col gap-4 bg-holy-900 py-4"
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  setShowPicker(false);
                  focusButton.current?.focus();
                }
              }}
            >
              <div className="pick-saturation">
                <Saturation hsva={hsv} hue={hsv.h} style={{ height: "100%", width: "100%" }} onChange={updateHsv} />
              </div>
              <div className="pick-hue">
                <Hue hue={hsv.h} onChange={updateHsv} />
              </div>
              <div className="pick-lightness">
                <ShadeSlider hsva={hsv} onChange={updateHsv} />
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
              style={{ backgroundColor: previewColor }}
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

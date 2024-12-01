"use client";

import { useState, useRef, useCallback } from "react";
import { useColorStore, useColorProvider } from "./provider";
import { getFormatColor, stringifyRaw } from "~/lib/utils";

export default function ColorInput() {
  const { mode, setMode } = useColorStore((state) => state);
  const store = useColorProvider();
  const value = stringifyRaw(store.raw);

  const [currentValue, setCurrentValue] = useState<string>(value);
  const ref = useRef<boolean>(false);

  const updateColor = useCallback(
    (color: typeof store.raw) => {
      const currentColor = store.convert(color);
      const isValidColor = currentColor.isValid();

      if (isValidColor) {
        const format = getFormatColor(color);
        switch (format) {
          case "hsl":
            store.setHsl(currentColor.toHsl());
            if (mode !== "hsl") {
              setMode("hsl");
            }
            break;
          case "rgb":
            store.setRgb(currentColor.toRgb());
            if (mode !== "rgb") {
              setMode("rgb");
            }
            break;
          default:
            store.setHex(currentColor.toHex());
            if (mode !== "hex") {
              setMode("hex");
            }
        }
      }

      return color;
    },
    [store, mode, setMode],
  );

  if (currentValue !== value && ref.current === false) {
    setCurrentValue(value);
  }

  return (
    <div className="relative z-0 h-8" role="none">
      <input
        type="text"
        name="color-input"
        autoCorrect="false"
        autoComplete="false"
        value={currentValue}
        className="absolute bottom-0 left-0 right-0 top-0 h-8 rounded-2xl border-holy-700 bg-holy-900 px-3 font-mono text-sm text-holy-100 hover:bg-holy-800 focus:bg-holy-800 active:border-holy-600 active:bg-holy-700"
        onChange={(e) => {
          setCurrentValue(e.target.value);
          updateColor(e.target.value);
        }}
        onFocus={() => {
          ref.current = true;
        }}
        onBlur={(e) => {
          ref.current = false;
          if (value !== e.target.value) {
            e.target.value = value;
          }
        }}
      />
    </div>
  );
}

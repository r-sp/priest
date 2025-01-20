"use client";

import type { ChangeEvent } from "react";
import { useState, useCallback } from "react";
import { useColorStore, useMode } from "~/hooks";
import { parseCss, switchCss } from "~/lib";
import { isValidCss } from "~/utils";
import clsx from "clsx";

export default function InputCss() {
  const [color, setColor] = useColorStore();
  const [mode, setMode] = useMode();

  const currentColor = switchCss(mode, color);

  const [input, setInput] = useState<string>(currentColor);
  const [focus, setFocus] = useState<boolean>(false);

  const handleInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newColor = e.target.value;
      const validColor = parseCss(newColor);

      if (focus) {
        setInput(newColor);
        if (validColor) {
          const [isHex, isColor] = isValidCss(newColor);
          if (isHex) {
            setMode("hex");
          }
          if (isColor) {
            setMode(validColor.mode);
          }
          setColor(validColor);
        }
      }
    },
    [focus, setColor, setMode],
  );

  return (
    <div role="form" aria-label="color input" className="grid">
      <div role="none" className="relative inline-grid h-10">
        <input
          type="text"
          autoFocus={focus}
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect="false"
          spellCheck="false"
          value={focus ? input : currentColor}
          id="color-input"
          className={clsx(
            "absolute top-0 right-0 bottom-0 left-0 rounded-md px-4 py-2 font-mono ring outline-0",
            "bg-gray-100 dark:bg-gray-900",
            focus
              ? "cursor-text text-gray-700 ring-gray-300 dark:text-gray-300 dark:ring-gray-700"
              : "cursor-pointer text-gray-600 ring-gray-200 dark:text-gray-400 dark:ring-gray-800",
          )}
          tabIndex={0}
          onChange={handleInput}
          onFocus={() => {
            setInput(currentColor);
            setFocus(true);
          }}
          onBlur={() => setFocus(false)}
        />
      </div>
    </div>
  );
}

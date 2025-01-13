"use client";

import type { ChangeEvent } from "react";
import { useState, useCallback } from "react";
import { useColor, useMode } from "~/hooks";
import { createColor } from "~/lib/create";
import { formatHex } from "~/lib/format";
import { parseCss } from "~/lib/parse";
import { switchCss } from "~/lib/switch";
import { colorSpace } from "~/utils/regex";
import { isValidCss } from "~/utils/prefix";
import clsx from "clsx";

export default function InputCss() {
  const [color, setColor] = useColor();
  const [mode, setMode] = useMode();
  const [isHex, setIsHex] = useState<boolean>(false);

  const { rgb } = color;
  const currentColor = isHex ? formatHex(rgb.color) : switchCss(mode, color);

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
            setIsHex(true);
          }
          if (isColor) {
            setIsHex(false);
          }
          setColor(createColor(validColor));
          setMode(validColor.mode);
        }
      }
    },
    [focus, setColor, setMode],
  );

  return (
    <input
      aria-label="any color"
      type="text"
      pattern={colorSpace}
      autoFocus={focus}
      autoComplete="off"
      autoCapitalize="none"
      autoCorrect="false"
      spellCheck="false"
      required={true}
      value={focus ? input : currentColor}
      id="any-color"
      className={clsx(
        "inline-grid h-10 cursor-pointer rounded-md px-4 py-2 font-mono ring outline-0 focus:cursor-text",
        "bg-gray-100 ring-gray-200 focus:ring-gray-300 dark:bg-gray-900 dark:ring-gray-800 dark:focus:ring-gray-700",
        focus
          ? "text-gray-700 dark:text-gray-300"
          : "text-gray-600 dark:text-gray-400",
      )}
      tabIndex={0}
      onChange={handleInput}
      onFocus={() => {
        setInput(currentColor);
        setFocus(true);
      }}
      onBlur={() => setFocus(false)}
    />
  );
}

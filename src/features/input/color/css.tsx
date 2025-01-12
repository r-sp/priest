"use client";

import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import { useState, useCallback } from "react";
import { useColor, useMode } from "~/hooks";
import { createColor, formatHex, parseCss, switchCss } from "~/lib/color";
import { colorSpace } from "~/utils/regex";
import { isValidCss } from "~/utils/prefix";
import clsx from "clsx";

type SetHex = Dispatch<SetStateAction<boolean>>;
type SetFocus = Dispatch<SetStateAction<boolean>>;
type SetModal = Dispatch<SetStateAction<boolean>>;

export default function InputCss({
  hex,
  modal,
  focus,
  action,
}: {
  hex: boolean;
  modal: boolean;
  focus: boolean;
  action: [SetHex, SetFocus, SetModal];
}) {
  const [color, setColor] = useColor();
  const [mode, setMode] = useMode();

  const { rgb } = color;
  const currentColor = hex ? formatHex(rgb.color) : switchCss(mode, color);

  const [input, setInput] = useState<string>(currentColor);
  const [setHex, setFocus, setModal] = action;

  const handleInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newColor = e.target.value;
      const validColor = parseCss(newColor);

      if (focus) {
        setInput(newColor);
        if (validColor) {
          const [isHex, isColor] = isValidCss(newColor);
          if (isHex) {
            setHex(true);
          }
          if (isColor) {
            setHex(false);
          }
          setColor(createColor(validColor));
          setMode(validColor.mode);
        }
      }
    },
    [focus, setColor, setMode, setHex],
  );

  return (
    <input
      aria-label="any color"
      type="text"
      pattern={colorSpace}
      autoFocus={modal}
      autoComplete="off"
      autoCapitalize="none"
      autoCorrect="false"
      spellCheck="false"
      required={true}
      value={focus ? input : currentColor}
      id="any-color"
      className={clsx(
        "inline-grid h-10 rounded-md px-4 py-2 font-mono ring outline-0",
        "bg-gray-100 dark:bg-gray-900",
        modal
          ? "relative z-8 rounded-b-none ring-gray-300 dark:ring-gray-700"
          : "cursor-pointer ring-gray-200 focus:cursor-text focus-visible:z-69 dark:ring-gray-800",
        focus
          ? "text-gray-700 dark:text-gray-300"
          : "text-gray-600 dark:text-gray-400",
      )}
      tabIndex={0}
      onChange={handleInput}
      onFocus={() => {
        setInput(currentColor);
        setFocus(true);
        setModal(true);
      }}
      onBlur={() => setFocus(false)}
    />
  );
}

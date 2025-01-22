"use client";

import type { ChangeEvent } from "react";
import type { AnyColorMode, ColorMode } from "~/lib/types";
import { useState, useCallback } from "react";
import { parseCss, parseHex, switchCss, setGamut } from "~/lib";
import clsx from "clsx";

export default function InputCss({
  color,
  mode,
  action,
  prefix = "css",
  label = "input css",
}: {
  color: AnyColorMode;
  mode: ColorMode;
  action: (state: AnyColorMode, target: string) => void;
  prefix?: string;
  label?: string;
}) {
  const currentCss = mode === "hex" ? parseHex(color) : switchCss(color);

  const [input, setInput] = useState<string>(currentCss);
  const [focus, setFocus] = useState<boolean>(false);

  const handleInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newColor = e.target.value;
      const validColor = parseCss(newColor);

      if (focus) {
        setInput(newColor);
        if (validColor) {
          action(setGamut(validColor), newColor);
        }
      }
    },
    [focus, action],
  );

  return (
    <div role="form" aria-label={label} className="relative block h-10">
      <input
        type="text"
        autoFocus={focus}
        autoComplete="off"
        autoCapitalize="none"
        autoCorrect="false"
        spellCheck="false"
        value={focus ? input : currentCss}
        id={prefix}
        className={clsx(
          "absolute top-0 right-0 bottom-0 left-0 inline-block rounded-md px-4 py-2 font-mono ring outline-0",
          "bg-gray-100 dark:bg-gray-900",
          focus
            ? "cursor-text text-gray-700 ring-gray-300 dark:text-gray-300 dark:ring-gray-700"
            : "cursor-pointer text-gray-600 ring-gray-200 dark:text-gray-400 dark:ring-gray-800",
        )}
        tabIndex={0}
        onChange={handleInput}
        onFocus={() => {
          setInput(currentCss);
          setFocus(true);
        }}
        onBlur={() => setFocus(false)}
      />
    </div>
  );
}

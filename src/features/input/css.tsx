"use client";

import { useState, useCallback } from "react";
import { useColor, useMode } from "~/hooks";
import { createColor, parseCss, switchCss } from "~/lib/color";

export default function InputCss() {
  const [color, setColor] = useColor();
  const [mode, setMode] = useMode();

  const currentColor = switchCss(mode, color);

  const [input, setInput] = useState<string>(currentColor);
  const [focus, setFocus] = useState<boolean>(false);

  const updateColor = useCallback(
    (newColor: string) => {
      const currentColor = parseCss(newColor);

      if (focus) {
        setInput(newColor);
        if (currentColor) {
          setColor(createColor(currentColor));
          setMode(currentColor.mode);
        }
      }
    },
    [setColor, setMode, focus],
  );

  return (
    <input
      aria-label="any color"
      type="text"
      pattern="^(?:#(?:[0-9a-fA-F]{3}){1,2}|rgb(?:a)?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*(?:,\s*\d*(?:\.\d+)?)\s*\)|hsl(?:a)?\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*(?:,\s*\d*(?:\.\d+)?)\s*\)|hwb\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\)|lch\(\s*\d+(?:\.\d+)?\s*\d+(?:\.\d+)?\s*\d+(?:\.\d+)?\s*\)|oklch\(\s*\d+(?:\.\d+)?\s*\d+(?:\.\d+)?\s*\d+(?:\.\d+)?\s*\)|lab\(\s*\d+(?:\.\d+)?\s*\d+(?:\.\d+)?\s*\d+(?:\.\d+)?\s*\)|oklab\(\s*\d+(?:\.\d+)?\s*\d+(?:\.\d+)?\s*\d+(?:\.\d+)?\s*\))$"
      autoComplete="off"
      autoCapitalize="none"
      autoCorrect="false"
      spellCheck="false"
      value={focus ? input : currentColor}
      id="any-color"
      className="action inline-grid cursor-pointer rounded-md border border-neutral-400 px-3 py-2 font-mono transition-colors focus:cursor-text focus-visible:z-69 dark:border-neutral-700"
      onChange={(e) => updateColor(e.target.value)}
      onFocus={() => {
        setInput(currentColor);
        setFocus(true);
      }}
      onBlur={() => setFocus(false)}
    />
  );
}

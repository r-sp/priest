"use client";

import type { AnyColorMode } from "~/lib/types";
import { useState, useEffect, useCallback } from "react";
import { useColor, useMode } from "~/app/store";
import { createColor, parse } from "~/lib/color";

export default function ColorInput() {
  const [{ hex, rgb, hsl, hwb, lab, lch, oklab, oklch }, setColor] = useColor();
  const [mode, setMode] = useMode();

  const modeRgb = mode === "rgb";
  const modeHsl = mode === "hsl";
  const modeHwb = mode === "hwb";
  const modeLab = mode === "lab";
  const modeLch = mode === "lch";
  const modeOklab = mode === "oklab";
  const modeOklch = mode === "oklch";

  const color = modeRgb
    ? rgb.css
    : modeHsl
      ? hsl.css
      : modeHwb
        ? hwb.css
        : modeLab
          ? lab.css
          : modeLch
            ? lch.css
            : modeOklab
              ? oklab.css
              : modeOklch
                ? oklch.css
                : hex;

  const [input, setInput] = useState<string>(color);
  const [focus, setFocus] = useState<boolean>(false);

  const updateColor = useCallback(
    (newColor: string) => {
      const currentColor = parse(newColor) as AnyColorMode | undefined;

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

  useEffect(() => {
    if (color !== input && !focus) {
      setInput(color);
    }
  }, [color, input, focus]);

  return (
    <input
      aria-label="any color"
      type="text"
      pattern="^(?:#(?:[0-9a-fA-F]{3}){1,2}|rgb(?:a)?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*(?:,\s*\d*(?:\.\d+)?)\s*\)|hsl(?:a)?\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*(?:,\s*\d*(?:\.\d+)?)\s*\)|hwb\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\)|lch\(\s*\d+(?:\.\d+)?\s*\d+(?:\.\d+)?\s*\d+(?:\.\d+)?\s*\)|oklch\(\s*\d+(?:\.\d+)?\s*\d+(?:\.\d+)?\s*\d+(?:\.\d+)?\s*\)|lab\(\s*\d+(?:\.\d+)?\s*\d+(?:\.\d+)?\s*\d+(?:\.\d+)?\s*\)|oklab\(\s*\d+(?:\.\d+)?\s*\d+(?:\.\d+)?\s*\d+(?:\.\d+)?\s*\))$"
      autoComplete="off"
      autoCapitalize="off"
      autoCorrect="false"
      spellCheck="false"
      value={input}
      id="any-color"
      className="action inline-grid cursor-pointer rounded-md border border-neutral-400 px-3 py-2 font-mono transition-colors focus:cursor-text focus-visible:z-69 dark:border-neutral-700"
      onChange={(e) => updateColor(e.target.value)}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    />
  );
}

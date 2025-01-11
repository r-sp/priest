"use client";

import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import { useState, useCallback, startTransition } from "react";
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

      startTransition(() => {
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
      });
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
        "inline-grid h-10 rounded-md border px-3 py-2 font-mono transition-colors ease-in",
        modal
          ? "relative z-8 border-transparent"
          : "action cursor-pointer border-neutral-400 focus:cursor-text focus-visible:z-69 dark:border-neutral-700",
        modal && !focus && "rounded-b-none",
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

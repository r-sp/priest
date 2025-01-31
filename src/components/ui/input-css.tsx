"use client";

import type { ChangeEvent, KeyboardEvent } from "react";
import type { SessionCss } from "~/types/session";
import type { AnyColorMode, ColorState } from "~/types/color";
import { useState, useMemo, useCallback, useRef, Fragment } from "react";
import { useSession } from "~/hooks";
import { createPortal } from "react-dom";
import {
  createColor,
  createHue,
  createCss,
  convertCss,
  setGamut,
} from "~/utils";
import clsx from "clsx";
import Form from "next/form";
import ColorOptions from "./color-options";

export default function InputCss() {
  const session: SessionCss = useSession((state) => [
    state.color,
    state.mode,
    state.setColor,
    state.setMode,
    state.setHue,
  ]);
  const [color, mode, setColor, setMode, setHue] = useMemo(
    () => session,
    [session],
  );
  const currentColor = useMemo(() => createColor(color), [color]);
  const currentCss = useMemo(
    () => createCss(color, mode === "hex"),
    [color, mode],
  );

  const [input, setInput] = useState<string>(currentCss);
  const [focus, setFocus] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const ref = useRef<HTMLFormElement>(null);

  const handleInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const validColor = convertCss(value);

      if (focus) {
        setInput(value);
        if (validColor) {
          const COLOR_MODE = /^(rgb|hsl|hwb|lab|lch|oklab|oklch)\(/;
          const HEX_MODE = /^#([0-9A-Fa-f]{3}){1,2}$/;

          const currentColor = setGamut(validColor);
          const sharedColor = createColor(currentColor);

          const hue = createHue(sharedColor, currentColor.mode);

          if (COLOR_MODE.test(value)) {
            setMode(currentColor.mode);
          } else if (HEX_MODE.test(value)) {
            setMode("hex");
          } else {
            setMode(currentColor.mode);
          }
          setColor(currentColor);
          setHue({ color: hue, value: hue.h });
        }
      }
    },
    [focus, setColor, setMode, setHue],
  );

  const handleMode = useCallback(
    (state: AnyColorMode, format?: keyof ColorState) => {
      const hue = createHue(currentColor, format ? format : mode);
      setColor(state);
      setMode(format ? format : mode);
      setHue({ color: hue, value: hue.h });
    },
    [currentColor, mode, setColor, setMode, setHue],
  );

  const handleKeyboard = useCallback(
    (e: KeyboardEvent) => {
      const list = ref.current;
      if (!list) return;

      const tabs = Array.from<HTMLButtonElement>(
        list.querySelectorAll("button"),
      );

      const index = tabs.indexOf(document.activeElement as HTMLButtonElement);
      if (index < 0) return;

      const prevTab = () => {
        const next = (index - 1 + tabs.length) % tabs.length;
        tabs[next]?.focus();
        e.preventDefault();
      };

      const nextTab = () => {
        const next = (index + 1 + tabs.length) % tabs.length;
        tabs[next]?.focus();
        e.preventDefault();
      };

      if (!modal) return;

      if (e.shiftKey && e.key === "Tab") {
        prevTab();
      } else {
        switch (e.key) {
          case "ArrowUp":
          case "ArrowLeft": {
            prevTab();
            break;
          }
          case "Tab":
          case "ArrowDown":
          case "ArrowRight": {
            nextTab();
            break;
          }
          case "Escape": {
            setModal(false);
            break;
          }
        }
      }
    },
    [ref, modal, setModal],
  );

  return (
    <Form
      ref={ref}
      aria-label="color input"
      action="/color"
      id="color-input"
      className={clsx("relative grid", modal ? "z-69" : "z-0")}
      onSubmit={(e) => {
        e.preventDefault();
        setModal(false);
      }}
      onKeyDown={handleKeyboard}
    >
      <div role="none" className="relative z-4 inline-grid h-10">
        <input
          type="text"
          aria-label="color input css"
          autoFocus={focus}
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect="false"
          spellCheck="false"
          name="css"
          value={focus ? input : currentCss}
          id="input-css"
          className={clsx(
            "absolute top-0 right-0 bottom-0 left-0 inline-grid rounded-md px-4 py-2 font-mono ring outline-0",
            "bg-gray-100 dark:bg-gray-900",
            focus
              ? "cursor-text text-gray-700 ring-gray-300 dark:text-gray-300 dark:ring-gray-700"
              : "cursor-pointer text-gray-600 ring-gray-200 dark:text-gray-400 dark:ring-gray-800",
          )}
          onChange={handleInput}
          onFocus={() => {
            setInput(currentCss);
            setFocus(true);
            setModal(true);
          }}
          onBlur={() => setFocus(false)}
        />
      </div>
      <div role="none" id="input-portal">
        {modal
          ? createPortal(
              <Fragment>
                <ColorOptions
                  color={currentColor}
                  mode={mode}
                  action={handleMode}
                />
                <span
                  role="button"
                  aria-label="close color input mode"
                  className="fixed top-0 right-0 bottom-0 left-0 z-2"
                  tabIndex={0}
                  onFocus={() => setModal(false)}
                />
              </Fragment>,
              document.getElementById("input-portal") || document.body,
            )
          : null}
      </div>
    </Form>
  );
}

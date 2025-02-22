"use client";

import type { ChangeEvent, KeyboardEvent } from "react";
import type { SessionCss } from "~/types/session";
import type { AnyColorMode, ColorState } from "~/types/color";
import { useState, useMemo, useCallback, useRef } from "react";
import { useSession } from "~/hooks";
import { createPortal } from "react-dom";
import {
  createColor,
  createCss,
  convertCss,
  setGamut,
  generateColor,
} from "~/utils";
import { Icon } from "../common";
import clsx from "clsx";
import Form from "next/form";
import ColorOptions from "./color-options";

export default function InputCss() {
  const session: SessionCss = useSession((state) => [
    state.color,
    state.mode,
    state.setColor,
    state.setMode,
  ]);
  const [color, mode, setColor, setMode] = useMemo(() => session, [session]);
  const currentColor = useMemo(() => createColor(color), [color]);
  const currentCss = useMemo(
    () => createCss(color, mode === "hex"),
    [color, mode],
  );

  const [input, setInput] = useState<string>(currentCss);
  const [focus, setFocus] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const validColor = convertCss(value);

      if (focus) {
        setInput(value);
        if (validColor) {
          if (/^(rgb|hsl|hwb|lab|lch|oklab|oklch)\(/.test(value)) {
            setMode(validColor.mode);
          } else if (/^#([0-9A-Fa-f]{3}){1,2}$/.test(value)) {
            setMode("hex");
          } else {
            setMode(validColor.mode);
          }
          setColor(setGamut(validColor));
        }
      }
    },
    [focus, setColor, setMode],
  );

  const handleMode = useCallback(
    (state: AnyColorMode, format?: keyof ColorState) => {
      setColor(state);
      setMode(format ? format : mode);
    },
    [mode, setColor, setMode],
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

  const handleColor = useCallback(() => {
    setColor(generateColor(color.mode));
  }, [color, setColor]);

  return (
    <Form
      aria-label="color input"
      action="/color"
      id="color-input"
      className={clsx(
        "max-xs:hidden relative mx-auto grid max-w-128 grow-1",
        modal ? "z-50 max-sm:-mr-10 max-sm:-ml-12" : "z-0",
      )}
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
            "xs:pr-8 absolute top-0 right-0 bottom-0 left-0 inline-grid rounded-md px-4 py-2 font-mono ring outline-0",
            "cursor-pointer bg-gray-100 text-gray-600 ring-gray-200 dark:bg-gray-900 dark:text-gray-400 dark:ring-gray-800",
            "focus:cursor-text focus:text-gray-700 focus:ring-gray-300 dark:focus:text-gray-300 dark:focus:ring-gray-700",
          )}
          onChange={handleInput}
          onFocus={() => {
            setInput(currentCss);
            setFocus(true);
            setModal(true);
          }}
          onBlur={() => setFocus(false)}
        />
        <div
          role="none"
          className={clsx(
            "max-xs:hidden pointer-events-none absolute top-0 right-0 bottom-0 z-1 flex h-10 w-12 items-center justify-end overflow-hidden rounded-md",
            "bg-gradient-to-r from-gray-950/0 to-gray-100 to-40% text-gray-600 dark:to-gray-900 dark:text-gray-400",
          )}
        >
          <button
            aria-label="generate random color"
            className="pointer-events-auto inline-flex size-10 items-center justify-center rounded-md"
            tabIndex={-1}
            onClick={handleColor}
          >
            <Icon size="24" type="palette" className="size-6" />
          </button>
        </div>
      </div>
      <div ref={ref} role="none" id="input-portal">
        {modal
          ? createPortal(
              <>
                <ColorOptions
                  color={currentColor}
                  mode={mode}
                  action={handleMode}
                />
                <span
                  role="button"
                  aria-label="close modal"
                  className="fixed top-0 right-0 bottom-0 left-0 z-2 bg-gray-50/80 opacity-0 backdrop-blur-lg max-sm:opacity-100 dark:bg-gray-950/80"
                  tabIndex={0}
                  onFocus={() => setModal(false)}
                />
              </>,
              document.getElementById("input-portal") ?? document.body,
            )
          : null}
        {}
      </div>
    </Form>
  );
}

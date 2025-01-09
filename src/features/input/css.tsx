"use client";

import type { ColorFormat, OklchColor } from "~/lib/types";
import type { ReactNode, KeyboardEvent } from "react";
import { useState, useCallback, useRef } from "react";
import { useColor, useMode } from "~/hooks";
import { createColor, parseCss, switchCss, formatHex } from "~/lib/color";
import { isValidCss } from "~/utils/prefix";
import { colorSpace } from "~/utils/regex";
import { Inline, Separator } from "~/components";
import clsx from "clsx";

export default function InputCss() {
  const [color, setColor] = useColor();
  const [mode, setMode] = useMode();
  const { rgb, hsl, hwb, lab, lch, oklab, oklch } = color;
  const hex = formatHex(rgb.color);

  const [hexa, setHexa] = useState<boolean>(false);
  const currentColor = hexa ? hex : switchCss(mode, color);

  const [input, setInput] = useState<string>(currentColor);
  const [focus, setFocus] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);

  const refList = useRef<HTMLDivElement>(null);

  const updateColor = useCallback(
    (newColor: string) => {
      const validColor = parseCss(newColor);

      if (focus) {
        setInput(newColor);
        if (validColor) {
          const [isHex, isColor] = isValidCss(newColor);
          if (isHex) {
            setHexa(true);
          }
          if (isColor) {
            setHexa(false);
          }
          setColor(createColor(validColor));
          setMode(validColor.mode);
        }
      }
    },
    [setColor, setMode, focus],
  );

  const previewColor = useCallback(
    (newColor: OklchColor) =>
      switchCss(mode, createColor({ mode: "oklch", ...newColor })),
    [mode],
  );

  const handleModal = useCallback(
    (type: ColorFormat | "hex") => {
      if (type === "hex") {
        setHexa(true);
        setMode("rgb");
      } else {
        setHexa(false);
        setMode(type);
      }
      setModal(false);
    },
    [setMode],
  );

  const handleKeyboard = useCallback(
    (e: KeyboardEvent) => {
      const list = refList.current;
      if (!list) return;

      const tabs = Array.from<HTMLDivElement>(
        list.querySelectorAll("*[tabindex]"),
      );

      const index = tabs.indexOf(document.activeElement as HTMLDivElement);
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
            setFocus(false);
            setModal(false);
            break;
          }
        }
      }
    },
    [refList, modal],
  );

  const light = previewColor({ l: 1, c: oklch.color.c, h: oklch.color.h! });
  const dark = previewColor({ l: 0.2, c: oklch.color.c, h: oklch.color.h! });

  return (
    <Inline
      role="none"
      className="flex items-center gap-x-2"
      bg={`radial-gradient(at 25% 25%, ${light},${dark} 75%)`}
    >
      <span
        role="presentation"
        className="bg-gradient-ref size-10 grow-0 rounded-3xl"
      ></span>
      <div
        ref={refList}
        role="none"
        className={clsx(modal && "relative z-16", "grid max-w-lg grow-1")}
        onKeyDown={handleKeyboard}
      >
        <input
          aria-label="any color"
          type="text"
          pattern={colorSpace}
          autoFocus={modal}
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect="false"
          spellCheck="false"
          value={focus ? input : currentColor}
          id="any-color"
          className={clsx(
            "action inline-grid h-10 cursor-pointer border px-3 py-2 font-mono transition-colors ease-in focus:cursor-text",
            modal
              ? "relative z-8 rounded-md rounded-b-none border-transparent"
              : "rounded-3xl border-neutral-400 focus-visible:z-69 dark:border-neutral-700",
          )}
          tabIndex={0}
          onChange={(e) => updateColor(e.target.value)}
          onFocus={() => {
            setInput(currentColor);
            setFocus(true);
            setModal(true);
          }}
          onBlur={() => setFocus(false)}
        />
        {modal ? (
          <ol
            aria-label="color conversion"
            className="absolute top-0 right-0 left-0 z-4 grid rounded-md border border-neutral-400 bg-neutral-50 pt-10 pb-2 text-neutral-500 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-400"
          >
            <Separator
              as="li"
              role="none"
              className="mb-2"
              style={{ marginTop: "-2px" }}
            />
            {!hexa && (
              <Item label="hex">
                <Button label={hex} onClick={() => handleModal("hex")} />
              </Item>
            )}
            {hexa && mode === "rgb" && (
              <Item label="rgb">
                <Button label={rgb.css} onClick={() => handleModal("rgb")} />
              </Item>
            )}
            {mode !== "rgb" && (
              <Item label="rgb">
                <Button label={rgb.css} onClick={() => handleModal("rgb")} />
              </Item>
            )}
            {mode !== "hsl" && (
              <Item label="hsl">
                <Button label={hsl.css} onClick={() => handleModal("hsl")} />
              </Item>
            )}
            {mode !== "hwb" && (
              <Item label="hwb">
                <Button label={hwb.css} onClick={() => handleModal("hwb")} />
              </Item>
            )}
            <Separator as="li" className="my-2" />
            {mode !== "lch" && (
              <Item label="lch">
                <Button label={lch.css} onClick={() => handleModal("lch")} />
              </Item>
            )}
            {mode !== "oklch" && (
              <Item label="oklch">
                <Button
                  label={oklch.css}
                  onClick={() => handleModal("oklch")}
                />
              </Item>
            )}
            {mode !== "lab" && (
              <Item label="lab">
                <Button label={lab.css} onClick={() => handleModal("lab")} />
              </Item>
            )}
            {mode !== "oklab" && (
              <Item label="oklab">
                <Button
                  label={oklab.css}
                  onClick={() => handleModal("oklab")}
                />
              </Item>
            )}
          </ol>
        ) : null}
      </div>
      {modal ? (
        <span
          role="button"
          aria-label="close color conversion"
          className="overlay fixed z-12"
          tabIndex={0}
          onFocus={() => {
            setFocus(false);
            setModal(false);
          }}
        ></span>
      ) : null}
    </Inline>
  );
}

function Item({ children, label }: { children: ReactNode; label: string }) {
  return (
    <li aria-label={label} className="relative inline-grid">
      {children}
    </li>
  );
}

function Button({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      className="action flex items-center justify-start px-3 py-1"
      tabIndex={0}
      onClick={onClick}
    >
      <code className="inline-flex">{label}</code>
    </button>
  );
}

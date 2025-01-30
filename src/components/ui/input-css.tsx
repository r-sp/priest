"use client";

import type { ChangeEvent, KeyboardEvent } from "react";
import type { SessionCss } from "~/types/session";
import type { AnyColorMode, ColorState, ColorLabel } from "~/types/color";
import { useState, useMemo, useCallback, Fragment } from "react";
import { useSession } from "~/hooks";
import { createColor, createHue, createCss } from "~/utils/format";
import { convertCss } from "~/utils/convert";
import { setGamut } from "~/utils/gamut";
import clsx from "clsx";
import Form from "next/form";

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
    (state: AnyColorMode, format: keyof ColorState) => {
      const hue = createHue(currentColor, format);
      setColor(state);
      setMode(format);
      setHue({ color: hue, value: hue.h });
    },
    [currentColor, setColor, setMode, setHue],
  );

  const handleKeyboard = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "Enter":
        case "Escape": {
          setModal(false);
          e.preventDefault();
          break;
        }
      }
    },
    [setModal],
  );

  const { hex, rgb, hsl, hwb, lab, lch, oklab, oklch } = currentColor;

  const modeHex = mode === "hex";
  const modeRgb = mode === "rgb";
  const modeHsl = mode === "hsl";
  const modeHwb = mode === "hwb";
  const modeLab = mode === "lab";
  const modeLch = mode === "lch";
  const modeOklab = mode === "oklab";
  const modeOklch = mode === "oklch";

  return (
    <Form
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
          tabIndex={0}
          onChange={handleInput}
          onFocus={() => {
            setInput(currentCss);
            setFocus(true);
            setModal(true);
          }}
          onBlur={() => setFocus(false)}
        />
      </div>
      {modal ? (
        <Fragment>
          <fieldset
            role="listbox"
            className={clsx(
              "absolute top-0 right-0 left-0 z-3 grid rounded-md px-2 pt-12 pb-2 break-words ring select-none",
              "bg-gray-100 text-gray-600 ring-gray-200 dark:bg-gray-900 dark:text-gray-400 dark:ring-gray-800",
            )}
          >
            <legend className="sr-only">select color mode</legend>
            {!modeHex ? (
              <div role="none">
                <input
                  role="option"
                  aria-selected={modeHex}
                  type="radio"
                  checked={modeHex}
                  id="mode-hex"
                  className="sr-only"
                  name="mode"
                  value="hex"
                  onChange={() =>
                    handleMode({ mode: "rgb", ...rgb.color }, "hex")
                  }
                />
                <label
                  htmlFor="mode-hex"
                  className={clsx(
                    "flex cursor-pointer rounded-md px-2 py-2",
                    "hover:bg-gray-200 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200",
                  )}
                >
                  <code>{hex}</code>
                </label>
              </div>
            ) : null}
            {!modeRgb ? (
              <InputOption
                color={{ mode: "rgb", ...rgb.color }}
                label={["red", "green", "blue"]}
                offset={[
                  { min: 0, max: 255 },
                  { min: 0, max: 255 },
                  { min: 0, max: 255 },
                ]}
                isActive={modeRgb}
                action={handleMode}
              />
            ) : null}
            {!modeHsl ? (
              <InputOption
                color={{ mode: "hsl", ...hsl.color }}
                label={["hue", "saturation", "lightness"]}
                offset={[
                  { min: 0, max: 360 },
                  { min: 0, max: 100 },
                  { min: 0, max: 100 },
                ]}
                isActive={modeHsl}
                action={handleMode}
              />
            ) : null}
            {!modeHwb ? (
              <InputOption
                color={{ mode: "hwb", ...hwb.color }}
                label={["hue", "whiteness", "blackness"]}
                offset={[
                  { min: 0, max: 360 },
                  { min: 0, max: 100 },
                  { min: 0, max: 100 },
                ]}
                isActive={modeHwb}
                action={handleMode}
              />
            ) : null}
            <div
              role="none"
              className="my-2 border-t border-t-gray-200 dark:border-t-gray-800"
            ></div>
            {!modeLch ? (
              <InputOption
                color={{ mode: "lch", ...lch.color }}
                label={["lightness", "chroma", "hue"]}
                offset={[
                  { min: 0, max: 100 },
                  { min: 0, max: 150 },
                  { min: 0, max: 360 },
                ]}
                isActive={modeLch}
                action={handleMode}
              />
            ) : null}
            {!modeOklch ? (
              <InputOption
                color={{ mode: "oklch", ...oklch.color }}
                label={["lightness", "chroma", "hue"]}
                offset={[
                  { min: 0, max: 1 },
                  { min: 0, max: 0.4 },
                  { min: 0, max: 360 },
                ]}
                isActive={modeOklch}
                action={handleMode}
              />
            ) : null}
            {!modeLab ? (
              <InputOption
                color={{ mode: "lab", ...lab.color }}
                label={["lightness", "green-red", "blue-yellow"]}
                offset={[
                  { min: 0, max: 100 },
                  { min: -100, max: 100 },
                  { min: -100, max: 100 },
                ]}
                isActive={modeLab}
                action={handleMode}
              />
            ) : null}
            {!modeOklab ? (
              <InputOption
                color={{ mode: "oklab", ...oklab.color }}
                label={["lightness", "green-red", "blue-yellow"]}
                offset={[
                  { min: 0, max: 1 },
                  { min: -0.4, max: 0.4 },
                  { min: -0.4, max: 0.4 },
                ]}
                isActive={modeOklab}
                action={handleMode}
              />
            ) : null}
          </fieldset>
          <span
            role="button"
            aria-label="close color mode"
            className="fixed top-0 right-0 bottom-0 left-0 z-1"
            tabIndex={0}
            onFocus={() => {
              setFocus(false);
              setModal(false);
            }}
          ></span>
        </Fragment>
      ) : null}
    </Form>
  );
}

interface ColorOption {
  color: AnyColorMode;
  label: [ColorLabel, ColorLabel, ColorLabel];
  offset: [
    { min: number; max: number },
    { min: number; max: number },
    { min: number; max: number },
  ];
  action: (color: AnyColorMode, mode: keyof ColorState) => void;
  isActive: boolean;
}

function InputOption({ color, label, offset, action, isActive }: ColorOption) {
  const mode = color.mode;
  const option = `mode-${mode}`;

  const [startLabel, middleLabel, endLabel] = label;
  const [startOffset, middleOffset, endOffset] = offset;
  const startValue = Object.values(color)[1] as number;
  const middleValue = Object.values(color)[2] as number;
  const endValue = Object.values(color)[3] as number;

  const noticeError = (range: boolean): string | undefined => {
    return range ? "text-red-700 dark:text-red-400" : undefined;
  };

  return (
    <div role="none">
      <input
        role="option"
        aria-selected={isActive}
        type="radio"
        checked={isActive}
        id={option}
        className="sr-only"
        name="mode"
        value={mode}
        onChange={() => action(color, mode)}
      />
      <label
        htmlFor={option}
        className={clsx(
          "flex cursor-pointer rounded-md px-2 py-2",
          "hover:bg-gray-200 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200",
        )}
      >
        <code>
          <span>{`${mode}(`}</span>
          <span
            role="none"
            title={startLabel}
            className={noticeError(
              startValue < startOffset.min || startValue > startOffset.max,
            )}
          >
            {startValue}
          </span>
          {` `}
          <span
            role="none"
            title={middleLabel}
            className={noticeError(
              middleValue < middleOffset.min || middleValue > middleOffset.max,
            )}
          >
            {middleValue}
          </span>
          {` `}
          <span
            role="none"
            title={endLabel}
            className={noticeError(
              endValue < endOffset.min || endValue > endOffset.max,
            )}
          >
            {endValue}
          </span>
          <span>{`)`}</span>
        </code>
      </label>
    </div>
  );
}

"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { useColorProvider } from "../provider";
import { stringifyHsl, stringifyRgb } from "~/lib/utils";

import Input from "../input";
import Hue from "@uiw/react-color-hue";
import Saturation from "@uiw/react-color-saturation";
import ShadeSlider from "@uiw/react-color-shade-slider";

export default function ColorPicker() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { rgb } = useColorProvider();

  return (
    <div className="relative max-sm:pointer-events-auto" role="none">
      <button
        aria-expanded={showModal}
        aria-controls="color-picker-modal"
        aria-haspopup="dialog"
        className="flex size-8 items-center justify-center rounded-2xl"
        style={{ backgroundColor: stringifyRgb(rgb) }}
        onClick={() => setShowModal(!showModal)}
      >
        <span className="sr-only">{showModal ? "close color picker" : "open color picker"}</span>
      </button>
      <div role="dialog" aria-modal="true" aria-hidden={!showModal} aria-label="color picker" id="color-picker-portal"></div>
      {showModal ? createPortal(<ColorHsv />, document.getElementById("color-picker-portal") || document.body) : null}
      {showModal
        ? createPortal(
            <span aria-hidden="true" className="overlay z-20" tabIndex={0} onFocus={() => setShowModal(false)}></span>,
            document.getElementById("color-picker-portal") || document.body,
          )
        : null}
    </div>
  );
}

export function ColorHsv() {
  const { hsv, setHsv, hex, hsl, rgb } = useColorProvider();

  const [format, setFormat] = useState<"hex" | "hsl" | "rgb">("hex");
  const [colorFormat, setColorFormat] = useState<boolean>(false);

  const updateHsv = (newColor: typeof hsv | Partial<typeof hsv>) => setHsv({ ...hsv, ...newColor });

  return (
    <div
      className="absolute left-0 top-0 z-30 max-w-72 overflow-hidden rounded border border-solid border-holy-800 bg-holy-900"
      role="none"
    >
      <div role="toolbar" aria-label="saturation" className="pick-saturation">
        <Saturation hsva={hsv} hue={hsv.h} style={{ height: "100%", width: "100%" }} onChange={updateHsv} />
      </div>
      <div className="relative p-4" role="none">
        <div className="flex flex-row gap-4">
          <div className="unresponsive flex">
            <span className="inline-flex h-12 w-12 rounded-3xl" style={{ backgroundColor: stringifyRgb(rgb) }}></span>
          </div>
          <div className="flex flex-col gap-4">
            <div role="toolbar" aria-label="hue" className="pick-hue">
              <Hue hue={hsv.h} onChange={updateHsv} />
            </div>
            <div role="toolbar" aria-label="lightness" className="pick-lightness">
              <ShadeSlider hsva={hsv} onChange={updateHsv} />
            </div>
          </div>
        </div>
        <div className="unresponsive mt-4 flex max-w-max flex-row gap-2">
          {format === "hex" ? <ColorHex /> : format === "hsl" ? <ColorHsl /> : format === "rgb" ? <ColorRgb /> : null}

          <button
            aria-label="change format color"
            className="flex h-6 w-6 items-center justify-center rounded text-holy-400"
            onClick={() => setColorFormat(!colorFormat)}
          >
            <svg aria-hidden="true" className="h-4 w-4" height={16} width={16} viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12 21.6538L6.34625 16L7.4155 14.9308L12 19.4962L16.5845 14.9308L17.6538 16L12 21.6538ZM7.43075 9.05375L6.34625 8L12 2.34625L17.6538 8L16.5693 9.05375L12 4.50375L7.43075 9.05375Z"
              />
            </svg>
          </button>
        </div>
        <div id="color-format-portal"></div>
        {colorFormat
          ? createPortal(
              <div
                className="absolute bottom-2 left-2 right-2 z-50 flex flex-col rounded border border-solid border-holy-700 bg-holy-900 py-2"
                onClick={() => setColorFormat(false)}
              >
                {format !== "hex" ? (
                  <button
                    className="px-4 py-1 text-center font-mono text-xs font-normal text-holy-200 hover:bg-holy-800"
                    onClick={() => setFormat("hex")}
                  >
                    {hex}
                  </button>
                ) : null}
                {format !== "hsl" ? (
                  <button
                    className="px-4 py-1 text-center font-mono text-xs font-normal text-holy-200 hover:bg-holy-800"
                    onClick={() => setFormat("hsl")}
                  >
                    {stringifyHsl(hsl)}
                  </button>
                ) : null}
                {format !== "rgb" ? (
                  <button
                    className="px-4 py-1 text-center font-mono text-xs font-normal text-holy-200 hover:bg-holy-800"
                    onClick={() => setFormat("rgb")}
                  >
                    {stringifyRgb(rgb)}
                  </button>
                ) : null}
              </div>,
              document.getElementById("color-format-portal") || document.body,
            )
          : null}
        {colorFormat
          ? createPortal(
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 right-0 top-0 z-40 bg-holy-900 opacity-90"
                tabIndex={0}
                onFocus={() => setColorFormat(false)}
              ></span>,
              document.getElementById("color-format-portal") || document.body,
            )
          : null}
      </div>
    </div>
  );
}

export function ColorHex() {
  const { hex, setHex, convert } = useColorProvider();

  const updateHex = (value: string) => {
    const currentColor = convert(value);
    const isValidColor = currentColor.isValid();

    if (isValidColor) {
      const newColor = currentColor.minify({ alphaHex: true });

      setHex(newColor);
    }
    return value;
  };

  return (
    <div className="input-hex flex flex-col gap-1">
      <Input
        type="text"
        name="hex"
        id="hex"
        autoCorrect="false"
        autoComplete="false"
        value={hex}
        update={(e) => updateHex(e.target.value)}
        leave={(e) => {
          if (hex !== e.target.value) {
            e.target.value = hex;
          }
        }}
        className="h-6 w-56 rounded bg-holy-800 text-center font-mono text-xs font-normal text-holy-100"
      />
      <label htmlFor="hex" className="text-center text-xs font-medium text-holy-300">
        HEX
      </label>
    </div>
  );
}

export function ColorHsl() {
  const { hsl, setHsl } = useColorProvider();

  const updateHsl = (newColor: Partial<typeof hsl>) => setHsl({ ...hsl, ...newColor });

  return (
    <div className="input-hsl flex max-w-max flex-row gap-4">
      <div className="inline-flex flex-col gap-1">
        <input
          type="number"
          name="hsl"
          id="input-hsl-hue"
          min={0}
          max={360}
          value={hsl.h}
          className="h-6 w-11 rounded bg-holy-800 text-center font-mono text-xs font-normal text-holy-100"
          onChange={(e) => updateHsl({ h: e.target.valueAsNumber })}
        />
        <label htmlFor="input-hsl-hue" className="text-center text-xs font-medium text-holy-300">
          H
        </label>
      </div>
      <div className="inline-flex flex-col gap-1">
        <input
          type="number"
          name="hsl"
          id="input-hsl-saturation"
          min={0}
          max={100}
          value={hsl.s}
          className="h-6 w-11 rounded bg-holy-800 text-center font-mono text-xs font-normal text-holy-100"
          onChange={(e) => updateHsl({ s: e.target.valueAsNumber })}
        />
        <label htmlFor="input-hsl-saturation" className="text-center text-xs font-medium text-holy-300">
          S
        </label>
      </div>
      <div className="inline-flex flex-col gap-1">
        <input
          type="number"
          name="hsl"
          id="input-hsl-lightness"
          min={0}
          max={100}
          value={hsl.l}
          className="h-6 w-11 rounded bg-holy-800 text-center font-mono text-xs font-normal text-holy-100"
          onChange={(e) => updateHsl({ l: e.target.valueAsNumber })}
        />
        <label htmlFor="input-hsl-lightness" className="text-center text-xs font-medium text-holy-300">
          L
        </label>
      </div>
      <div className="inline-flex flex-col gap-1">
        <input
          type="number"
          name="hsl"
          id="input-hsl-alpha"
          min={0}
          max={1}
          step={0.01}
          value={hsl.a}
          className="h-6 w-11 rounded bg-holy-800 text-center font-mono text-xs font-normal text-holy-100"
          onChange={(e) => updateHsl({ a: e.target.valueAsNumber })}
        />
        <label htmlFor="input-hsl-alpha" className="text-center text-xs font-medium text-holy-300">
          A
        </label>
      </div>
    </div>
  );
}

export function ColorRgb() {
  const { rgb, setRgb } = useColorProvider();

  const updateRgb = (newColor: Partial<typeof rgb>) => setRgb({ ...rgb, ...newColor });

  return (
    <div className="input-rgb flex max-w-max flex-row gap-4">
      <div className="inline-flex flex-col gap-1">
        <input
          type="number"
          name="rgb"
          id="input-rgb-red"
          min={0}
          max={255}
          value={rgb.r}
          className="h-6 w-11 rounded bg-holy-800 text-center font-mono text-xs font-normal text-holy-100"
          onChange={(e) => updateRgb({ r: e.target.valueAsNumber })}
        />
        <label htmlFor="input-rgb-red" className="text-center text-xs font-medium text-holy-300">
          R
        </label>
      </div>
      <div className="inline-flex flex-col gap-1">
        <input
          type="number"
          name="rgb"
          id="input-rgb-green"
          min={0}
          max={255}
          value={rgb.g}
          className="h-6 w-11 rounded bg-holy-800 text-center font-mono text-xs font-normal text-holy-100"
          onChange={(e) => updateRgb({ g: e.target.valueAsNumber })}
        />
        <label htmlFor="input-rgb-green" className="text-center text-xs font-medium text-holy-300">
          G
        </label>
      </div>
      <div className="inline-flex flex-col gap-1">
        <input
          type="number"
          name="rgb"
          id="input-rgb-blue"
          min={0}
          max={255}
          value={rgb.b}
          className="h-6 w-11 rounded bg-holy-800 text-center font-mono text-xs font-normal text-holy-100"
          onChange={(e) => updateRgb({ b: e.target.valueAsNumber })}
        />
        <label htmlFor="input-rgb-blue" className="text-center text-xs font-medium text-holy-300">
          B
        </label>
      </div>
      <div className="inline-flex flex-col gap-1">
        <input
          type="number"
          name="rgb"
          id="input-rgb-alpha"
          min={0}
          max={1}
          step={0.01}
          value={rgb.a}
          className="h-6 w-11 rounded bg-holy-800 text-center font-mono text-xs font-normal text-holy-100"
          onChange={(e) => updateRgb({ a: e.target.valueAsNumber })}
        />
        <label htmlFor="input-rgb-alpha" className="text-center text-xs font-medium text-holy-300">
          A
        </label>
      </div>
    </div>
  );
}

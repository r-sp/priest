"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { useColorProvider } from "../provider";
import { convertColor, getRandomColor } from "~/lib/utils";

import Input from "../input";
import Hue from "@uiw/react-color-hue";
import Saturation from "@uiw/react-color-saturation";
import ShadeSlider from "@uiw/react-color-shade-slider";

export default function ColorPicker() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { hex, setHex, css } = useColorProvider();

  const updateRaw = (value: string) => {
    const currentColor = convertColor(value);
    const isValidColor = currentColor.isValid();

    if (isValidColor) {
      const newColor = currentColor.minify({ alphaHex: true });

      setHex(newColor);
    }

    return value;
  };

  const randomColor = () => {
    const color = getRandomColor();

    setHex(color.hex);
  };

  return (
    <div className="relative">
      <div className="grid-cols-picker relative grid max-w-screen-xs gap-1">
        <button
          className="absolute left-0 top-0 z-10 flex overflow-hidden rounded-2xl"
          tabIndex={-1}
          onClick={() => setShowModal(!showModal)}
        >
          <span className="pointer-events-none inline-flex size-8" style={{ backgroundColor: css.rgb }}></span>
        </button>
        <div className="input-raw relative flex h-8 w-full">
          <label htmlFor="raw" className="sr-only">
            Edit Color
          </label>
          <Input
            type="text"
            name="raw"
            id="raw"
            autoCorrect="false"
            autoComplete="false"
            value={hex}
            update={(e) => updateRaw(e.target.value)}
            className="absolute bottom-0 left-0 right-0 top-0 rounded-2xl border border-solid border-holy-700 pl-10 pr-4 text-left font-mono text-sm font-normal text-holy-100 hover:bg-holy-800 focus:z-10 focus:hover:bg-inherit"
          />
        </div>
        <button className="flex size-8 items-center justify-center rounded-2xl text-holy-300" onClick={randomColor}>
          <svg className="size-6" viewBox="0 0 24 24" fill="none">
            <path
              fill="currentColor"
              d="M5.16725 15.627C4.86475 15.0642 4.63625 14.4831 4.48175 13.8838C4.32725 13.2843 4.25 12.673 4.25 12.05C4.25 9.88717 5.00258 8.0465 6.50775 6.528C8.01292 5.00933 9.84367 4.25 12 4.25H12.7808L10.9308 2.4L11.9845 1.34625L15.6385 5L11.9845 8.65375L10.9308 7.6L12.7808 5.75H12C10.2628 5.75 8.78683 6.3615 7.572 7.5845C6.35733 8.80767 5.75 10.2962 5.75 12.05C5.75 12.4642 5.79517 12.8779 5.8855 13.2912C5.976 13.7047 6.11158 14.1083 6.29225 14.502L5.16725 15.627ZM12.0155 22.6538L8.3615 19L12.0155 15.3462L13.0693 16.4L11.2192 18.25H12C13.7372 18.25 15.2132 17.6385 16.428 16.4155C17.6427 15.1923 18.25 13.7038 18.25 11.95C18.25 11.5358 18.2048 11.1221 18.1145 10.7087C18.024 10.2952 17.8884 9.89167 17.7078 9.498L18.8328 8.373C19.1353 8.93583 19.3637 9.51692 19.5182 10.1163C19.6727 10.7158 19.75 11.327 19.75 11.95C19.75 14.1128 18.9974 15.9535 17.4923 17.472C15.9871 18.9907 14.1563 19.75 12 19.75H11.2192L13.0693 21.6L12.0155 22.6538Z"
            />
          </svg>
        </button>
      </div>
      <div id="color-picker-portal"></div>
      {showModal ? createPortal(<ColorHsv />, document.getElementById("color-picker-portal") || document.body) : null}
      {showModal
        ? createPortal(
            <span className="overlay z-20" tabIndex={0} onFocus={() => setShowModal(false)}></span>,
            document.getElementById("color-picker-portal") || document.body,
          )
        : null}
    </div>
  );
}

export function ColorHsv() {
  const { hsv, setHsv, css } = useColorProvider();

  const [format, setFormat] = useState<"hex" | "hsl" | "rgb">("hex");
  const [colorFormat, setColorFormat] = useState<boolean>(false);

  const updateHsv = (newColor: typeof hsv | Partial<typeof hsv>) => setHsv({ ...hsv, ...newColor });

  return (
    <div className="absolute left-0 top-0 z-30 max-w-72 overflow-hidden rounded border border-solid border-holy-700 bg-holy-900">
      <div className="pick-saturation">
        <Saturation hsva={hsv} hue={hsv.h} style={{ height: "100%", width: "100%" }} onChange={updateHsv} />
      </div>
      <div className="relative p-4">
        <div className="flex flex-row gap-4">
          <div className="unresponsive flex">
            <span className="inline-flex h-12 w-12 rounded-3xl" style={{ backgroundColor: css.rgb }}></span>
          </div>
          <div className="flex flex-col gap-4">
            <div className="pick-hue">
              <Hue hue={hsv.h} onChange={updateHsv} />
            </div>
            <div className="pick-lightness">
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
                    {css.hex}
                  </button>
                ) : null}
                {format !== "hsl" ? (
                  <button
                    className="px-4 py-1 text-center font-mono text-xs font-normal text-holy-200 hover:bg-holy-800"
                    onClick={() => setFormat("hsl")}
                  >
                    {css.hsl}
                  </button>
                ) : null}
                {format !== "rgb" ? (
                  <button
                    className="px-4 py-1 text-center font-mono text-xs font-normal text-holy-200 hover:bg-holy-800"
                    onClick={() => setFormat("rgb")}
                  >
                    {css.rgb}
                  </button>
                ) : null}
              </div>,
              document.getElementById("color-format-portal") || document.body,
            )
          : null}
        {colorFormat
          ? createPortal(
              <span
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
  const { hex, setHex } = useColorProvider();

  const updateHex = (value: string) => {
    const currentColor = convertColor(value);
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

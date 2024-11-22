"use client";

import chroma from "chroma-js";
import { useColorProvider } from "~/lib/provider";
import { getRandomColor } from "~/lib/color";

export default function ColorBlind() {
  const { css, setRaw, setHex, setHsl, setHsv, setRgb } = useColorProvider();

  const alt = chroma(css.hex);
  const sec = {
    hex: alt.hex("auto"),
    hsl: alt.css("hsl"),
    // @ts-expect-error: Unreachable code error
    // https://gka.github.io/chroma.js/#color-css
    // Accepted color spaces are rgb, hsl, lab, lch, oklab, and oklch.
    rgb: alt.css("rgb"),
  };

  const randomColor = () => {
    const color = getRandomColor();
    const random = {
      raw: color.toRgb(),
      hex: color.toHex(),
      hsl: color.toHsl(),
      hsv: color.toHsv(),
      rgb: color.toRgb(),
    };

    setRaw(random.raw);
    setHex(random.hex);
    setHsl(random.hsl);
    setHsv(random.hsv);
    setRgb(random.rgb);
  };

  return (
    <div className="px-4 xl:mx-auto xl:max-w-screen-xl">
      <div className="grid gap-8 xs:grid-cols-2">
        <div className="grid gap-2">
          <div className="size-8" style={{ backgroundColor: css.rgb }}></div>
          <div className="font-mono text-base font-medium text-holy-100">
            <span>colord</span>
          </div>
          <div className="font-mono text-sm font-normal text-holy-300">
            <span>{css.hex}</span>
          </div>
          <div className="font-mono text-sm font-normal text-holy-300">
            <span>{css.hsl}</span>
          </div>
          <div className="font-mono text-sm font-normal text-holy-300">
            <span>{css.rgb}</span>
          </div>
        </div>
        <div className="grid gap-2">
          <div className="size-8" style={{ backgroundColor: sec.rgb }}></div>
          <div className="font-mono text-base font-medium text-holy-100">
            <span>chroma.js</span>
          </div>
          <div className="font-mono text-sm font-normal text-holy-300">
            <span>{sec.hex}</span>
          </div>
          <div className="font-mono text-sm font-normal text-holy-300">
            <span>{sec.hsl}</span>
          </div>
          <div className="font-mono text-sm font-normal text-holy-300">
            <span>{sec.rgb}</span>
          </div>
        </div>
      </div>
      <div className="mt-8 flex justify-end">
        <button
          className="inline-flex max-w-max rounded-md border border-solid border-holy-700 px-4 py-2 font-sans text-sm font-normal text-holy-300"
          onClick={randomColor}
        >
          <span>Random Color</span>
        </button>
      </div>
    </div>
  );
}

"use client";

import { useColorStore } from "~/app/provider";
import {
  parseRgb,
  parseHsl,
  parseHwb,
  parseLab,
  parseLch,
  parseOklab,
  parseOklch,
} from "~/lib/parse";
import InputRgb from "./input/rgb";
import InputHsl from "./input/hsl";
import InputHwb from "./input/hwb";
import InputLab from "./input/lab";
import InputLch from "./input/lch";
import InputOklab from "./input/oklab";
import InputOklch from "./input/oklch";

export default function ColorPicker({
  showColorMode = true,
}: {
  showColorMode?: boolean;
}) {
  // prettier-ignore
  const {
    rgb, hsl, hwb, lab, lch, oklab, oklch, mode,
    setHex, setRgb, setHsl, setHwb, setLab, setLch, setOklab, setOklch,
  } = useColorStore((state) => state);

  const modeRgb = mode === "rgb";
  const modeHsl = mode === "hsl";
  const modeHwb = mode === "hwb";
  const modeLab = mode === "lab";
  const modeLch = mode === "lch";
  const modeOklab = mode === "oklab";
  const modeOklch = mode === "oklch";

  return (
    <div role="none" className="mx-auto inline-grid w-full max-w-3xl gap-4">
      {showColorMode ? (
        <h1 id="color" className="text-neutral-800 dark:text-neutral-200">
          <code>
            {modeRgb
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
                          : oklch.css}
          </code>
        </h1>
      ) : null}
      {modeRgb ? (
        <InputRgb
          id="color-rgb"
          onChange={(c) => {
            setHex(c);
            setHsl(parseHsl({ mode: "rgb", ...c }).color);
            setHwb(parseHwb({ mode: "rgb", ...c }).color);
            setLab(parseLab({ mode: "rgb", ...c }).color);
            setLch(parseLch({ mode: "rgb", ...c }).color);
            setOklab(parseOklab({ mode: "rgb", ...c }).color);
            setOklch(parseOklch({ mode: "rgb", ...c }).color);
          }}
        />
      ) : modeHsl ? (
        <InputHsl
          id="color-hsl"
          onChange={(c) => {
            const _rgb = parseRgb({ mode: "hsl", ...c }).color;
            setHex(_rgb);
            setRgb(_rgb);
            setHwb(parseHwb({ mode: "hsl", ...c }).color);
            setLab(parseLab({ mode: "hsl", ...c }).color);
            setLch(parseLch({ mode: "hsl", ...c }).color);
            setOklab(parseOklab({ mode: "hsl", ...c }).color);
            setOklch(parseOklch({ mode: "hsl", ...c }).color);
          }}
        />
      ) : modeHwb ? (
        <InputHwb
          id="color-hwb"
          onChange={(c) => {
            const _rgb = parseRgb({ mode: "hwb", ...c }).color;
            setHex(_rgb);
            setRgb(_rgb);
            setHsl(parseHsl({ mode: "hwb", ...c }).color);
            setLab(parseLab({ mode: "hwb", ...c }).color);
            setLch(parseLch({ mode: "hwb", ...c }).color);
            setOklab(parseOklab({ mode: "hwb", ...c }).color);
            setOklch(parseOklch({ mode: "hwb", ...c }).color);
          }}
        />
      ) : modeLch ? (
        <InputLch
          id="color-lch"
          onChange={(c) => {
            const _rgb = parseRgb({ mode: "lch", ...c }).color;
            setHex(_rgb);
            setRgb(_rgb);
            setHsl(parseHsl({ mode: "lch", ...c }).color);
            setHwb(parseHwb({ mode: "lch", ...c }).color);
            setLab(parseLab({ mode: "lch", ...c }).color);
            setOklab(parseOklab({ mode: "lch", ...c }).color);
            setOklch(parseOklch({ mode: "lch", ...c }).color);
          }}
        />
      ) : modeOklch ? (
        <InputOklch
          id="color-oklch"
          onChange={(c) => {
            const _rgb = parseRgb({ mode: "oklch", ...c }).color;
            setHex(_rgb);
            setRgb(_rgb);
            setHsl(parseHsl({ mode: "oklch", ...c }).color);
            setHwb(parseHwb({ mode: "oklch", ...c }).color);
            setLab(parseLab({ mode: "oklch", ...c }).color);
            setLch(parseLch({ mode: "oklch", ...c }).color);
            setOklab(parseOklab({ mode: "oklch", ...c }).color);
          }}
        />
      ) : modeLab ? (
        <InputLab
          id="color-lab"
          onChange={(c) => {
            const _rgb = parseRgb({ mode: "lab", ...c }).color;
            setHex(_rgb);
            setRgb(_rgb);
            setHsl(parseHsl({ mode: "lab", ...c }).color);
            setHwb(parseHwb({ mode: "lab", ...c }).color);
            setLch(parseLch({ mode: "lab", ...c }).color);
            setOklab(parseOklab({ mode: "lab", ...c }).color);
            setOklch(parseOklch({ mode: "lab", ...c }).color);
          }}
        />
      ) : modeOklab ? (
        <InputOklab
          id="color-oklab"
          onChange={(c) => {
            const _rgb = parseRgb({ mode: "oklab", ...c }).color;
            setHex(_rgb);
            setRgb(_rgb);
            setHsl(parseHsl({ mode: "oklab", ...c }).color);
            setHwb(parseHwb({ mode: "oklab", ...c }).color);
            setLab(parseLab({ mode: "oklab", ...c }).color);
            setLch(parseLch({ mode: "oklab", ...c }).color);
            setOklch(parseOklch({ mode: "oklab", ...c }).color);
          }}
        />
      ) : null}
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useColorStore } from "~/app/provider";
import { formatHex } from "~/lib/format";
import {
  parseHex,
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
import Link from "next/link";

export default function ColorPicker() {
  // prettier-ignore
  const {
    rgb, hsl, hwb, lab, lch, oklab, oklch, mode, gamut,
    setHex, setRgb, setHsl, setHwb, setLab, setLch, setOklab, setOklch, setGamut,
  } = useColorStore((state) => state);

  const modeRgb = mode === "rgb";
  const modeHsl = mode === "hsl";
  const modeHwb = mode === "hwb";
  const modeLab = mode === "lab";
  const modeLch = mode === "lch";
  const modeOklab = mode === "oklab";
  const modeOklch = mode === "oklch";

  const colorMode = modeRgb
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
                : oklch.css;

  const colorLink = modeRgb
    ? `/color?mode=rgb&r=${rgb.color.r}&g=${rgb.color.g}&b=${rgb.color.b}`
    : modeHsl
      ? `/color?mode=hsl&h=${hsl.color.h}&s=${hsl.color.s}&l=${hsl.color.l}`
      : modeHwb
        ? `/color?mode=hwb&h=${hwb.color.h}&w=${hwb.color.w}&b=${hwb.color.b}`
        : modeLab
          ? `/color?mode=lab&l=${lab.color.l}&a=${lab.color.a}&b=${lab.color.b}`
          : modeLch
            ? `/color?mode=lch&l=${lch.color.l}&c=${lch.color.c}&h=${lch.color.h}`
            : modeOklab
              ? `/color?mode=oklab&l=${oklab.color.l}&a=${oklab.color.a}&b=${oklab.color.b}`
              : modeOklch
                ? `/color?mode=oklch&l=${oklch.color.l}&c=${oklch.color.c}&h=${oklch.color.h}`
                : "/color";

  const router = useRouter();

  return (
    <header className="mx-auto inline-grid w-full max-w-3xl gap-4">
      <div role="none" className="sm:flex sm:items-center sm:justify-between">
        <h1 id="color" className="text-neutral-800 dark:text-neutral-200">
          <Link
            href={colorLink}
            onContextMenu={(e) => {
              e.preventDefault();
              router.push("/color");
            }}
          >
            <code>{colorMode}</code>
          </Link>
        </h1>
        <button onClick={() => setGamut(!gamut)}>
          {`turn ${gamut ? "off" : "on"} gamut`}
        </button>
      </div>
      {modeRgb ? (
        <InputRgb
          id="color-rgb"
          onChange={(c) => {
            const src = formatHex(c);
            setHex(c);
            setHsl(parseHsl(src).color);
            setHwb(parseHwb(src).color);
            setLab(parseLab(src).color);
            setLch(parseLch(src).color);
            setOklab(parseOklab(src).color);
            setOklch(parseOklch(src).color);
          }}
        />
      ) : modeHsl ? (
        <InputHsl
          id="color-hsl"
          onChange={(c) => {
            const src = parseHex({ mode: "hsl", ...c });
            const _rgb = parseRgb(src).color;
            setHex(_rgb);
            setRgb(_rgb);
            setHwb(parseHwb(src).color);
            setLab(parseLab(src).color);
            setLch(parseLch(src).color);
            setOklab(parseOklab(src).color);
            setOklch(parseOklch(src).color);
          }}
        />
      ) : modeHwb ? (
        <InputHwb
          id="color-hwb"
          onChange={(c) => {
            const src = parseHex({ mode: "hwb", ...c });
            const _rgb = parseRgb(src).color;
            setHex(_rgb);
            setRgb(_rgb);
            setHsl(parseHsl(src).color);
            setLab(parseLab(src).color);
            setLch(parseLch(src).color);
            setOklab(parseOklab(src).color);
            setOklch(parseOklch(src).color);
          }}
        />
      ) : modeLch ? (
        <InputLch
          id="color-lch"
          onChange={(c) => {
            const src = parseHex({ mode: "lch", ...c });
            const _rgb = parseRgb(src).color;
            setHex(_rgb);
            setRgb(_rgb);
            setHsl(parseHsl(src).color);
            setHwb(parseHwb(src).color);
            setLab(parseLab(src).color);
            setOklab(parseOklab(src).color);
            setOklch(parseOklch(src).color);
          }}
        />
      ) : modeOklch ? (
        <InputOklch
          id="color-oklch"
          onChange={(c) => {
            const src = parseHex({ mode: "oklch", ...c });
            const _rgb = parseRgb(src).color;
            setHex(_rgb);
            setRgb(_rgb);
            setHsl(parseHsl(src).color);
            setHwb(parseHwb(src).color);
            setLab(parseLab(src).color);
            setLch(parseLch(src).color);
            setOklab(parseOklab(src).color);
          }}
        />
      ) : modeLab ? (
        <InputLab
          id="color-lab"
          onChange={(c) => {
            const src = parseHex({ mode: "lab", ...c });
            const _rgb = parseRgb(src).color;
            setHex(_rgb);
            setRgb(_rgb);
            setHsl(parseHsl(src).color);
            setHwb(parseHwb(src).color);
            setLch(parseLch(src).color);
            setOklab(parseOklab(src).color);
            setOklch(parseOklch(src).color);
          }}
        />
      ) : modeOklab ? (
        <InputOklab
          id="color-oklab"
          onChange={(c) => {
            const src = parseHex({ mode: "oklab", ...c });
            const _rgb = parseRgb(src).color;
            setHex(_rgb);
            setRgb(_rgb);
            setHsl(parseHsl(src).color);
            setHwb(parseHwb(src).color);
            setLab(parseLab(src).color);
            setLch(parseLch(src).color);
            setOklch(parseOklch(src).color);
          }}
        />
      ) : null}
    </header>
  );
}

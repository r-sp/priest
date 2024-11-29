"use client";

import { useState } from "react";
import { type ColorConverter, stringifyHsl, stringifyRgb } from "~/lib/utils";
import { useColorProvider } from "./provider";
import clsx from "clsx";

export default function ColorDetail(props: { hex?: string | undefined }) {
  const { hex, rgb, convert } = useColorProvider();

  const colorHex = props.hex ? `#${props.hex}` : hex;
  const colorRgb = props.hex ? convert(`#${props.hex}`).toRgb() : rgb;

  const colorDisplay = convert(colorRgb);

  return (
    <div className="grid gap-8 px-2 py-4 xl:mx-auto xl:max-w-screen-xl" role="none">
      <ColorConversion hex={colorHex} color={colorDisplay} />
      <ColorAnalysis rgb={stringifyRgb(colorRgb)} color={colorDisplay} />
    </div>
  );
}

function ColorConversion({ hex, color }: { hex: string; color: ColorConverter }) {
  const hsl = stringifyHsl(color.toHsl());
  const rgb = stringifyRgb(color.toRgb());
  const brightness = `${Math.round(color.brightness() * 100)}% (${color.isDark() ? "Dark" : "Light"})`;
  const luminance = `${Math.round(color.luminance() * 100)}%`;

  return (
    <div className="grid gap-4" role="none">
      <div
        role="presentation"
        className="flex h-36 rounded-lg px-4 py-2 text-center text-lg md:h-48 lg:h-60 xl:h-80 max-sm:h-48"
        style={{ backgroundColor: rgb }}
      ></div>
      <p className="inline-grid" tabIndex={0}>
        <span className="text-sm font-medium text-holy-400">HEX</span>
        <code className="font-mono text-base text-holy-100">{hex}</code>
      </p>
      <p className="inline-grid" tabIndex={0}>
        <span className="text-sm font-medium text-holy-400">HSL</span>
        <code className="font-mono text-base text-holy-100">{hsl}</code>
      </p>
      <p className="inline-grid" tabIndex={0}>
        <span className="text-sm font-medium text-holy-400">RGB</span>
        <code className="font-mono text-base text-holy-100">{rgb}</code>
      </p>
      <p className="inline-grid" tabIndex={0}>
        <span className="text-sm font-medium text-holy-400">Brightness</span>
        <code className="font-mono text-base text-holy-100">{brightness}</code>
      </p>
      <p className="inline-grid" tabIndex={0}>
        <span className="text-sm font-medium text-holy-400">Luminance</span>
        <code className="font-mono text-base text-holy-100">{luminance}</code>
      </p>
    </div>
  );
}

function ColorAnalysis({ rgb, color }: { rgb: string; color: ColorConverter }) {
  const [preview, setPreview] = useState<"light" | "dark">("dark");

  const textPreview = "What's your favorite color and why?";
  const colorWhite = "rgb(255, 255, 255)";
  const colorBlack = "rgb(0, 0, 0)";

  const whiteContrast = `${color.contrast(colorWhite)}:1`;
  const blackContrast = `${color.contrast(colorBlack)}:1`;

  const whiteNormalAA = color.isReadable(colorWhite, { level: "AA", size: "normal" });
  const whiteNormalAAA = color.isReadable(colorWhite, { level: "AAA", size: "normal" });
  const whiteLargeAA = color.isReadable(colorWhite, { level: "AA", size: "large" });
  const whiteLargeAAA = color.isReadable(colorWhite, { level: "AAA", size: "large" });

  const blackNormalAA = color.isReadable(colorBlack, { level: "AA", size: "normal" });
  const blackNormalAAA = color.isReadable(colorBlack, { level: "AAA", size: "normal" });
  const blackLargeAA = color.isReadable(colorBlack, { level: "AA", size: "large" });
  const blackLargeAAA = color.isReadable(colorBlack, { level: "AAA", size: "large" });

  return (
    <div className="grid gap-4" role="none">
      <p
        className="flex h-36 items-center justify-center rounded-lg px-4 py-2 text-center text-lg md:h-48 lg:h-60 xl:h-80 max-sm:h-48"
        style={
          preview === "light"
            ? { backgroundColor: colorWhite, color: rgb, border: "1px solid" }
            : { backgroundColor: colorBlack, color: rgb, border: "1px solid" }
        }
        tabIndex={0}
      >
        {textPreview}
      </p>
      <div className="flex flex-wrap gap-2" role="none">
        <button
          aria-label="set color on light background"
          className={clsx(
            preview === "light"
              ? "bg-holy-800 text-holy-200"
              : "border-holy-700 text-holy-400 hover:bg-holy-800 focus:bg-holy-800 active:border-holy-600 active:bg-holy-700",
            "rounded-md px-2 py-1 text-sm font-normal",
          )}
          onClick={() => setPreview("light")}
        >
          <span>Light</span>
        </button>
        <button
          aria-label="set color on dark background"
          className={clsx(
            preview === "dark"
              ? "bg-holy-800 text-holy-200"
              : "border-holy-700 text-holy-400 hover:bg-holy-800 focus:bg-holy-800 active:border-holy-600 active:bg-holy-700",
            "rounded-md px-2 py-1 text-sm font-normal",
          )}
          onClick={() => setPreview("dark")}
        >
          <span>Dark</span>
        </button>
      </div>
      <p className="inline-grid" tabIndex={0}>
        <span className="text-sm font-medium text-holy-400">Contrast Ratio</span>
        <code className="font-mono text-base text-holy-100">{preview === "light" ? whiteContrast : blackContrast}</code>
      </p>
      <p className="inline-grid" tabIndex={0}>
        <span className="text-sm font-medium text-holy-400">WCAG AA {`(Normal)`}</span>
        <code className="font-mono text-base text-holy-100">
          {(preview === "light" ? whiteNormalAA : blackNormalAA) ? "Pass" : "Fail"}
        </code>
      </p>
      <p className="inline-grid" tabIndex={0}>
        <span className="text-sm font-medium text-holy-400">WCAG AAA {`(Normal)`}</span>
        <code className="font-mono text-base text-holy-100">
          {(preview === "light" ? whiteNormalAAA : blackNormalAAA) ? "Pass" : "Fail"}
        </code>
      </p>
      <p className="inline-grid" tabIndex={0}>
        <span className="text-sm font-medium text-holy-400">WCAG AA {`(Large)`}</span>
        <code className="font-mono text-base text-holy-100">
          {(preview === "light" ? whiteLargeAA : blackLargeAA) ? "Pass" : "Fail"}
        </code>
      </p>
      <p className="inline-grid" tabIndex={0}>
        <span className="text-sm font-medium text-holy-400">WCAG AAA {`(Large)`}</span>
        <code className="font-mono text-base text-holy-100">
          {(preview === "light" ? whiteLargeAAA : blackLargeAAA) ? "Pass" : "Fail"}
        </code>
      </p>
    </div>
  );
}

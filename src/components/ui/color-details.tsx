"use client";

import { useState, useEffect } from "react";
import { useQueryState, parseAsString } from "nuqs";
import { useColorProvider } from "../provider";
import { stringifyRgb } from "~/lib/utils";
import clsx from "clsx";
import ColorCard from "./color-card";

export default function ColorDetails() {
  const [preview, setPreview] = useState<"light" | "dark">("dark");
  const [reqHex] = useQueryState("hex", parseAsString.withDefault("undefined"));
  const { hex, rgb, convert, setRgb } = useColorProvider();

  const hexColor = reqHex === "undefined" ? hex : `#${reqHex}`;
  const previewColor = reqHex === "undefined" ? rgb : convert(`#${reqHex}`).toRgb();

  useEffect(() => {
    const title = document.title;

    const pageTitle = document.querySelector("title");
    if (pageTitle && reqHex !== "undefined") {
      pageTitle.textContent = `${title}: ${hexColor}`;
    }

    return () => {
      document.title = title;
    };
  });

  const updateRgb = (newColor: Partial<typeof rgb>) => setRgb({ ...rgb, ...newColor });

  const color = convert(previewColor);
  const colorHue = `${color.hue()} deg`;
  const colorBrightness = `${Math.round(color.brightness() * 100)}% (${color.isDark() ? "Dark" : "Light"})`;
  const colorLuminance = `${Math.round(color.luminance() * 100)}%`;
  const colorRgb = stringifyRgb(previewColor);
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

  const textPreview = "What's your favorite color and why?";

  return (
    <div className="grid gap-4" role="none">
      <ColorCard color={{ hex: hexColor, rgb: previewColor }} />

      <div className="grid gap-4">
        <p className="inline-grid">
          <span className="text-sm font-medium text-holy-300">Hex</span>
          <code className="font-mono text-base text-holy-100">{hexColor}</code>
        </p>
        <p className="inline-grid">
          <span className="text-sm font-medium text-holy-300">Hue {`(0-360)`}</span>
          <code className="text-base text-holy-100">{colorHue}</code>
        </p>
        <p className="inline-grid">
          <span className="text-sm font-medium text-holy-300">Brightness</span>
          <code className="text-base text-holy-100">{colorBrightness}</code>
        </p>
        <p className="inline-grid">
          <span className="text-sm font-medium text-holy-300">Luminance</span>
          <code className="text-base text-holy-100">{colorLuminance}</code>
        </p>
      </div>

      <div className="grid gap-4" role="none">
        <p
          className="flex h-36 items-center justify-center rounded-lg px-4 py-2 text-center text-lg md:h-48 lg:h-60 xl:h-80 max-sm:h-48"
          style={
            preview === "light"
              ? { backgroundColor: colorWhite, color: colorRgb }
              : { backgroundColor: colorBlack, color: colorRgb }
          }
        >
          {textPreview}
        </p>
        <div className="flex flex-wrap gap-2" role="none">
          <button
            aria-label="set color on light background"
            className={clsx(
              preview === "light"
                ? "bg-holy-800 text-holy-200"
                : "border-holy-700 text-holy-300 hover:bg-holy-800 focus:bg-holy-800 active:border-holy-600 active:bg-holy-700",
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
                : "border-holy-700 text-holy-300 hover:bg-holy-800 focus:bg-holy-800 active:border-holy-600 active:bg-holy-700",
              "rounded-md px-2 py-1 text-sm font-normal",
            )}
            onClick={() => setPreview("dark")}
          >
            <span>Dark</span>
          </button>
        </div>
        <p className="inline-grid">
          <span className="text-sm font-medium text-holy-300">Contrast Ratio</span>
          <code className="font-mono text-base text-holy-100">{preview === "light" ? whiteContrast : blackContrast}</code>
        </p>
        <p className="inline-grid">
          <span className="text-sm font-medium text-holy-300">WCAG AA {`(Normal)`}</span>
          <code className="font-mono text-base text-holy-100">
            {(preview === "light" ? whiteNormalAA : blackNormalAA) ? "Pass" : "Fail"}
          </code>
        </p>
        <p className="inline-grid">
          <span className="text-sm font-medium text-holy-300">WCAG AAA {`(Normal)`}</span>
          <code className="font-mono text-base text-holy-100">
            {(preview === "light" ? whiteNormalAAA : blackNormalAAA) ? "Pass" : "Fail"}
          </code>
        </p>
        <p className="inline-grid">
          <span className="text-sm font-medium text-holy-300">WCAG AA {`(Large)`}</span>
          <code className="font-mono text-base text-holy-100">
            {(preview === "light" ? whiteLargeAA : blackLargeAA) ? "Pass" : "Fail"}
          </code>
        </p>
        <p className="inline-grid">
          <span className="text-sm font-medium text-holy-300">WCAG AAA {`(Large)`}</span>
          <code className="font-mono text-base text-holy-100">
            {(preview === "light" ? whiteLargeAAA : blackLargeAAA) ? "Pass" : "Fail"}
          </code>
        </p>
      </div>

      {reqHex !== "undefined" ? (
        <div className="mt-6" role="none">
          {hex !== `#${reqHex}` ? (
            <button
              className="rounded-md border-holy-700 px-4 py-2 text-sm text-holy-300 hover:bg-holy-800 focus:bg-holy-800 active:border-holy-600 active:bg-holy-700"
              onClick={() => updateRgb(previewColor)}
            >
              <span>Promote</span>
            </button>
          ) : (
            <button className="rounded-md bg-holy-800 px-4 py-2 text-sm text-holy-300 opacity-50" disabled>
              <span>Promote</span>
            </button>
          )}
        </div>
      ) : null}
    </div>
  );
}

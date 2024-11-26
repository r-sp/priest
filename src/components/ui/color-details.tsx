"use client";

import { useEffect } from "react";
import { useQueryState, parseAsString } from "nuqs";
import { useColorProvider } from "../provider";
import ColorCard from "./color-card";

export default function ColorDetails() {
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

  return (
    <div role="none">
      <ColorCard color={{ hex: hexColor, rgb: previewColor }} />
      <dl className="mt-4">
        <dt className="text-sm font-medium text-holy-300">Hex</dt>
        <dd className="font-mono text-base text-holy-100">{hexColor}</dd>
        <dt className="mt-4 text-sm font-medium text-holy-300">Hue {`(0-360)`}</dt>
        <dd className="text-base text-holy-100">{colorHue}</dd>
        <dt className="mt-4 text-sm font-medium text-holy-300">Brightness</dt>
        <dd className="text-base text-holy-100">{colorBrightness}</dd>
        <dt className="mt-4 text-sm font-medium text-holy-300">Luminance</dt>
        <dd className="text-base text-holy-100">{colorLuminance}</dd>
      </dl>

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

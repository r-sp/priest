"use client";

import { useState } from "react";
import { stringifyRgb, writeClipboardText } from "~/lib/utils";
import { type RgbaColor } from "~/lib/types";

export default function ColorCard({ color }: { color: { hex: string; rgb: RgbaColor } }) {
  const [clipboard, setClipboard] = useState<string>("");
  const [status, setStatus] = useState<boolean>(false);
  const { hex, rgb } = color;

  const copyColor = () => {
    const copy = writeClipboardText(hex);

    copy.then((e) => {
      const isCopied = e === "success" ? `Copied ${hex}` : `Failed to copy ${hex}`;

      setClipboard(isCopied);
      setStatus(true);
    });

    copy.finally(() => {
      const timer = setTimeout(() => setStatus(false), 2000);

      return () => clearTimeout(timer);
    });
  };

  const previewColor = stringifyRgb(rgb);

  return (
    <div className="color-card flex flex-col gap-2">
      <div aria-hidden="true" className="relative z-0 inline-flex min-h-32 select-none overflow-hidden rounded-lg">
        <span
          className="z-2 absolute bottom-0 left-0 right-0 top-0"
          style={{ backgroundColor: previewColor }}
          onClick={copyColor}
        ></span>
        {status ? (
          <div className="z-4 absolute left-2 top-2 rounded-md bg-holy-700 px-2 py-1 text-xs text-holy-100">
            <span>{clipboard}</span>
          </div>
        ) : null}
      </div>
      <code className="inline-flex font-mono text-base text-holy-200">{hex}</code>
    </div>
  );
}

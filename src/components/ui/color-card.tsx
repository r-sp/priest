"use client";

import { useState, type ComponentPropsWithoutRef } from "react";
import { stringifyRgb, writeClipboardText } from "~/lib/utils";
import { type RgbaColor } from "~/lib/types";
import clsx from "clsx";

export default function ColorCard({
  color,
  preview,
}: {
  color: { hex: string; rgb: RgbaColor };
  preview?: ComponentPropsWithoutRef<"div">;
}) {
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
    <section aria-label={hex} className="color-card flex flex-col gap-2">
      <div className={clsx("relative z-0 inline-flex select-none overflow-hidden rounded-lg", preview?.className)} role="none">
        <button
          aria-label={`copy ${hex}`}
          className="absolute bottom-0 left-0 right-0 top-0 z-2"
          style={{ backgroundColor: previewColor }}
          onClick={copyColor}
        ></button>
        {status ? (
          <div className="absolute left-2 top-2 z-4 rounded-md bg-holy-700 px-2 py-1 text-xs text-holy-100">
            <span>{clipboard}</span>
          </div>
        ) : null}
      </div>
      <code className="inline-flex font-mono text-base text-holy-200">{hex}</code>
    </section>
  );
}

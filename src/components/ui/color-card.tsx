"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { stringifyRgb, writeClipboardText } from "~/lib/utils";
import { type RgbaColor } from "~/lib/types";
import clsx from "clsx";

export default function ColorCard({ color }: { color: { hex: string; rgb: RgbaColor } }) {
  const [clipboard, setClipboard] = useState<string>("");
  const [status, setStatus] = useState<boolean>(false);
  const [screen, setScreen] = useState<boolean>(false);

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
      <div className="relative z-0 inline-flex h-36 md:h-48 lg:h-60 xl:h-80 max-sm:h-48" role="none">
        <button
          aria-label={`copy ${hex}`}
          className="absolute bottom-0 left-0 right-0 top-0 z-2 rounded-lg"
          style={{ backgroundColor: previewColor }}
          onClick={copyColor}
          onContextMenu={(e) => {
            e.preventDefault();
            setScreen(true);
          }}
        ></button>
        {status ? (
          <div className="absolute bottom-2 left-2 z-4 select-none rounded-md bg-holy-900 px-2 py-1 text-xs text-holy-100">
            <span>{clipboard}</span>
          </div>
        ) : null}
      </div>
      <code className={clsx("inline-flex font-mono text-base", status ? "text-holy-400" : "text-holy-200")}>{hex}</code>
      {screen
        ? createPortal(
            <span
              className="overlay z-50"
              tabIndex={0}
              style={{ backgroundColor: previewColor }}
              onClick={() => setScreen(false)}
              onContextMenu={(e) => {
                e.preventDefault();
                setScreen(false);
              }}
            ></span>,
            document.getElementById("portal") || document.body,
          )
        : null}
    </section>
  );
}

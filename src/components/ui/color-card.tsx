"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { stringifyRgb, writeClipboardText } from "~/lib/utils";
import { type RgbaColor } from "~/lib/types";
import Link from "next/link";

export default function ColorCard({
  color,
  options = { copyColor: true, colorName: false, colorLink: false },
}: {
  color: { hex: string; rgb: RgbaColor };
  options?: { copyColor: boolean; colorName?: boolean; colorLink?: boolean };
}) {
  const [clipboard, setClipboard] = useState<string>("");
  const [status, setStatus] = useState<boolean>(false);
  const [screen, setScreen] = useState<boolean>(false);

  const { hex, rgb } = color;

  const copyCurrentColor = () => {
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
    <>
      {options.copyColor ? (
        <div className="flex flex-col gap-2">
          <div className="relative z-0 inline-flex h-36 md:h-48 lg:h-60 xl:h-80 max-sm:h-48" role="none">
            <button
              aria-label={`copy ${hex}`}
              className="absolute bottom-0 left-0 right-0 top-0 z-2 rounded-lg"
              style={{ backgroundColor: previewColor }}
              onClick={copyCurrentColor}
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
          {options.colorName ? (
            options.colorLink ? (
              <Link aria-label={hex} href={"/color?hex=" + hex.replace("#", "")} className="inline-flex">
                <code className="font-mono text-base text-holy-200">{hex}</code>
              </Link>
            ) : (
              <code className="font-mono text-base text-holy-200">{hex}</code>
            )
          ) : null}
        </div>
      ) : (
        <Link aria-label={hex} href={"/color?hex=" + hex.replace("#", "")} className="flex flex-col gap-2 rounded-lg">
          <span
            className="inline-flex h-36 rounded-lg md:h-48 lg:h-60 xl:h-80 max-sm:h-48"
            style={{ backgroundColor: previewColor }}
          ></span>
          {options.colorName ? <code className="inline-flex font-mono text-base text-holy-200">{hex}</code> : null}
        </Link>
      )}
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
    </>
  );
}

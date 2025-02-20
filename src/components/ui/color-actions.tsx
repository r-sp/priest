"use client";

import type { ComponentPropsWithoutRef } from "react";
import type { SessionSubscribe } from "~/types/session";
import type { AnyColorMode, ColorValues } from "~/types/color";
import { useState, useMemo, useCallback } from "react";
import { useSession } from "~/hooks";
import { createPortal } from "react-dom";
import { formatCss, encodeScale, encodeColor } from "~/utils";
import { Icon } from "../common";
import clsx from "clsx";
import Link from "next/link";

interface Props {
  color: AnyColorMode;
  hex: string;
}

export default function ColorActions({ color, hex }: Props) {
  const session: SessionSubscribe = useSession((state) => [
    state.color,
    state.setColor,
  ]);
  const [store, setStore] = useMemo(() => session, [session]);

  const currentCss = formatCss(color);
  const storeCss = formatCss(store);
  const isEqualColor = storeCss === currentCss;

  const handleSubscribe = useCallback(() => {
    setStore(color);
  }, [color, setStore]);

  const handleDownload = useCallback(async (src: string, filename: string) => {
    const hiddenElement = "link-download";

    try {
      const response = await fetch(src);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const body = document.body;
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.id = hiddenElement;

      const prev = document.getElementById(hiddenElement);
      if (prev) {
        body.removeChild(prev);
        body.appendChild(link);
      } else {
        body.appendChild(link);
      }

      link.click();
      window.URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
    } finally {
      const next = document.getElementById(hiddenElement);
      if (next) {
        document.body.removeChild(next);
      }
    }
  }, []);

  const [modal, setModal] = useState<boolean>(false);

  const handleModal = useCallback(() => {
    setModal(!modal);
  }, [modal, setModal]);

  const scales = encodeScale(`#${hex}`);
  const harmony = encodeColor(Object.values(color) as ColorValues);

  const linkHex = `/color-hex/${hex}`;
  const fileHex = `color-hex-${hex}`;

  const linkScales = `/color-scales/${scales}`;
  const fileScales = `color-scales-${hex}`;

  const linkHarmony = `/color-harmony/${harmony}`;
  const fileHarmony = `color-harmony-${hex}`;

  return (
    <div
      role="group"
      aria-label="color actions"
      className="max-xs:flex-wrap flex min-h-9 grow-0 items-center justify-between gap-4"
    >
      <button
        aria-label="set current color as primary"
        className={clsx(
          "action inline-flex h-9 grow-1 items-center justify-center gap-x-2 rounded-md px-3 text-sm ring",
          isEqualColor ? "pointer-events-none opacity-60" : "cursor-pointer",
        )}
        disabled={isEqualColor}
        tabIndex={isEqualColor ? -1 : 0}
        onClick={handleSubscribe}
        suppressHydrationWarning
      >
        <Icon size="20" type="palette" className="pointer-events-none size-5" />
        <span>{isEqualColor ? "Subscribed" : "Subscribe"}</span>
      </button>
      <button
        className="action inline-flex size-8 grow-0 cursor-pointer items-center justify-center rounded-2xl ring"
        onClick={handleModal}
      >
        <Icon size="24" type="more" className="pointer-events-none size-6" />
        <span className="sr-only">More</span>
      </button>
      {modal
        ? createPortal(
            <div role="none" className="pointer-events-auto">
              <div
                role="dialog"
                aria-label="more color options"
                className="pointer-events-none fixed top-0 right-0 bottom-0 left-0 z-64 flex items-end sm:items-center"
              >
                <div className="pointer-events-auto mx-auto grid max-h-screen w-full max-w-xl gap-y-3 overflow-y-auto rounded-t-lg bg-gray-100 px-4 pt-4 pb-12 ring ring-gray-200 sm:rounded-lg sm:pb-6 dark:bg-gray-900 dark:ring-gray-800">
                  <h2 className="text-gray-600 dark:text-gray-400">
                    More Options
                  </h2>
                  <ul role="listbox" className="grid gap-y-6">
                    <Button
                      label="Color Hex"
                      link={linkHex}
                      onClick={() => handleDownload(linkHex, fileHex)}
                    />
                    <Button
                      label="Color Scales"
                      link={linkScales}
                      onClick={() => handleDownload(linkScales, fileScales)}
                    />
                    <Button
                      label="Color Harmony"
                      link={linkHarmony}
                      onClick={() => handleDownload(linkHarmony, fileHarmony)}
                    />
                  </ul>
                </div>
              </div>
              <span
                role="button"
                aria-label="close color options"
                className="fixed top-0 right-0 bottom-0 left-0 z-54 bg-gray-50/80 backdrop-blur-lg dark:bg-gray-950/80"
                tabIndex={0}
                onFocus={() => setModal(false)}
              />
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}

interface DownloadActions
  extends Omit<ComponentPropsWithoutRef<"button">, "label" | "label"> {
  label: string;
  link: string;
}

function Button({ label, link, ...props }: DownloadActions) {
  const item = label.toLowerCase();
  return (
    <li
      role="option"
      aria-selected={false}
      aria-label={item}
      className="inline-grid gap-y-2 border-t border-t-gray-200 pt-3 dark:border-t-gray-800"
    >
      <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
        {label}
      </h3>
      <div className="flex h-8 gap-x-4">
        <button
          aria-label={`download ${item}`}
          className="action inline-flex h-9 grow-1 cursor-pointer items-center justify-center gap-x-2 rounded-md px-3 text-sm ring"
          {...props}
        >
          <span>Download</span>
          <Icon
            size="20"
            className="pointer-events-none size-5"
            type="download"
          />
        </button>
        <Link
          aria-label={`view ${item}`}
          href={link}
          className="action inline-flex h-9 grow-1 cursor-pointer items-center justify-center gap-x-2 rounded-md px-3 text-sm ring"
          prefetch={false}
          target="_blank"
          rel="noopener"
        >
          <span>View</span>
          <Icon
            size="20"
            className="pointer-events-none size-5"
            type="newtab"
          />
        </Link>
      </div>
    </li>
  );
}

"use client";

import type { ComponentPropsWithoutRef, KeyboardEvent } from "react";
import type { SessionSubscribe } from "~/types/session";
import type { AnyColorMode, ColorValues } from "~/types/color";
import { useState, useMemo, useCallback, useRef } from "react";
import { useSession } from "~/hooks";
import { createPortal } from "react-dom";
import { formatCss, encodeScale, encodeColor } from "~/utils";
import { Icon } from "../common";
import { motion } from "motion/react";
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
      link.id = filename;

      const prev = document.getElementById(filename);
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
      const next = document.getElementById(filename);
      if (next) {
        document.body.removeChild(next);
      }
    }
  }, []);

  const [modal, setModal] = useState<boolean>(false);
  const refBtn = useRef<HTMLButtonElement>(null);

  const handleClose = useCallback(() => {
    const btn = refBtn.current;
    if (btn) {
      btn.focus();
    }
    setModal(false);
  }, [setModal, refBtn]);

  const handleKeyboard = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape": {
          handleClose();
          e.preventDefault();
          break;
        }
      }
    },
    [handleClose],
  );

  const scales = encodeScale(`#${hex}`);
  const harmony = encodeColor(Object.values(color) as ColorValues);

  const linkSwatch = `/color-swatch/${hex}`;
  const fileSwatch = `color-swatch-${hex}`;

  const linkScales = `/color-scales/${scales}`;
  const fileScales = `color-scales-${hex}`;

  const linkHarmony = `/color-harmony/${harmony}`;
  const fileHarmony = `color-harmony-${hex}`;

  return (
    <div
      role="group"
      aria-label="color actions"
      className="max-xs:flex-wrap flex min-h-9 grow-0 items-center justify-between gap-4"
      onKeyDown={handleKeyboard}
    >
      <button
        className={clsx(
          "action inline-flex h-9 grow-1 items-center justify-center gap-x-2 rounded-md px-3 text-sm ring",
          isEqualColor && "pointer-events-none opacity-60",
        )}
        disabled={isEqualColor}
        tabIndex={isEqualColor ? -1 : 0}
        onClick={handleSubscribe}
        suppressHydrationWarning
      >
        <Icon size="20" type="palette" className="pointer-events-none size-5" />
        <span>{isEqualColor ? "Current Color" : "Set Current Color"}</span>
      </button>
      <button
        ref={refBtn}
        autoFocus={modal}
        className="action alt inline-flex size-8 grow-0 items-center justify-center rounded-2xl ring"
        data-modal="options"
        onClick={() => setModal(true)}
      >
        <Icon size="24" type="more" className="pointer-events-none size-6" />
        <span className="sr-only">More</span>
      </button>
      {modal
        ? createPortal(
            <div className="pointer-events-auto">
              <div
                role="dialog"
                aria-label="more color options"
                className="pointer-events-none fixed top-0 right-0 bottom-0 left-0 z-64 flex items-end px-4 sm:items-center"
              >
                <div className="pointer-events-auto mx-auto grid w-full max-w-xl overflow-hidden rounded-t-lg bg-gray-100 ring ring-gray-200 sm:rounded-lg dark:bg-gray-900 dark:ring-gray-800">
                  <div className="xs:justify-between relative z-1 flex min-h-16 flex-wrap items-center gap-x-4 rounded-t-lg px-4 py-2 ring ring-gray-200 dark:ring-gray-800">
                    <h2 className="inline-flex min-h-8 items-center text-gray-600 dark:text-gray-400">
                      More Options
                    </h2>
                    <motion.button
                      initial={{ rotate: -45, scale: 0.9 }}
                      animate={{ rotate: 0, scale: 1 }}
                      autoFocus={true}
                      aria-label="close modal"
                      className="action alt inline-flex size-8 items-center justify-center rounded-2xl ring"
                      data-modal="options"
                      onClick={handleClose}
                    >
                      <Icon
                        size="24"
                        type="close"
                        className="pointer-events-none size-6"
                      />
                    </motion.button>
                  </div>
                  <motion.ul
                    initial={{
                      translateY: "4rem",
                      overflow: "hidden",
                      opacity: 0,
                    }}
                    animate={{
                      translateY: "0rem",
                      overflow: "auto",
                      opacity: 1,
                    }}
                    className="grid max-h-[calc(100vh-7rem)] gap-y-6 px-4 pb-12 sm:pb-6"
                  >
                    <Button
                      label="Color Swatch"
                      text="A 21:9 visual snapshot of color."
                      link={linkSwatch}
                      onClick={() => handleDownload(linkSwatch, fileSwatch)}
                    />
                    <Button
                      label="Color Scales"
                      text="A series of tints and shades of a single hue."
                      link={linkScales}
                      onClick={() => handleDownload(linkScales, fileScales)}
                    />
                    <Button
                      label="Color Harmony"
                      text="A cohesive color scheme from a single hue."
                      link={linkHarmony}
                      onClick={() => handleDownload(linkHarmony, fileHarmony)}
                    />
                  </motion.ul>
                </div>
              </div>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                role="button"
                aria-label="close modal"
                className="fixed top-0 right-0 bottom-0 left-0 z-54 bg-gray-50/80 backdrop-blur-lg dark:bg-gray-950/80"
                tabIndex={0}
                onFocus={handleClose}
              />
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}

interface DownloadActions
  extends Omit<ComponentPropsWithoutRef<"button">, "label" | "text" | "label"> {
  label: string;
  text: string;
  link: string;
}

function Button({ label, text, link, ...props }: DownloadActions) {
  const item = label.toLowerCase();
  return (
    <li className="inline-grid gap-y-4 border-t border-t-gray-200 pt-4 dark:border-t-gray-800">
      <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
        {label}
      </h3>
      <p className="-mt-4 text-sm text-gray-600 dark:text-gray-400">{text}</p>
      <div className="xs:grid-cols-2 grid gap-4">
        <button
          aria-label={`download ${item}`}
          className="action inline-flex h-9 grow-1 items-center justify-center gap-x-2 rounded-md px-3 text-sm ring"
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
          className="action inline-flex h-9 grow-1 items-center justify-center gap-x-2 rounded-md px-3 text-sm ring"
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

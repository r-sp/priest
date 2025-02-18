"use client";

import type { ReactNode, KeyboardEvent } from "react";
import type { AnyColorMode } from "~/types/color";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { getColorById, switchColorPath, formatCss } from "~/utils";
import clsx from "clsx";
import Icon from "./icons";
import Link from "next/link";

interface Props {
  children: ReactNode;
  color: string;
}

export default function Modal({ children, color }: Props) {
  const [colorState, setColorState] = useState<ColorState | undefined>(
    undefined,
  );
  const [scroll, setScroll] = useState<boolean>(false);
  const router = useRouter();

  const title = `Color: ${color}`;

  const currentCss = color === "Error" ? "unknown-color-error" : color;
  const currentId = currentCss
    .replace("(", " ")
    .replace(")", "")
    .replaceAll("%", "")
    .replaceAll("-", "/")
    .replaceAll(".", ":")
    .replaceAll(" ", "-");
  const currentElement = `a[data-color="${currentId}"]`;

  const handleClose = useCallback(() => {
    router.back();

    const recentColor = document.querySelector(currentElement) as
      | HTMLAnchorElement
      | undefined;

    if (recentColor) {
      recentColor.focus();
      recentColor.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  }, [router, currentElement]);

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

  useEffect(() => {
    const pageTitle = document.title;
    const pageRoot = document.documentElement.style;
    const pageBody = document.body.style;
    document.title = title;
    pageRoot.overflowY = "hidden";
    pageBody.overflowY = "scroll";
    pageBody.pointerEvents = "none";
    setScroll(true);

    const currentColor = document.querySelector(currentElement) as
      | HTMLAnchorElement
      | undefined;

    if (currentColor) {
      const parentId = Number(currentColor.id.replace("color-palette-", ""));
      const palettes = Number(
        document.getElementById("color-palettes")?.dataset.length,
      );

      const colorId = isNaN(parentId) ? 0 : parentId;
      const colorTotal = isNaN(palettes) ? 0 : palettes;

      const decrease = colorId - 1;
      const increase = colorId + 1;

      const prevId = decrease === 0 ? colorTotal : decrease;
      const nextId = increase > colorTotal ? 1 : increase;

      const findPrevId = document.getElementById(`color-palette-${prevId}`)
        ?.dataset.color;
      const findNextId = document.getElementById(`color-palette-${nextId}`)
        ?.dataset.color;

      const resolveColor: AnyColorMode = { mode: "rgb", r: 0, g: 0, b: 0 };

      const colorPrev: AnyColorMode = findPrevId
        ? getColorById(findPrevId)
        : resolveColor;
      const colorNext: AnyColorMode = findNextId
        ? getColorById(findNextId)
        : resolveColor;

      setColorState({ prev: colorPrev, next: colorNext });
    }

    return () => {
      document.title = pageTitle;
      pageRoot.removeProperty("overflow-y");
      pageBody.removeProperty("overflow-y");
      pageBody.removeProperty("pointer-events");
      setColorState(undefined);
    };
  }, [title, setScroll, setColorState, currentElement]);

  return (
    <div role="none" data-color={currentId} onKeyDown={handleKeyboard}>
      <div
        role="dialog"
        aria-label={title}
        className={clsx(
          "fixed top-0 right-0 bottom-0 left-0 z-50 bg-gray-50/80 px-4 backdrop-blur-lg dark:bg-gray-950/80",
          scroll
            ? "pointer-events-auto overflow-y-auto"
            : "overflow-y-hidden opacity-0",
        )}
      >
        <nav className="mx-auto flex h-16 max-w-5xl items-center justify-start">
          <button
            autoFocus={true}
            aria-label="return back"
            className="ml-[-0.4rem] inline-flex size-8 items-center justify-center rounded-full text-gray-800 outline-0 dark:text-gray-200"
            onClick={handleClose}
          >
            <Icon
              size="24"
              type="arrow-back"
              className="pointer-events-none size-6"
            />
          </button>
        </nav>
        <div role="none" className="pointer-events-none relative">
          {children}
          {colorState && <Navigation {...colorState} />}
          <span
            role="button"
            aria-label="close color modal"
            className="pointer-events-auto absolute top-0 right-0 bottom-0 left-0 -z-1"
            tabIndex={0}
            onFocus={handleClose}
          />
        </div>
      </div>
    </div>
  );
}

interface ColorState {
  prev: AnyColorMode;
  next: AnyColorMode;
}

function Navigation({ prev, next }: ColorState) {
  const linkPrev = switchColorPath("/color", prev);
  const linkNext = switchColorPath("/color", next);
  const cssPrev = formatCss(prev);
  const cssNext = formatCss(next);

  return (
    <div className="pointer-events-auto mx-auto grid w-full max-w-5xl border-t border-gray-200 pt-4 pb-8 dark:border-gray-800">
      <div className="xs:grid-cols-2 grid gap-x-2 gap-y-6 md:gap-x-6 lg:gap-x-8">
        <Link
          aria-label="view previous color"
          href={linkPrev}
          rel="prev"
          className="inline-grid gap-y-3 overflow-hidden rounded-md text-gray-800 dark:text-gray-200"
          prefetch={false}
          replace={true}
          scroll={false}
        >
          <div
            role="presentation"
            className="flex"
            style={{ ["--bg" as string]: cssPrev }}
          >
            <div className="bg-ref aspect-cinema inline-flex w-full rounded-md"></div>
          </div>
          <div
            aria-hidden="true"
            className="flex items-center justify-start gap-2 rounded-md"
          >
            <Icon
              size="24"
              type="arrow-left"
              className="pointer-events-none -ml-[0.3rem] size-6"
            />
            <span>Prev Color</span>
          </div>
        </Link>
        <Link
          aria-label="view next color"
          href={linkNext}
          rel="next"
          className="inline-grid gap-y-3 overflow-hidden rounded-md text-gray-800 dark:text-gray-200"
          prefetch={false}
          replace={true}
          scroll={false}
        >
          <div
            role="presentation"
            className="flex"
            style={{ ["--bg" as string]: cssNext }}
          >
            <div className="bg-ref aspect-cinema inline-flex w-full rounded-md"></div>
          </div>
          <div
            aria-hidden="true"
            className="flex items-center justify-end gap-2 rounded-md"
          >
            <span>Next Color</span>
            <Icon
              size="24"
              type="arrow-right"
              className="pointer-events-none -mr-[0.3rem] size-6"
            />
          </div>
        </Link>
      </div>
    </div>
  );
}

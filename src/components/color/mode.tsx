"use client";

import { type ColorStore } from "~/lib/color";
import { type KeyboardEvent, useRef, useCallback } from "react";
import clsx from "clsx";

export default function ColorMode(props: { state: ColorStore }) {
  const store = props.state;
  const { mode, setMode } = store;

  const modeRgb = mode === "rgb";
  const modeHsl = mode === "hsl";
  const modeHwb = mode === "hwb";
  const modeLab = mode === "lab";
  const modeLch = mode === "lch";
  const modeOklab = mode === "oklab";
  const modeOklch = mode === "oklch";

  return (
    <Navigation>
      <button
        aria-controls="color-rgb"
        className={clsx(
          modeRgb && "text-neutral-800 dark:text-neutral-200",
          "font-medium",
        )}
        tabIndex={modeRgb ? 0 : -1}
        onClick={() => setMode("rgb")}
      >
        <span>RGB</span>
      </button>
      <button
        aria-controls="color-hsl"
        className={clsx(
          modeHsl && "text-neutral-800 dark:text-neutral-200",
          "font-medium",
        )}
        tabIndex={modeHsl ? 0 : -1}
        onClick={() => setMode("hsl")}
      >
        <span>HSL</span>
      </button>
      <button
        aria-controls="color-hwb"
        className={clsx(
          modeHwb && "text-neutral-800 dark:text-neutral-200",
          "font-medium",
        )}
        tabIndex={modeHwb ? 0 : -1}
        onClick={() => setMode("hwb")}
      >
        <span>HWB</span>
      </button>
      <button
        aria-controls="color-lch"
        className={clsx(
          modeLch && "text-neutral-800 dark:text-neutral-200",
          "font-medium",
        )}
        tabIndex={modeLch ? 0 : -1}
        onClick={() => setMode("lch")}
      >
        <span>LCH</span>
      </button>
      <button
        aria-controls="color-oklch"
        className={clsx(
          modeOklch && "text-neutral-800 dark:text-neutral-200",
          "font-medium",
        )}
        tabIndex={modeOklch ? 0 : -1}
        onClick={() => setMode("oklch")}
      >
        <span>OKLCH</span>
      </button>
      <button
        aria-controls="color-lab"
        className={clsx(
          modeLab && "text-neutral-800 dark:text-neutral-200",
          "font-medium",
        )}
        tabIndex={modeLab ? 0 : -1}
        onClick={() => setMode("lab")}
      >
        <span>LAB</span>
      </button>
      <button
        aria-controls="color-oklab"
        className={clsx(
          modeOklab && "text-neutral-800 dark:text-neutral-200",
          "font-medium",
        )}
        tabIndex={modeOklab ? 0 : -1}
        onClick={() => setMode("oklab")}
      >
        <span>OKLAB</span>
      </button>
    </Navigation>
  );
}

function Navigation(props: { children: React.ReactNode }) {
  const refList = useRef<HTMLElement>(null);

  const handleKeyboard = useCallback((e: KeyboardEvent) => {
    const list = refList.current;
    if (!list) return;
    const tabs = Array.from<HTMLElement>(
      list.querySelectorAll("button:not([disabled])"),
    );
    const index = tabs.indexOf(document.activeElement as HTMLElement);
    if (index < 0) return;
    switch (e.key) {
      case "ArrowUp":
      case "ArrowLeft": {
        const next = (index - 1 + tabs.length) % tabs.length;
        tabs[next]?.focus();
        break;
      }
      case "ArrowDown":
      case "ArrowRight": {
        const next = (index + 1 + tabs.length) % tabs.length;
        tabs[next]?.focus();
        break;
      }
    }
  }, []);

  return (
    <nav
      ref={refList}
      aria-label="color mode"
      className="flex flex-wrap gap-3 border-t border-t-neutral-400 pt-4 dark:border-t-neutral-700"
      onKeyDown={handleKeyboard}
    >
      {props.children}
    </nav>
  );
}

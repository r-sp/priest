"use client";

import { type ColorFormat } from "~/lib/color";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useColorStore } from "./provider";
import clsx from "clsx";

export default function ColorMode() {
  const { mode, setMode } = useColorStore((state) => state);
  const [modal, setModal] = useState<boolean>(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  const modeRgb = mode === "rgb";
  const modeHsl = mode === "hsl";
  const modeHwb = mode === "hwb";
  const modeLab = mode === "lab";
  const modeLch = mode === "lch";
  const modeOklab = mode === "oklab";
  const modeOklch = mode === "oklch";

  const handleMode = (type: ColorFormat) => {
    setMode(type);
    setModal(false);

    if (btnRef.current) {
      btnRef.current.focus();
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (modal) {
        setModal(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [modal]);

  return (
    <div role="none" className="relative">
      <button
        ref={btnRef}
        aria-haspopup="true"
        aria-expanded={modal}
        aria-controls="color-mode"
        aria-label="change color mode"
        className="btn inline-flex size-8 items-center justify-center rounded-2xl border border-neutral-400 transition-colors dark:border-neutral-700"
        onClick={() => setModal(!modal)}
      >
        <svg className="size-6" width={24} height={24} viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M17.6538 19.6537C16.7169 19.6537 15.925 19.3303 15.278 18.6834C14.6312 18.0364 14.3077 17.2445 14.3077 16.3077C14.3077 15.3707 14.6312 14.5788 15.278 13.9319C15.925 13.2849 16.7169 12.9614 17.6538 12.9614C18.5908 12.9614 19.3827 13.2849 20.0295 13.9319C20.6765 14.5788 21 15.3707 21 16.3077C21 17.2445 20.6765 18.0364 20.0295 18.6834C19.3827 19.3303 18.5908 19.6537 17.6538 19.6537ZM17.6528 18.1537C18.1624 18.1537 18.5977 17.9736 18.9587 17.6134C19.3196 17.2531 19.5 16.8182 19.5 16.3087C19.5 15.799 19.3198 15.3637 18.9595 15.0027C18.5993 14.6419 18.1644 14.4614 17.6547 14.4614C17.1451 14.4614 16.7098 14.6416 16.349 15.0019C15.9882 15.3621 15.8077 15.797 15.8077 16.3067C15.8077 16.8164 15.9878 17.2516 16.348 17.6124C16.7083 17.9733 17.1433 18.1537 17.6528 18.1537ZM4.5 17.0577V15.5577H12.1155V17.0577H4.5ZM6.34625 11.0384C5.40925 11.0384 4.61733 10.7149 3.9705 10.0679C3.3235 9.42111 3 8.62919 3 7.69219C3 6.75536 3.3235 5.96344 3.9705 5.31644C4.61733 4.66961 5.40925 4.34619 6.34625 4.34619C7.28308 4.34619 8.075 4.66961 8.722 5.31644C9.36883 5.96344 9.69225 6.75536 9.69225 7.69219C9.69225 8.62919 9.36883 9.42111 8.722 10.0679C8.075 10.7149 7.28308 11.0384 6.34625 11.0384ZM6.34525 9.53844C6.85492 9.53844 7.29017 9.35827 7.651 8.99794C8.01183 8.63777 8.19225 8.20286 8.19225 7.69319C8.19225 7.18352 8.01217 6.74828 7.652 6.38744C7.29167 6.02661 6.85675 5.84619 6.34725 5.84619C5.83758 5.84619 5.40225 6.02628 5.04125 6.38644C4.68042 6.74678 4.5 7.18169 4.5 7.69119C4.5 8.20086 4.68017 8.63619 5.0405 8.99719C5.40067 9.35803 5.83558 9.53844 6.34525 9.53844ZM11.8845 8.44219V6.94219H19.5V8.44219H11.8845Z"
          />
        </svg>
      </button>
      <Navigation visible={modal} state={setModal}>
        <button
          role="menuitem"
          className="btn inline-flex h-8 min-w-24 items-center px-3 font-mono text-sm font-medium transition-colors"
          tabIndex={modal ? (modeRgb ? 0 : -1) : -1}
          onClick={() => handleMode("rgb")}
        >
          <span>RGB</span>
        </button>
        <button
          role="menuitem"
          className="btn inline-flex h-8 min-w-24 items-center px-3 font-mono text-sm font-medium transition-colors"
          tabIndex={modal ? (modeHsl ? 0 : -1) : -1}
          onClick={() => handleMode("hsl")}
        >
          <span>HSL</span>
        </button>
        <button
          role="menuitem"
          className="btn inline-flex h-8 min-w-24 items-center px-3 font-mono text-sm font-medium transition-colors"
          tabIndex={modal ? (modeHwb ? 0 : -1) : -1}
          onClick={() => handleMode("hwb")}
        >
          <span>HWB</span>
        </button>
        <button
          role="menuitem"
          className="btn inline-flex h-8 min-w-24 items-center px-3 font-mono text-sm font-medium transition-colors"
          tabIndex={modal ? (modeLch ? 0 : -1) : -1}
          onClick={() => handleMode("lch")}
        >
          <span>LCH</span>
        </button>
        <button
          role="menuitem"
          className="btn inline-flex h-8 min-w-24 items-center px-3 font-mono text-sm font-medium transition-colors"
          tabIndex={modal ? (modeOklch ? 0 : -1) : -1}
          onClick={() => handleMode("oklch")}
        >
          <span>OKLCH</span>
        </button>
        <button
          role="menuitem"
          className="btn inline-flex h-8 min-w-24 items-center px-3 font-mono text-sm font-medium transition-colors"
          tabIndex={modal ? (modeLab ? 0 : -1) : -1}
          onClick={() => handleMode("lab")}
        >
          <span>LAB</span>
        </button>
        <button
          role="menuitem"
          className="btn inline-flex h-8 min-w-24 items-center px-3 font-mono text-sm font-medium transition-colors"
          tabIndex={modal ? (modeOklab ? 0 : -1) : -1}
          onClick={() => handleMode("oklab")}
        >
          <span>OKLAB</span>
        </button>
      </Navigation>
      <span
        role="none"
        className={clsx(modal ? "visible" : "invisible", "overlay fixed z-3")}
        onFocus={() => setModal(false)}
        tabIndex={modal ? 0 : -1}
      ></span>
    </div>
  );
}

function Navigation(props: {
  children: React.ReactNode;
  visible: boolean;
  state: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const refList = useRef<HTMLElement>(null);
  const modal = props.visible;
  const setModal = props.state;

  const handleKeyboard = useCallback(
    (e: React.KeyboardEvent) => {
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
          e.preventDefault();
          break;
        }
        case "Tab":
        case "ArrowDown":
        case "ArrowRight": {
          const next = (index + 1 + tabs.length) % tabs.length;
          tabs[next]?.focus();
          e.preventDefault();
          break;
        }
        case "Escape": {
          setModal(false);
          break;
        }
      }
    },
    [setModal],
  );

  useEffect(() => {
    if (modal && refList.current) {
      const btn = refList.current.querySelector(
        "button[tabindex='0']",
      ) as HTMLButtonElement;
      if (btn) {
        btn.focus();
      }
    }
  }, [modal, refList]);

  return (
    <nav
      ref={refList}
      role="menu"
      aria-label="color mode"
      id="color-mode"
      className={clsx(
        modal ? "visible" : "invisible",
        "absolute top-10 right-0 z-4 flex flex-col rounded-sm border border-neutral-400 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900",
      )}
      onKeyDown={handleKeyboard}
    >
      {props.children}
    </nav>
  );
}

"use client";

import { createPortal } from "react-dom";
import { useState, useRef, useCallback } from "react";
import { useColorStore } from "~/app/provider";
import { cleanTheme, applyTheme, storeTheme } from "~/lib/theme";
import clsx from "clsx";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useColorStore((state) => state);
  const auto = "auto";
  const light = "light";
  const dark = "dark";

  const applyAutoMode = () => {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (isDark) {
      applyTheme(dark);
    } else {
      cleanTheme(dark);
    }
    storeTheme(auto);
    setTheme(auto);
  };

  const applyLightMode = () => {
    cleanTheme(dark);
    storeTheme(light);
    setTheme(light);
  };

  const applyDarkMode = () => {
    applyTheme(dark);
    storeTheme(dark);
    setTheme(dark);
  };

  const modeAuto = theme === auto;
  const modeLight = theme === light;
  const modeDark = theme === dark;

  return (
    <Navigation>
      <button
        role="menuitemradio"
        aria-checked={modeLight}
        aria-label="light"
        className={clsx(
          "btn inline-flex size-8 items-center justify-center rounded-2xl transition-colors",
          modeLight &&
            "border-2 border-neutral-50 bg-neutral-200 text-neutral-700 dark:border-neutral-950 dark:bg-neutral-800 dark:text-neutral-200",
        )}
        tabIndex={modeLight ? 0 : -1}
        onClick={applyLightMode}
      >
        <svg
          role="presentation"
          className="size-6"
          width={24}
          height={24}
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12 16.5C10.7513 16.5 9.68917 16.0622 8.8135 15.1865C7.93783 14.3108 7.5 13.2487 7.5 12C7.5 10.7513 7.93783 9.68917 8.8135 8.8135C9.68917 7.93783 10.7513 7.5 12 7.5C13.2487 7.5 14.3108 7.93783 15.1865 8.8135C16.0622 9.68917 16.5 10.7513 16.5 12C16.5 13.2487 16.0622 14.3108 15.1865 15.1865C14.3108 16.0622 13.2487 16.5 12 16.5ZM5 12.75H1.25V11.25H5V12.75ZM22.75 12.75H19V11.25H22.75V12.75ZM11.25 5V1.25H12.75V5H11.25ZM11.25 22.75V19H12.75V22.75H11.25ZM6.573 7.577L4.23075 5.3155L5.2905 4.20575L7.54625 6.523L6.573 7.577ZM18.7095 19.7943L16.4385 17.4615L17.427 16.423L19.7693 18.6845L18.7095 19.7943ZM16.423 6.573L18.6845 4.23075L19.7943 5.2905L17.477 7.54625L16.423 6.573ZM4.20575 18.7095L6.5385 16.4385L7.55775 17.427L5.30575 19.7788L4.20575 18.7095Z"
          />
        </svg>
      </button>
      <button
        role="menuitemradio"
        aria-checked={modeDark}
        aria-label="dark"
        className={clsx(
          "btn inline-flex size-8 items-center justify-center rounded-2xl transition-colors",
          modeDark &&
            "border-2 border-neutral-50 bg-neutral-200 text-neutral-700 dark:border-neutral-950 dark:bg-neutral-800 dark:text-neutral-200",
        )}
        tabIndex={modeDark ? 0 : -1}
        onClick={applyDarkMode}
      >
        <svg
          role="presentation"
          className="size-6"
          width={24}
          height={24}
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12.0288 20.5C9.6678 20.5 7.66089 19.6736 6.00805 18.0207C4.35539 16.3681 3.52905 14.3611 3.52905 12C3.52905 9.73714 4.29664 7.79647 5.8318 6.17797C7.36697 4.55931 9.24672 3.68264 11.4711 3.54797C11.6147 3.54797 11.7558 3.55314 11.8943 3.56347C12.0326 3.57381 12.1685 3.58922 12.3018 3.60972C11.7916 4.08656 11.3853 4.66281 11.0828 5.33847C10.7801 6.01414 10.6288 6.73464 10.6288 7.49997C10.6288 9.13881 11.2025 10.5319 12.3498 11.6792C13.497 12.8264 14.89 13.4 16.5288 13.4C17.3045 13.4 18.0276 13.2487 18.6981 12.9462C19.3686 12.6436 19.9391 12.2371 20.4096 11.727C20.4301 11.8603 20.4455 11.9962 20.4558 12.1347C20.466 12.2731 20.4711 12.4141 20.4711 12.5577C20.3429 14.7821 19.4696 16.6618 17.8511 18.197C16.2324 19.7323 14.2916 20.5 12.0288 20.5Z"
          />
        </svg>
      </button>
      <button
        role="menuitemradio"
        aria-checked={modeAuto}
        aria-label="auto"
        className={clsx(
          "btn inline-flex size-8 items-center justify-center rounded-2xl transition-colors",
          modeAuto &&
            "border-2 border-neutral-50 bg-neutral-200 text-neutral-700 dark:border-neutral-950 dark:bg-neutral-800 dark:text-neutral-200",
        )}
        tabIndex={modeAuto ? 0 : -1}
        onClick={applyAutoMode}
      >
        <svg
          role="presentation"
          className="size-6"
          width={24}
          height={24}
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12 22.6077L8.85946 19.5H4.49996V15.1405L1.39221 12L4.49996 8.85946V4.49996H8.85946L12 1.39221L15.1405 4.49996H19.5V8.85946L22.6077 12L19.5 15.1405V19.5H15.1405L12 22.6077ZM12 20.5L14.5 18H18V14.5L20.5 12L18 9.49996V5.99996H14.5L12 3.49996L9.49996 5.99996H5.99996V9.49996L3.49996 12L5.99996 14.5V18H9.49996L12 20.5ZM12 16.6152C13.2743 16.6152 14.3621 16.1652 15.2635 15.2652C16.1646 14.3652 16.6152 13.2768 16.6152 12C16.6152 10.7231 16.1652 9.63471 15.2652 8.73471C14.3652 7.83471 13.2768 7.38471 12 7.38471V16.6152Z"
          />
        </svg>
      </button>
    </Navigation>
  );
}

function Navigation(props: { children: React.ReactNode }) {
  const [reduceMotion, setReduceMotion] = useState<boolean>(false);
  const refList = useRef<HTMLDivElement>(null);

  const handleKeyboard = useCallback((e: React.KeyboardEvent) => {
    const list = refList.current;
    if (!list) return;

    const tabs = Array.from<HTMLDivElement>(
      list.querySelectorAll("button:not([disabled])"),
    );

    const index = tabs.indexOf(document.activeElement as HTMLDivElement);
    if (index < 0) return;

    switch (e.key) {
      case "ArrowUp":
      case "ArrowLeft": {
        const next = (index - 1 + tabs.length) % tabs.length;
        tabs[next]?.focus();
        e.preventDefault();
        break;
      }
      case "ArrowDown":
      case "ArrowRight": {
        const next = (index + 1 + tabs.length) % tabs.length;
        tabs[next]?.focus();
        e.preventDefault();
        break;
      }
    }
  }, []);

  return (
    <div
      ref={refList}
      role="menu"
      aria-label="theme"
      className="flex rounded-3xl border border-neutral-400 dark:border-neutral-700"
      onKeyDown={handleKeyboard}
      onFocus={() => setReduceMotion(true)}
      onBlur={() => setReduceMotion(false)}
    >
      {props.children}
      {reduceMotion ? createPortal(<ReduceMotion />, document.body) : null}
    </div>
  );
}

function ReduceMotion() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `.transition-colors{transition-duration:0s}`,
      }}
    ></style>
  );
}

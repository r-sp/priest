"use client";

import type { ColorScheme } from "~/types/color";
import { useEffect, useMemo, useCallback } from "react";
import { useSession } from "~/hooks";

export default function ThemeSwitcher() {
  const theme = useSession((state) => state.theme);
  const setTheme = useSession((state) => state.setTheme);
  const getTheme = useMemo(() => theme, [theme]);

  const getLocalStorage = (key: string): string | null | undefined => {
    let local;
    if (typeof window !== "undefined") {
      try {
        local = window.localStorage.getItem(key);
      } catch (e) {
        console.error(e);
      }
    }
    return local;
  };

  const setLocalStorage = (key: string, value: string): void => {
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(key, value);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const removeTheme = (variant: ColorScheme): void => {
    document.documentElement.classList.remove(variant);
  };

  const addTheme = (variant: ColorScheme): void => {
    document.documentElement.classList.add(variant);
    document.documentElement.style.colorScheme = variant;
  };

  useEffect(() => {
    if (getTheme === undefined) {
      const localTheme = getLocalStorage("theme") as ColorScheme;
      if (localTheme === "dark") {
        setTheme("dark");
      } else if (localTheme === "light") {
        setTheme("light");
      } else {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          setTheme("dark");
          setLocalStorage("theme", "dark");
        } else {
          setTheme("light");
          setLocalStorage("theme", "light");
        }
      }
    }
  }, [getTheme, setTheme]);

  const handleTheme = useCallback(
    (clean: ColorScheme, apply: ColorScheme) => {
      removeTheme(clean);
      addTheme(apply);
      setTheme(apply);
      setLocalStorage("theme", apply);
    },
    [setTheme],
  );

  const isDark = getTheme === "dark";

  const iconSun =
    "M12 16.5C10.7513 16.5 9.68917 16.0622 8.8135 15.1865C7.93783 14.3108 7.5 13.2487 7.5 12C7.5 10.7513 7.93783 9.68917 8.8135 8.8135C9.68917 7.93783 10.7513 7.5 12 7.5C13.2487 7.5 14.3108 7.93783 15.1865 8.8135C16.0622 9.68917 16.5 10.7513 16.5 12C16.5 13.2487 16.0622 14.3108 15.1865 15.1865C14.3108 16.0622 13.2487 16.5 12 16.5ZM5 12.75H1.25V11.25H5V12.75ZM22.75 12.75H19V11.25H22.75V12.75ZM11.25 5V1.25H12.75V5H11.25ZM11.25 22.75V19H12.75V22.75H11.25ZM6.573 7.577L4.23075 5.3155L5.2905 4.20575L7.54625 6.523L6.573 7.577ZM18.7095 19.7943L16.4385 17.4615L17.427 16.423L19.7693 18.6845L18.7095 19.7943ZM16.423 6.573L18.6845 4.23075L19.7943 5.2905L17.477 7.54625L16.423 6.573ZM4.20575 18.7095L6.5385 16.4385L7.55775 17.427L5.30575 19.7788L4.20575 18.7095Z";
  const iconMoon =
    "M12.0288 20.5C9.6678 20.5 7.66089 19.6736 6.00805 18.0207C4.35539 16.3681 3.52905 14.3611 3.52905 12C3.52905 9.73714 4.29664 7.79647 5.8318 6.17797C7.36697 4.55931 9.24672 3.68264 11.4711 3.54797C11.6147 3.54797 11.7558 3.55314 11.8943 3.56347C12.0326 3.57381 12.1685 3.58922 12.3018 3.60972C11.7916 4.08656 11.3853 4.66281 11.0828 5.33847C10.7801 6.01414 10.6288 6.73464 10.6288 7.49997C10.6288 9.13881 11.2025 10.5319 12.3498 11.6792C13.497 12.8264 14.89 13.4 16.5288 13.4C17.3045 13.4 18.0276 13.2487 18.6981 12.9462C19.3686 12.6436 19.9391 12.2371 20.4096 11.727C20.4301 11.8603 20.4455 11.9962 20.4558 12.1347C20.466 12.2731 20.4711 12.4141 20.4711 12.5577C20.3429 14.7821 19.4696 16.6618 17.8511 18.197C16.2324 19.7323 14.2916 20.5 12.0288 20.5Z";

  return (
    <>
      {theme === undefined ? (
        <div className="skeleton mr-[-0.3rem] size-8 rounded-full" />
      ) : (
        <button
          aria-label={`set theme ${isDark ? "light" : "dark"}`}
          className="mr-[-0.3rem] inline-flex size-8 items-center justify-center rounded-full text-gray-700 dark:text-gray-300"
          onClick={() => {
            if (isDark) {
              handleTheme("dark", "light");
            } else {
              handleTheme("light", "dark");
            }
          }}
        >
          <svg
            role="none"
            className="size-6"
            width={24}
            height={24}
            viewBox="0 0 24 24"
          >
            <path fill="currentColor" d={isDark ? iconSun : iconMoon} />
          </svg>
        </button>
      )}
    </>
  );
}

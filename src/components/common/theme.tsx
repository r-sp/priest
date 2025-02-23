"use client";

import type { ColorScheme } from "~/types/color";
import { useEffect, useMemo, useCallback } from "react";
import { useSession } from "~/hooks";
import { motion } from "motion/react";
import Icon from "./icons";

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

  return (
    <motion.button
      initial={{ rotate: -45, scale: 0.5 }}
      animate={{ rotate: 0, scale: 1 }}
      whileTap={{ rotate: 45, scale: 0.8 }}
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
      {theme !== undefined ? (
        <Icon
          size="24"
          type={isDark ? "sun" : "moon"}
          className="pointer-events-none size-6"
        />
      ) : null}
    </motion.button>
  );
}

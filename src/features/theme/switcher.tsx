"use client";

import type { FocusEvent } from "react";
import { useTheme } from "~/hooks";
import { useEffect } from "react";
import {
  addTheme,
  removeTheme,
  setLocalTheme,
  getLocalTheme,
} from "~/utils/theme";
import Navigation from "./navigation";
import Button from "./button";

export default function Switcher() {
  const [theme, setTheme] = useTheme();
  const auto = "auto";
  const light = "light";
  const dark = "dark";

  useEffect(() => {
    if (theme === undefined) {
      setTheme(getLocalTheme());
    }
  }, [theme, setTheme]);

  const handleAutoMode = (e: FocusEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (isDark) {
      addTheme(dark);
    } else {
      removeTheme(dark);
    }
    setTheme(auto);
    return setLocalTheme(auto);
  };

  const handleLightMode = (e: FocusEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    removeTheme(dark);
    setTheme(light);
    return setLocalTheme(light);
  };

  const handleDarkMode = (e: FocusEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    addTheme(dark);
    setTheme(dark);
    return setLocalTheme(dark);
  };

  const modeAuto = theme === auto;
  const modeLight = theme === light;
  const modeDark = theme === dark;

  return (
    <Navigation>
      <Button variant="light" isActive={modeLight} onFocus={handleLightMode} />
      <Button variant="dark" isActive={modeDark} onFocus={handleDarkMode} />
      <Button variant="auto" isActive={modeAuto} onFocus={handleAutoMode} />
    </Navigation>
  );
}

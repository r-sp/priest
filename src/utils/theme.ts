import { ThemeVariant } from "~/lib/types";
import { setLocalStorage, getLocalStorage } from "~/utils/storage";

export const removeTheme = (variant: ThemeVariant): void => {
  document.documentElement.classList.remove(variant);
};

export const addTheme = (variant: ThemeVariant): void => {
  document.documentElement.classList.add(variant);
};

export const setLocalTheme = (variant: ThemeVariant): void => {
  setLocalStorage("theme", variant);
};

export const getLocalTheme = (): ThemeVariant => {
  const local = getLocalStorage("theme") as ThemeVariant;
  if (local) {
    return local;
  } else {
    setLocalTheme("auto");
    return "auto";
  }
};

export const handleThemeListener = (
  event: MediaQueryListEvent,
): MediaQueryListEvent => {
  const currentTheme = getLocalTheme();
  if (currentTheme === "auto") {
    if (event.matches) {
      addTheme("dark");
    } else {
      removeTheme("dark");
    }
  }
  return event;
};

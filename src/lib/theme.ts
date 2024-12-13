import { type ThemeVariant } from "./color";
import { setLocalStorage, getLocalStorage } from "./utils";

export const cleanTheme = (variant: ThemeVariant) => {
  document.documentElement.classList.remove(variant);
};

export const applyTheme = (variant: ThemeVariant) => {
  document.documentElement.classList.add(variant);
};

export const storeTheme = (variant: ThemeVariant) => {
  setLocalStorage("theme", variant);
};

export const getLocalTheme = (): ThemeVariant => {
  const local = getLocalStorage("theme") as ThemeVariant;
  if (local) {
    return local;
  } else {
    storeTheme("auto");
    return "auto";
  }
};

export const localThemeListener = (event: MediaQueryListEvent) => {
  const currentTheme = getLocalTheme();
  if (currentTheme === "auto") {
    if (event.matches) {
      cleanTheme("light");
      applyTheme("dark");
    } else {
      cleanTheme("dark");
      applyTheme("light");
    }
  }
  return event;
};

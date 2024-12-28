import { type ThemeVariant } from "./types";
import { setLocalStorage, getLocalStorage } from "./storage";

export function cleanTheme(variant: ThemeVariant) {
  document.documentElement.classList.remove(variant);
}

export function applyTheme(variant: ThemeVariant) {
  document.documentElement.classList.add(variant);
}

export function storeTheme(variant: ThemeVariant) {
  setLocalStorage("theme", variant);
}

export function getLocalTheme(): ThemeVariant {
  const local = getLocalStorage("theme") as ThemeVariant;
  if (local) {
    return local;
  } else {
    storeTheme("auto");
    return "auto";
  }
}

export function localThemeListener(event: MediaQueryListEvent) {
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
}

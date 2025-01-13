import { ThemeVariant } from "~/lib/types";
import { setLocalStorage, getLocalStorage } from "./storage";

export const removeTheme = (variant: ThemeVariant): void => {
  document.documentElement.classList.remove(variant);
};

export const addTheme = (variant: ThemeVariant): void => {
  document.documentElement.classList.add(variant);
  document.documentElement.style.colorScheme = variant;
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

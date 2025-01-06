import {
  modeRgb,
  modeHsl,
  modeHwb,
  modeLab,
  modeLch,
  modeOklab,
  modeOklch,
  useMode as add,
} from "culori/fn";

export const rgb = add(modeRgb);
export const hsl = add(modeHsl);
export const hwb = add(modeHwb);
export const lab = add(modeLab);
export const lch = add(modeLch);
export const oklab = add(modeOklab);
export const oklch = add(modeOklch);

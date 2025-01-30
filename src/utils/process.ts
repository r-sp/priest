import type { ColorMode, ColorState } from "~/types/color";
import type { SessionState } from "~/types/session";
import { convertRgb } from "./convert";
import { createColor, createHue } from "./format";

const createService = (): SessionState => {
  const now = new Date();
  const date = now.getUTCDate();
  const day = now.getUTCDay();
  const hwb: ColorMode<"hwb"> = {
    mode: "hwb",
    h: date * 11.612903225806452,
    w: date * 1.032258064516129,
    b: day * 3.5,
  };

  const format: keyof ColorState = "hex";
  const rgb = convertRgb(hwb);
  const state = createColor(hwb);
  const hue = createHue(state, format);

  return {
    theme: undefined,
    color: rgb,
    mode: format,
    hue: { color: hue, value: hue.h!, min: 1, max: 36 },
  };
};

export { createService };

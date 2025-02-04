import type { ColorMode, ColorState } from "~/types/color";
import type { SessionState } from "~/types/session";
import { convertRgb } from "./convert";

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

  return {
    theme: undefined,
    color: rgb,
    mode: format,
    hue: { base: 15, min: 0, max: 345 },
  };
};

export { createService };

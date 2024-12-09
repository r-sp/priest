import ColorDetail from "./detail";

import { default as Rgb } from "./input/rgb";
import { default as Hsl } from "./input/hsl";
import { default as Hwb } from "./input/hwb";
import { default as Lab } from "./input/lab";
import { default as Lch } from "./input/lch";
import { default as Oklab } from "./input/oklab";
import { default as Oklch } from "./input/oklch";

const ColorInput = { Rgb, Hsl, Hwb, Lab, Lch, Oklab, Oklch };

export { ColorDetail, ColorInput };

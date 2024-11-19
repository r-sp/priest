import { type Colord, colord, extend, random, getFormat } from "colord";
import { type AnyColor } from "./types";

import harmoniesPlugin from "colord/plugins/harmonies";
import minifyPlugin from "colord/plugins/minify";

extend([harmoniesPlugin, minifyPlugin]);

export const useColor: (input: AnyColor) => Colord = colord;
export const convertColor: (input: AnyColor) => Colord = colord;
export const getRandomColor = random;
export const getFormatColor = getFormat;

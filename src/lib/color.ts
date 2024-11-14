import { colord, extend, random, getFormat } from "colord";

import harmoniesPlugin from "colord/plugins/harmonies";
import minifyPlugin from "colord/plugins/minify";

extend([harmoniesPlugin, minifyPlugin]);

export const useColor = colord;
export const getRandomColor = random;
export const getFormatColor = getFormat;

import { colorsNamed, nearest, differenceCiede2000 } from "culori";

export type WebColor = {
  slug: string;
  hex: string;
};

const red: WebColor[] = [
  { slug: "DarkRed", hex: "8b0000" },
  { slug: "Red", hex: "ff0000" },
  { slug: "Firebrick", hex: "b22222" },
  { slug: "Crimson", hex: "dc143c" },
  { slug: "IndianRed", hex: "cd5c5c" },
  { slug: "LightCoral", hex: "f08080" },
  { slug: "Salmon", hex: "fa8072" },
  { slug: "DarkSalmon", hex: "e9967a" },
  { slug: "LightSalmon", hex: "ffa07a" },
];

const brown: WebColor[] = [
  { slug: "Maroon", hex: "800000" },
  { slug: "Brown", hex: "a52a2a" },
  { slug: "SaddleBrown", hex: "8b4513" },
  { slug: "Sienna", hex: "a0522d" },
  { slug: "Chocolate", hex: "d2691e" },
  { slug: "DarkGoldenrod", hex: "b8860b" },
  { slug: "Peru", hex: "cd853f" },
  { slug: "RosyBrown", hex: "bc8f8f" },
  { slug: "Goldenrod", hex: "daa520" },
  { slug: "SandyBrown", hex: "f4a460" },
  { slug: "Tan", hex: "d2b48c" },
  { slug: "Burlywood", hex: "deb887" },
  { slug: "Wheat", hex: "f5deb3" },
  { slug: "NavajoWhite", hex: "ffdead" },
  { slug: "Bisque", hex: "ffe4c4" },
  { slug: "BlanchedAlmond", hex: "ffebcd" },
  { slug: "Cornsilk", hex: "fff8dc" },
];

const orange: WebColor[] = [
  { slug: "OrangeRed", hex: "ff4500" },
  { slug: "Tomato", hex: "ff6347" },
  { slug: "DarkOrange", hex: "ff8c00" },
  { slug: "Coral", hex: "ff7f50" },
  { slug: "Orange", hex: "ffa500" },
];

const yellow: WebColor[] = [
  { slug: "DarkKhaki", hex: "bdb76b" },
  { slug: "Gold", hex: "ffd700" },
  { slug: "Khaki", hex: "f0e68c" },
  { slug: "PeachPuff", hex: "ffdab9" },
  { slug: "Yellow", hex: "ffff00" },
  { slug: "PaleGoldenrod", hex: "eee8aa" },
  { slug: "Moccasin", hex: "ffe4b5" },
  { slug: "PapayaWhip", hex: "ffefd5" },
  { slug: "LightGoldenrodYellow", hex: "fafad2" },
  { slug: "LemonChiffon", hex: "fffacd" },
  { slug: "LightYellow", hex: "ffffe0" },
];

const green: WebColor[] = [
  { slug: "DarkGreen", hex: "006400" },
  { slug: "Green", hex: "008000" },
  { slug: "DarkOliveGreen", hex: "556b2f" },
  { slug: "ForestGreen", hex: "228b22" },
  { slug: "SeaGreen", hex: "2e8b57" },
  { slug: "Olive", hex: "808000" },
  { slug: "OliveDrab", hex: "6b8e23" },
  { slug: "MediumSeaGreen", hex: "3cb371" },
  { slug: "LimeGreen", hex: "32cd32" },
  { slug: "Lime", hex: "00ff00" },
  { slug: "SpringGreen", hex: "00ff7f" },
  { slug: "MediumSpringGreen", hex: "00fa9a" },
  { slug: "DarkSeaGreen", hex: "8fbc8f" },
  { slug: "MediumAquamarine", hex: "66cdaa" },
  { slug: "YellowGreen", hex: "9acd32" },
  { slug: "LawnGreen", hex: "7cfc00" },
  { slug: "Chartreuse", hex: "7fff00" },
  { slug: "LightGreen", hex: "90ee90" },
  { slug: "GreenYellow", hex: "adff2f" },
  { slug: "PaleGreen", hex: "98fb98" },
];

const cyan: WebColor[] = [
  { slug: "Teal", hex: "008080" },
  { slug: "DarkCyan", hex: "008b8b" },
  { slug: "LightSeaGreen", hex: "20b2aa" },
  { slug: "CadetBlue", hex: "5f9ea0" },
  { slug: "DarkTurquoise", hex: "00ced1" },
  { slug: "MediumTurquoise", hex: "48d1cc" },
  { slug: "Turquoise", hex: "40e0d0" },
  { slug: "Aqua", hex: "00ffff" },
  { slug: "Cyan", hex: "00ffff" },
  { slug: "Aquamarine", hex: "7fffd4" },
  { slug: "PaleTurquoise", hex: "afeeee" },
  { slug: "LightCyan", hex: "e0ffff" },
];

const blue: WebColor[] = [
  { slug: "MidnightBlue", hex: "191970" },
  { slug: "Navy", hex: "000080" },
  { slug: "DarkBlue", hex: "00008b" },
  { slug: "MediumBlue", hex: "0000cd" },
  { slug: "Blue", hex: "0000ff" },
  { slug: "RoyalBlue", hex: "4169e1" },
  { slug: "SteelBlue", hex: "4682b4" },
  { slug: "DodgerBlue", hex: "1e90ff" },
  { slug: "DeepSkyBlue", hex: "00bfff" },
  { slug: "CornflowerBlue", hex: "6495ed" },
  { slug: "SkyBlue", hex: "87ceeb" },
  { slug: "LightSkyBlue", hex: "87cefa" },
  { slug: "LightSteelBlue", hex: "b0c4de" },
  { slug: "LightBlue", hex: "add8e6" },
  { slug: "PowderBlue", hex: "b0e0e6" },
];

const purple: WebColor[] = [
  { slug: "RebeccaPurple", hex: "663399" },
  { slug: "Indigo", hex: "4b0082" },
  { slug: "Purple", hex: "800080" },
  { slug: "DarkMagenta", hex: "8b008b" },
  { slug: "DarkViolet", hex: "9400d3" },
  { slug: "DarkSlateBlue", hex: "483d8b" },
  { slug: "BlueViolet", hex: "8a2be2" },
  { slug: "DarkOrchid", hex: "9932cc" },
  { slug: "Fuchsia", hex: "ff00ff" },
  { slug: "Magenta", hex: "ff00ff" },
  { slug: "SlateBlue", hex: "6a5acd" },
  { slug: "MediumSlateBlue", hex: "7b68ee" },
  { slug: "MediumOrchid", hex: "ba55d3" },
  { slug: "MediumPurple", hex: "9370db" },
  { slug: "Orchid", hex: "da70d6" },
  { slug: "Violet", hex: "ee82ee" },
  { slug: "Plum", hex: "dda0dd" },
  { slug: "Thistle", hex: "d8bfd8" },
  { slug: "Lavender", hex: "e6e6fa" },
];

const pink: WebColor[] = [
  { slug: "MediumVioletRed", hex: "c71585" },
  { slug: "DeepPink", hex: "ff1493" },
  { slug: "PaleVioletRed", hex: "db7093" },
  { slug: "HotPink", hex: "ff69B4" },
  { slug: "LightPink", hex: "ffb6c1" },
  { slug: "Pink", hex: "ffc0cb" },
];

const white: WebColor[] = [
  { slug: "MistyRose", hex: "ffe4e1" },
  { slug: "AntiqueWhite", hex: "faebd7" },
  { slug: "Linen", hex: "faf0e6" },
  { slug: "Beige", hex: "f5f5dc" },
  { slug: "WhiteSmoke", hex: "f5f5f5" },
  { slug: "LavenderBlush", hex: "fff0f5" },
  { slug: "OldLace", hex: "fdf5e6" },
  { slug: "AliceBlue", hex: "f0f8ff" },
  { slug: "Seashell", hex: "fff5ee" },
  { slug: "GhostWhite", hex: "f8f8ff" },
  { slug: "Honeydew", hex: "f0fff0" },
  { slug: "FloralWhite", hex: "fffaf0" },
  { slug: "Azure", hex: "f0ffff" },
  { slug: "MintCream", hex: "f5fffa" },
  { slug: "Snow", hex: "fffafa" },
  { slug: "Ivory", hex: "fffff0" },
  { slug: "White", hex: "ffffff" },
];

const black: WebColor[] = [
  { slug: "Black", hex: "000000" },
  { slug: "DarkSlateGray", hex: "2f4f4f" },
  { slug: "DimGray", hex: "696969" },
  { slug: "SlateGray", hex: "708090" },
  { slug: "Gray", hex: "808080" },
  { slug: "LightSlateGray", hex: "778899" },
  { slug: "DarkGray", hex: "a9a9a9" },
  { slug: "Silver", hex: "c0c0c0" },
  { slug: "LightGray", hex: "d3d3d3" },
  { slug: "Gainsboro", hex: "dcdcdc" },
];

export const namedColors = {
  red,
  brown,
  orange,
  yellow,
  green,
  cyan,
  blue,
  purple,
  pink,
  white,
  black,
};

export const allColors = [
  ...red,
  ...brown,
  ...orange,
  ...yellow,
  ...green,
  ...cyan,
  ...blue,
  ...purple,
  ...pink,
  ...white,
  ...black,
];

export const allColorsName = allColors.map((color) => color.slug);

export const findColor = (name: string) =>
  allColorsName.find((color) => name === color.toLowerCase() && color);

const webColor = Object.keys(colorsNamed);
const nearestNamedColors = nearest(webColor, differenceCiede2000());

export const nearestColor = (hex: string) => {
  return nearestNamedColors(hex, 1).find((name) => name);
};

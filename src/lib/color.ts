export type ColorShadeName =
  | "black"
  | "gray"
  | "white"
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "cyan"
  | "blue"
  | "violet"
  | "purple"
  | "magenta"
  | "pink"
  | "brown";

export type ColorShadeList = {
  hex: string;
  rgb: { r: number; g: number; b: number };
  label?: string;
}[];

export const getColorName = (name: ColorShadeName): string => {
  switch (name) {
    case "black":
      return "Color Black";
      break;
    case "gray":
      return "Color Gray";
      break;
    case "white":
      return "Color White";
      break;
    case "red":
      return "Color Red";
      break;
    case "orange":
      return "Color Orange";
      break;
    case "yellow":
      return "Color Yellow";
      break;
    case "green":
      return "Color Green";
      break;
    case "cyan":
      return "Color Cyan";
      break;
    case "blue":
      return "Color Blue";
      break;
    case "violet":
      return "Color Violet";
      break;
    case "purple":
      return "Color Purple";
      break;
    case "magenta":
      return "Color Magenta";
      break;
    case "pink":
      return "Color Pink";
      break;
    case "brown":
      return "Color Brown";
      break;
    default:
      return "Color";
  }
};

const colorBlack: ColorShadeList = [
  { hex: "#000000", rgb: { r: 0, g: 0, b: 0 }, label: "Black" },
  { hex: "#696969", rgb: { r: 105, g: 105, b: 105 }, label: "Dim Gray" },
  { hex: "#002e63", rgb: { r: 0, g: 46, b: 99 }, label: "Cool Black" },
  { hex: "#555d50", rgb: { r: 85, g: 93, b: 80 }, label: "Ebony" },
  { hex: "#555555", rgb: { r: 85, g: 85, b: 85 }, label: "Davy's Gray" },
  { hex: "#36454f", rgb: { r: 54, g: 69, b: 79 }, label: "Charcoal" },
  { hex: "#414a4c", rgb: { r: 65, g: 74, b: 76 }, label: "Outer Space" },
  { hex: "#483c32", rgb: { r: 72, g: 60, b: 50 }, label: "Taupe" },
  { hex: "#3d0c02", rgb: { r: 61, g: 12, b: 2 }, label: "Bean" },
  { hex: "#3b3c36", rgb: { r: 59, g: 60, b: 54 }, label: "Olive (RAL)" },
  { hex: "#353839", rgb: { r: 53, g: 56, b: 57 }, label: "Onyx" },
  { hex: "#343434", rgb: { r: 52, g: 52, b: 52 }, label: "Jet" },
  { hex: "#0e0e10", rgb: { r: 52, g: 52, b: 52 }, label: "Jet Black (RAL 9005)" },
  { hex: "#242124", rgb: { r: 36, g: 33, b: 36 }, label: "Raisin Black" },
  { hex: "#232b2b", rgb: { r: 35, g: 43, b: 43 }, label: "Charleston Green" },
  { hex: "#1b1b1b", rgb: { r: 27, g: 27, b: 27 }, label: "Eerie Black" },
  { hex: "#1a1110", rgb: { r: 26, g: 17, b: 16 }, label: "Licorice" },
];

const colorGray: ColorShadeList = [
  { hex: "#808080", rgb: { r: 128, g: 128, b: 128 }, label: "Gray" },
  { hex: "#dcdcdc", rgb: { r: 220, g: 220, b: 220 }, label: "Gainsboro" },
  { hex: "#c0c0c0", rgb: { r: 192, g: 192, b: 192 }, label: "Silver" },
  { hex: "#bebebe", rgb: { r: 190, g: 190, b: 190 }, label: "Medium Gray" },
  { hex: "#989898", rgb: { r: 152, g: 152, b: 152 }, label: "Spanish Gray" },
  { hex: "#555555", rgb: { r: 85, g: 85, b: 85 }, label: "Davy's Gray" },
  { hex: "#738678", rgb: { r: 115, g: 134, b: 120 }, label: "Xanadu" },
  { hex: "#e5e4e2", rgb: { r: 229, g: 228, b: 226 }, label: "Platinum" },
  { hex: "#b2beb5", rgb: { r: 178, g: 190, b: 181 }, label: "Ash Gray" },
  { hex: "#848482", rgb: { r: 132, g: 132, b: 130 }, label: "Battleship Gray" },
  { hex: "#2a3439", rgb: { r: 42, g: 52, b: 57 }, label: "Gunmetal" },
  { hex: "#36454f", rgb: { r: 54, g: 69, b: 79 }, label: "Charcoal" },
  { hex: "#928e85", rgb: { r: 146, g: 142, b: 133 }, label: "Stone Gray" },
  { hex: "#9090c0", rgb: { r: 144, g: 144, b: 192 }, label: "Cool Gray" },
  { hex: "#91a3b0", rgb: { r: 145, g: 163, b: 176 }, label: "Cadet Gray" },
  { hex: "#6699cc", rgb: { r: 102, g: 153, b: 204 }, label: "Blue Gray" },
  { hex: "#6082b6", rgb: { r: 96, g: 130, b: 182 }, label: "Glaucous" },
  { hex: "#708090", rgb: { r: 112, g: 128, b: 144 }, label: "Slate Gray" },
  { hex: "#5e716a", rgb: { r: 94, g: 113, b: 106 }, label: "Gray Green" },
  { hex: "#4c5866", rgb: { r: 76, g: 88, b: 102 }, label: "Marengo" },
  { hex: "#686a6c", rgb: { r: 104, g: 106, b: 108 }, label: "Nardo Gray" },
  { hex: "#aa98a9", rgb: { r: 170, g: 152, b: 169 }, label: "Rose Quartz" },
  { hex: "#98817b", rgb: { r: 152, g: 129, b: 123 }, label: "Cinereous" },
  { hex: "#483c32", rgb: { r: 72, g: 60, b: 50 }, label: "Taupe" },
  { hex: "#ccc2ba", rgb: { r: 204, g: 194, b: 186 }, label: "Greige" },
];

const colorWhite: ColorShadeList = [
  { hex: "#ffffff", rgb: { r: 255, g: 255, b: 255 }, label: "White" },
  { hex: "#fbffff", rgb: { r: 251, g: 255, b: 255 }, label: "Chalk White" },
  { hex: "#f8f8ff", rgb: { r: 248, g: 248, b: 255 }, label: "Ghost White" },
  { hex: "#f5f5f5", rgb: { r: 245, g: 245, b: 245 }, label: "White Smoke" },
  { hex: "#f4f5fa", rgb: { r: 244, g: 245, b: 250 }, label: "White Solid" },
  { hex: "#fefefa", rgb: { r: 254, g: 254, b: 250 }, label: "Baby Powder" },
  { hex: "#fffafa", rgb: { r: 255, g: 250, b: 250 }, label: "Snow" },
  { hex: "#fffff0", rgb: { r: 255, g: 255, b: 240 }, label: "Ivory" },
  { hex: "#fffaf0", rgb: { r: 255, g: 250, b: 240 }, label: "Floral White" },
  { hex: "#fff5ee", rgb: { r: 255, g: 245, b: 238 }, label: "Seashell" },
  { hex: "#f9f6ee", rgb: { r: 249, g: 246, b: 238 }, label: "Bone White" },
  { hex: "#fff8dc", rgb: { r: 255, g: 248, b: 220 }, label: "Cornsilk" },
  { hex: "#fdf5e6", rgb: { r: 253, g: 245, b: 230 }, label: "Old Lace" },
  { hex: "#fffdd0", rgb: { r: 255, g: 253, b: 208 }, label: "Cream" },
  { hex: "#f5f5dc", rgb: { r: 245, g: 245, b: 220 }, label: "Beige" },
  { hex: "#f1e9d2", rgb: { r: 241, g: 233, b: 210 }, label: "Parchment" },
  { hex: "#faebd7", rgb: { r: 250, g: 235, b: 215 }, label: "Antique White" },
  { hex: "#f7e7ce", rgb: { r: 247, g: 231, b: 206 }, label: "Champagne" },
  { hex: "#f0ead6", rgb: { r: 240, g: 234, b: 214 }, label: "Eggshell" },
  { hex: "#efdfbb", rgb: { r: 239, g: 223, b: 187 }, label: "Dutch White" },
  { hex: "#e3dac9", rgb: { r: 227, g: 218, b: 201 }, label: "Bone" },
  { hex: "#f3e5ab", rgb: { r: 243, g: 229, b: 171 }, label: "Vanilla" },
  { hex: "#eedc82", rgb: { r: 238, g: 220, b: 130 }, label: "Flax" },
  { hex: "#ffdead", rgb: { r: 255, g: 222, b: 173 }, label: "Navajo White" },
  { hex: "#edeae0", rgb: { r: 237, g: 234, b: 224 }, label: "Alabaster" },
  { hex: "#faf0e6", rgb: { r: 250, g: 240, b: 230 }, label: "Linen" },
];

const colorRed: ColorShadeList = [
  { hex: "#ff0000", rgb: { r: 255, g: 0, b: 0 }, label: "Red (RGB)" },
  { hex: "#ed1b24", rgb: { r: 237, g: 27, b: 36 }, label: "Red (CMYK)" },
  { hex: "#ed0a3f", rgb: { r: 237, g: 10, b: 63 }, label: "Red (Crayola)" },
  { hex: "#ff0024", rgb: { r: 255, g: 0, b: 66 }, label: "Red (Munshell)" },
  { hex: "#c40234", rgb: { r: 196, g: 2, b: 52 }, label: "Red (NCS)" },
  { hex: "#ed2839", rgb: { r: 237, g: 40, b: 57 }, label: "Red (Pantone)" },
  { hex: "#a50021", rgb: { r: 165, g: 0, b: 33 }, label: "Madder" },
  { hex: "#fb607f", rgb: { r: 251, g: 96, b: 127 }, label: "Brink Pink" },
  { hex: "#dc143c", rgb: { r: 220, g: 20, b: 60 }, label: "Crimson" },
  { hex: "#ffc0cb", rgb: { r: 255, g: 192, b: 203 }, label: "Pink" },
  { hex: "#ff91a4", rgb: { r: 255, g: 145, b: 164 }, label: "Salmon Pink" },
  { hex: "#c51e3a", rgb: { r: 197, g: 30, b: 58 }, label: "Cardinal" },
  { hex: "#be0032", rgb: { r: 190, g: 0, b: 50 }, label: "Apple Red" },
  { hex: "#dc343b", rgb: { r: 220, g: 52, b: 59 }, label: "Poppy Red" },
  { hex: "#960018", rgb: { r: 150, g: 0, b: 24 }, label: "Carmine" },
  { hex: "#e60026", rgb: { r: 230, g: 0, b: 38 }, label: "Spanish Red" },
  { hex: "#da2c43", rgb: { r: 218, g: 44, b: 67 }, label: "Rusty Red" },
  { hex: "#58111a", rgb: { r: 88, g: 17, b: 26 }, label: "Chocolate Cosmos" },
  { hex: "#65000b", rgb: { r: 101, g: 0, b: 11 }, label: "Rosewood" },
  { hex: "#ed2939", rgb: { r: 237, g: 41, b: 57 }, label: "Imperial Red" },
  { hex: "#893f45", rgb: { r: 137, g: 63, b: 69 }, label: "Cordovan" },
  { hex: "#ce2029", rgb: { r: 206, g: 32, b: 41 }, label: "Fire Engine Red" },
  { hex: "#ab4e52", rgb: { r: 171, g: 78, b: 82 }, label: "Rose Vale" },
  { hex: "#c08081", rgb: { r: 192, g: 128, b: 129 }, label: "Old Rose" },
  { hex: "#bf4f51", rgb: { r: 191, g: 79, b: 81 }, label: "Bittersweet Shimmer" },
  { hex: "#ff8080", rgb: { r: 255, g: 128, b: 128 }, label: "Light Red" },
  { hex: "#f08080", rgb: { r: 240, g: 128, b: 128 }, label: "Light Coral" },
  { hex: "#733635", rgb: { r: 115, g: 54, b: 53 }, label: "Garnet" },
  { hex: "#674846", rgb: { r: 103, g: 72, b: 70 }, label: "Rose Ebony" },
  { hex: "#e03c31", rgb: { r: 224, g: 60, b: 49 }, label: "Chili Red" },
  { hex: "#e34234", rgb: { r: 227, g: 66, b: 52 }, label: "Vermilion" },
  { hex: "#ffe4e1", rgb: { r: 225, g: 228, b: 225 }, label: "Misty Rose" },
  { hex: "#a91101", rgb: { r: 169, g: 17, b: 1 }, label: "Turkey Red" },
  { hex: "#fa8072", rgb: { r: 250, g: 128, b: 114 }, label: "Salmon" },
  { hex: "#f88379", rgb: { r: 248, g: 131, b: 121 }, label: "Coral Pink" },
  { hex: "#fdbcb4", rgb: { r: 253, g: 188, b: 180 }, label: "Cantaloupe Melon" },
  { hex: "#7c0902", rgb: { r: 124, g: 9, b: 2 }, label: "Barn Red" },
  { hex: "#660000", rgb: { r: 102, g: 0, b: 0 }, label: "Blood Red" },
  { hex: "#f4c2c2", rgb: { r: 244, g: 194, b: 194 }, label: "Tea Rose" },
  { hex: "#e44d2e", rgb: { r: 228, g: 77, b: 46 }, label: "Cinnabar" },
  { hex: "#8b0000", rgb: { r: 139, g: 0, b: 0 }, label: "Dark Red" },
  { hex: "#b22222", rgb: { r: 178, g: 34, b: 34 }, label: "Fire Brick" },
  { hex: "#cd5c5c", rgb: { r: 205, g: 92, b: 92 }, label: "Indian Red" },
  { hex: "#e62020", rgb: { r: 230, g: 32, b: 32 }, label: "Lust" },
  { hex: "#800000", rgb: { r: 128, g: 0, b: 0 }, label: "Maroon" },
  { hex: "#a45953", rgb: { r: 164, g: 89, b: 83 }, label: "Redwood" },
  { hex: "#ff2400", rgb: { r: 255, g: 36, b: 0 }, label: "Scarlet" },
  { hex: "#ff6347", rgb: { r: 255, g: 99, b: 71 }, label: "Tomato" },
  { hex: "#d05340", rgb: { r: 208, g: 83, b: 64 }, label: "Jasper" },
  { hex: "#bc8f8f", rgb: { r: 188, g: 143, b: 143 }, label: "Rosy Brown" },
  { hex: "#905d5d", rgb: { r: 144, g: 93, b: 93 }, label: "Rose Taupe" },
  { hex: "#e52b50", rgb: { r: 229, g: 43, b: 80 }, label: "Amaranth" },
  { hex: "#ff2226", rgb: { r: 255, g: 34, b: 38 }, label: "Fluorescent Red" },
];

const colorOrange: ColorShadeList = [
  { hex: "#ffa500", rgb: { r: 255, g: 165, b: 0 }, label: "Orange" },
  { hex: "#ff8c00", rgb: { r: 255, g: 140, b: 0 }, label: "Dark Orange" },
  { hex: "#ff7900", rgb: { r: 255, g: 121, b: 0 }, label: "Safety Orange" },
  { hex: "#ff4f00", rgb: { r: 255, g: 79, b: 0 }, label: "International Orange (Aerospace)" },
  { hex: "#f04a00", rgb: { r: 240, g: 74, b: 0 }, label: "International Orange (Golden Gate Bridge)" },
  { hex: "#ff5800", rgb: { r: 255, g: 88, b: 0 }, label: "Orange (Pantone)" },
  { hex: "#ff7538", rgb: { r: 255, g: 117, b: 56 }, label: "Orange (Crayola)" },
  { hex: "#ffefd5", rgb: { r: 255, g: 239, b: 213 }, label: "Papaya Whip" },
  { hex: "#ffe5b4", rgb: { r: 255, g: 229, b: 180 }, label: "Peach" },
  { hex: "#fed8b1", rgb: { r: 254, g: 216, b: 177 }, label: "Light Orange" },
  { hex: "#fbceb1", rgb: { r: 251, g: 206, b: 177 }, label: "Apricot" },
  { hex: "#fdbcb4", rgb: { r: 253, g: 188, b: 180 }, label: "Melon" },
  { hex: "#ff9966", rgb: { r: 255, g: 153, b: 102 }, label: "Atomic Tangerine" },
  { hex: "#f1b42f", rgb: { r: 241, g: 180, b: 47 }, label: "Xanthous" },
  { hex: "#ed9121", rgb: { r: 237, g: 145, b: 33 }, label: "Carrot Orange" },
  { hex: "#ff9f00", rgb: { r: 255, g: 159, b: 0 }, label: "Orange Peel" },
  { hex: "#e77500", rgb: { r: 231, g: 117, b: 0 }, label: "Princeton Orange" },
  { hex: "#ff8200", rgb: { r: 255, g: 130, b: 0 }, label: "UT Orange" },
  { hex: "#e86100", rgb: { r: 232, g: 97, b: 0 }, label: "Orange (G&S)" },
  { hex: "#f28500", rgb: { r: 242, g: 133, b: 0 }, label: "Tangerine" },
  { hex: "#ff7f50", rgb: { r: 255, g: 127, b: 80 }, label: "Coral" },
  { hex: "#ff7518", rgb: { r: 255, g: 117, b: 24 }, label: "Pumpkin" },
  { hex: "#f94d00", rgb: { r: 249, g: 77, b: 0 }, label: "Tangelo" },
  { hex: "#f4c430", rgb: { r: 244, g: 196, b: 48 }, label: "Saffron" },
  { hex: "#daa520", rgb: { r: 218, g: 165, b: 32 }, label: "Goldenrod" },
  { hex: "#e8ac41", rgb: { r: 232, g: 172, b: 65 }, label: "Hunyadi Yellow" },
  { hex: "#fe5a1d", rgb: { r: 254, g: 90, b: 29 }, label: "Giants Orange" },
  { hex: "#ec5800", rgb: { r: 236, g: 88, b: 0 }, label: "Persimmon" },
  { hex: "#e09540", rgb: { r: 224, g: 149, b: 64 }, label: "Butterscotch" },
  { hex: "#d99058", rgb: { r: 217, g: 144, b: 88 }, label: "Persian Orange" },
  { hex: "#c46210", rgb: { r: 196, g: 98, b: 16 }, label: "Alloy Orange" },
  { hex: "#bf5700", rgb: { r: 191, g: 87, b: 0 }, label: "Burnt Orange" },
  { hex: "#b56917", rgb: { r: 181, g: 105, b: 23 }, label: "Tiger's Eye" },
  { hex: "#964b00", rgb: { r: 150, g: 75, b: 0 }, label: "Brown" },
  { hex: "#f8c8b0", rgb: { r: 248, g: 200, b: 176 }, label: "Apricot Peach" },
];

const colorYellow: ColorShadeList = [];

const colorGreen: ColorShadeList = [];

const colorCyan: ColorShadeList = [];

const colorBlue: ColorShadeList = [];

const colorViolet: ColorShadeList = [];

const colorPurple: ColorShadeList = [];

const colorMagenta: ColorShadeList = [];

const colorPink: ColorShadeList = [];

const colorBrown: ColorShadeList = [];

export const getColorShade = (name: ColorShadeName): ColorShadeList => {
  switch (name) {
    case "black":
      return colorBlack;
      break;
    case "gray":
      return colorGray;
      break;
    case "white":
      return colorWhite;
      break;
    case "red":
      return colorRed;
      break;
    case "orange":
      return colorOrange;
      break;
    case "yellow":
      return colorYellow;
      break;
    case "green":
      return colorGreen;
      break;
    case "cyan":
      return colorCyan;
      break;
    case "blue":
      return colorBlue;
      break;
    case "violet":
      return colorViolet;
      break;
    case "purple":
      return colorPurple;
      break;
    case "magenta":
      return colorMagenta;
      break;
    case "pink":
      return colorPink;
      break;
    case "brown":
      return colorBrown;
      break;
  }
};

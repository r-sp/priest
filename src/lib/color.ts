import type { RgbaColor } from "./types";

export type ColorShadeName = "black" | "gray" | "white" | "red";

export type ColorShadeList = {
  hex: string;
  rgb: RgbaColor;
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
    default:
      return "Color";
  }
};

const colorBlack: ColorShadeList = [
  { hex: "#000000", rgb: { r: 0, g: 0, b: 0, a: 1 }, label: "Black" },
  { hex: "#696969", rgb: { r: 105, g: 105, b: 105, a: 1 }, label: "Dim Gray" },
  { hex: "#002e63", rgb: { r: 0, g: 46, b: 99, a: 1 }, label: "Cool Black" },
  { hex: "#555d50", rgb: { r: 85, g: 93, b: 80, a: 1 }, label: "Ebony" },
  { hex: "#555555", rgb: { r: 85, g: 85, b: 85, a: 1 }, label: "Davy's Gray" },
  { hex: "#36454f", rgb: { r: 54, g: 69, b: 79, a: 1 }, label: "Charcoal" },
  { hex: "#414a4c", rgb: { r: 65, g: 74, b: 76, a: 1 }, label: "Outer Space" },
  { hex: "#483c32", rgb: { r: 72, g: 60, b: 50, a: 1 }, label: "Taupe" },
  { hex: "#3d0c02", rgb: { r: 61, g: 12, b: 2, a: 1 }, label: "Bean" },
  { hex: "#3b3c36", rgb: { r: 59, g: 60, b: 54, a: 1 }, label: "Olive (RAL)" },
  { hex: "#353839", rgb: { r: 53, g: 56, b: 57, a: 1 }, label: "Onyx" },
  { hex: "#343434", rgb: { r: 52, g: 52, b: 52, a: 1 }, label: "Jet" },
  { hex: "#0e0e10", rgb: { r: 52, g: 52, b: 52, a: 1 }, label: "Jet Black (RAL 9005)" },
  { hex: "#242124", rgb: { r: 36, g: 33, b: 36, a: 1 }, label: "Raisin Black" },
  { hex: "#232b2b", rgb: { r: 35, g: 43, b: 43, a: 1 }, label: "Charleston Green" },
  { hex: "#1b1b1b", rgb: { r: 27, g: 27, b: 27, a: 1 }, label: "Eerie Black" },
  { hex: "#1a1110", rgb: { r: 26, g: 17, b: 16, a: 1 }, label: "Licorice" },
];

const colorGray: ColorShadeList = [
  { hex: "#808080", rgb: { r: 128, g: 128, b: 128, a: 1 }, label: "Gray" },
  { hex: "#dcdcdc", rgb: { r: 220, g: 220, b: 220, a: 1 }, label: "Gainsboro" },
  { hex: "#c0c0c0", rgb: { r: 192, g: 192, b: 192, a: 1 }, label: "Silver" },
  { hex: "#bebebe", rgb: { r: 190, g: 190, b: 190, a: 1 }, label: "Medium Gray" },
  { hex: "#989898", rgb: { r: 152, g: 152, b: 152, a: 1 }, label: "Spanish Gray" },
  { hex: "#555555", rgb: { r: 85, g: 85, b: 85, a: 1 }, label: "Davy's Gray" },
  { hex: "#738678", rgb: { r: 115, g: 134, b: 120, a: 1 }, label: "Xanadu" },
  { hex: "#e5e4e2", rgb: { r: 229, g: 228, b: 226, a: 1 }, label: "Platinum" },
  { hex: "#b2beb5", rgb: { r: 178, g: 190, b: 181, a: 1 }, label: "Ash Gray" },
  { hex: "#848482", rgb: { r: 132, g: 132, b: 130, a: 1 }, label: "Battleship Gray" },
  { hex: "#2a3439", rgb: { r: 42, g: 52, b: 57, a: 1 }, label: "Gunmetal" },
  { hex: "#36454f", rgb: { r: 54, g: 69, b: 79, a: 1 }, label: "Charcoal" },
  { hex: "#928e85", rgb: { r: 146, g: 142, b: 133, a: 1 }, label: "Stone Gray" },
  { hex: "#9090c0", rgb: { r: 144, g: 144, b: 192, a: 1 }, label: "Cool Gray" },
  { hex: "#91a3b0", rgb: { r: 145, g: 163, b: 176, a: 1 }, label: "Cadet Gray" },
  { hex: "#6699cc", rgb: { r: 102, g: 153, b: 204, a: 1 }, label: "Blue Gray" },
  { hex: "#6082b6", rgb: { r: 96, g: 130, b: 182, a: 1 }, label: "Glaucous" },
  { hex: "#708090", rgb: { r: 112, g: 128, b: 144, a: 1 }, label: "Slate Gray" },
  { hex: "#5e716a", rgb: { r: 94, g: 113, b: 106, a: 1 }, label: "Gray Green" },
  { hex: "#4c5866", rgb: { r: 76, g: 88, b: 102, a: 1 }, label: "Marengo" },
  { hex: "#686a6c", rgb: { r: 104, g: 106, b: 108, a: 1 }, label: "Nardo Gray" },
  { hex: "#aa98a9", rgb: { r: 170, g: 152, b: 169, a: 1 }, label: "Rose Quartz" },
  { hex: "#98817b", rgb: { r: 152, g: 129, b: 123, a: 1 }, label: "Cinereous" },
  { hex: "#483c32", rgb: { r: 72, g: 60, b: 50, a: 1 }, label: "Taupe" },
  { hex: "#ccc2ba", rgb: { r: 204, g: 194, b: 186, a: 1 }, label: "Greige" },
];

const colorWhite: ColorShadeList = [
  { hex: "#ffffff", rgb: { r: 255, g: 255, b: 255, a: 1 }, label: "White" },
  { hex: "#fbffff", rgb: { r: 251, g: 255, b: 255, a: 1 }, label: "Chalk White" },
  { hex: "#f8f8ff", rgb: { r: 248, g: 248, b: 255, a: 1 }, label: "Ghost White" },
  { hex: "#f5f5f5", rgb: { r: 245, g: 245, b: 245, a: 1 }, label: "White Smoke" },
  { hex: "#f4f5fa", rgb: { r: 244, g: 245, b: 250, a: 1 }, label: "White Solid" },
  { hex: "#fefefa", rgb: { r: 254, g: 254, b: 250, a: 1 }, label: "Baby Powder" },
  { hex: "#fffafa", rgb: { r: 255, g: 250, b: 250, a: 1 }, label: "Snow" },
  { hex: "#fffff0", rgb: { r: 255, g: 255, b: 240, a: 1 }, label: "Ivory" },
  { hex: "#fffaf0", rgb: { r: 255, g: 250, b: 240, a: 1 }, label: "Floral White" },
  { hex: "#fff5ee", rgb: { r: 255, g: 245, b: 238, a: 1 }, label: "Seashell" },
  { hex: "#f9f6ee", rgb: { r: 249, g: 246, b: 238, a: 1 }, label: "Bone White" },
  { hex: "#fff8dc", rgb: { r: 255, g: 248, b: 220, a: 1 }, label: "Cornsilk" },
  { hex: "#fdf5e6", rgb: { r: 253, g: 245, b: 230, a: 1 }, label: "Old Lace" },
  { hex: "#fffdd0", rgb: { r: 255, g: 253, b: 208, a: 1 }, label: "Cream" },
  { hex: "#f5f5dc", rgb: { r: 245, g: 245, b: 220, a: 1 }, label: "Beige" },
  { hex: "#f1e9d2", rgb: { r: 241, g: 233, b: 210, a: 1 }, label: "Parchment" },
  { hex: "#faebd7", rgb: { r: 250, g: 235, b: 215, a: 1 }, label: "Antique White" },
  { hex: "#f7e7ce", rgb: { r: 247, g: 231, b: 206, a: 1 }, label: "Champagne" },
  { hex: "#f0ead6", rgb: { r: 240, g: 234, b: 214, a: 1 }, label: "Eggshell" },
  { hex: "#efdfbb", rgb: { r: 239, g: 223, b: 187, a: 1 }, label: "Dutch White" },
  { hex: "#e3dac9", rgb: { r: 227, g: 218, b: 201, a: 1 }, label: "Bone" },
  { hex: "#f3e5ab", rgb: { r: 243, g: 229, b: 171, a: 1 }, label: "Vanilla" },
  { hex: "#eedc82", rgb: { r: 238, g: 220, b: 130, a: 1 }, label: "Flax" },
  { hex: "#ffdead", rgb: { r: 255, g: 222, b: 173, a: 1 }, label: "Navajo White" },
  { hex: "#edeae0", rgb: { r: 237, g: 234, b: 224, a: 1 }, label: "Alabaster" },
  { hex: "#faf0e6", rgb: { r: 250, g: 240, b: 230, a: 1 }, label: "Linen" },
];

const colorRed: ColorShadeList = [
  { hex: "#ff0000", rgb: { r: 255, g: 0, b: 0, a: 1 }, label: "Red (RGB)" },
  { hex: "#ed1b24", rgb: { r: 237, g: 27, b: 36, a: 1 }, label: "Red (CMYK)" },
  { hex: "#ed0a3f", rgb: { r: 237, g: 10, b: 63, a: 1 }, label: "Red (Crayola)" },
  { hex: "#ff0024", rgb: { r: 255, g: 0, b: 66, a: 1 }, label: "Red (Munshell)" },
  { hex: "#c40234", rgb: { r: 196, g: 2, b: 52, a: 1 }, label: "Red (NCS)" },
  { hex: "#ed2839", rgb: { r: 237, g: 40, b: 57, a: 1 }, label: "Red (Pantone)" },
  { hex: "#a50021", rgb: { r: 165, g: 0, b: 33, a: 1 }, label: "Madder" },
  { hex: "#fb607f", rgb: { r: 251, g: 96, b: 127, a: 1 }, label: "Brink Pink" },
  { hex: "#dc143c", rgb: { r: 220, g: 20, b: 60, a: 1 }, label: "Crimson" },
  { hex: "#ffc0cb", rgb: { r: 255, g: 192, b: 203, a: 1 }, label: "Pink" },
  { hex: "#ff91a4", rgb: { r: 255, g: 145, b: 164, a: 1 }, label: "Salmon Pink" },
  { hex: "#c51e3a", rgb: { r: 197, g: 30, b: 58, a: 1 }, label: "Cardinal" },
  { hex: "#be0032", rgb: { r: 190, g: 0, b: 50, a: 1 }, label: "Apple Red" },
  { hex: "#dc343b", rgb: { r: 220, g: 52, b: 59, a: 1 }, label: "Poppy Red" },
  { hex: "#960018", rgb: { r: 150, g: 0, b: 24, a: 1 }, label: "Carmine" },
  { hex: "#e60026", rgb: { r: 230, g: 0, b: 38, a: 1 }, label: "Spanish Red" },
  { hex: "#da2c43", rgb: { r: 218, g: 44, b: 67, a: 1 }, label: "Rusty Red" },
  { hex: "#58111a", rgb: { r: 88, g: 17, b: 26, a: 1 }, label: "Chocolate Cosmos" },
  { hex: "#65000b", rgb: { r: 101, g: 0, b: 11, a: 1 }, label: "Rosewood" },
  { hex: "#ed2939", rgb: { r: 237, g: 41, b: 57, a: 1 }, label: "Imperial Red" },
  { hex: "#893f45", rgb: { r: 137, g: 63, b: 69, a: 1 }, label: "Cordovan" },
  { hex: "#ce2029", rgb: { r: 206, g: 32, b: 41, a: 1 }, label: "Fire Engine Red" },
  { hex: "#ab4e52", rgb: { r: 171, g: 78, b: 82, a: 1 }, label: "Rose Vale" },
  { hex: "#c08081", rgb: { r: 192, g: 128, b: 129, a: 1 }, label: "Old Rose" },
  { hex: "#bf4f51", rgb: { r: 191, g: 79, b: 81, a: 1 }, label: "Bittersweet Shimmer" },
  { hex: "#ff8080", rgb: { r: 255, g: 128, b: 128, a: 1 }, label: "Light Red" },
  { hex: "#f08080", rgb: { r: 240, g: 128, b: 128, a: 1 }, label: "Light Coral" },
  { hex: "#733635", rgb: { r: 115, g: 54, b: 53, a: 1 }, label: "Garnet" },
  { hex: "#674846", rgb: { r: 103, g: 72, b: 70, a: 1 }, label: "Rose Ebony" },
  { hex: "#e03c31", rgb: { r: 224, g: 60, b: 49, a: 1 }, label: "Chili Red" },
  { hex: "#e34234", rgb: { r: 227, g: 66, b: 52, a: 1 }, label: "Vermilion" },
  { hex: "#ffe4e1", rgb: { r: 225, g: 228, b: 225, a: 1 }, label: "Misty Rose" },
  { hex: "#a91101", rgb: { r: 169, g: 17, b: 1, a: 1 }, label: "Turkey Red" },
  { hex: "#fa8072", rgb: { r: 250, g: 128, b: 114, a: 1 }, label: "Salmon" },
  { hex: "#f88379", rgb: { r: 248, g: 131, b: 121, a: 1 }, label: "Coral Pink" },
  { hex: "#fdbcb4", rgb: { r: 253, g: 188, b: 180, a: 1 }, label: "Cantaloupe Melon" },
  { hex: "#7c0902", rgb: { r: 124, g: 9, b: 2, a: 1 }, label: "Barn Red" },
  { hex: "#660000", rgb: { r: 102, g: 0, b: 0, a: 1 }, label: "Blood Red" },
  { hex: "#f4c2c2", rgb: { r: 244, g: 194, b: 194, a: 1 }, label: "Tea Rose" },
  { hex: "#e44d2e", rgb: { r: 228, g: 77, b: 46, a: 1 }, label: "Cinnabar" },
  { hex: "#8b0000", rgb: { r: 139, g: 0, b: 0, a: 1 }, label: "Dark Red" },
  { hex: "#b22222", rgb: { r: 178, g: 34, b: 34, a: 1 }, label: "Fire Brick" },
  { hex: "#cd5c5c", rgb: { r: 205, g: 92, b: 92, a: 1 }, label: "Indian Red" },
  { hex: "#e62020", rgb: { r: 230, g: 32, b: 32, a: 1 }, label: "Lust" },
  { hex: "#800000", rgb: { r: 128, g: 0, b: 0, a: 1 }, label: "Maroon" },
  { hex: "#a45953", rgb: { r: 164, g: 89, b: 83, a: 1 }, label: "Redwood" },
  { hex: "#ff2400", rgb: { r: 255, g: 36, b: 0, a: 1 }, label: "Scarlet" },
  { hex: "#ff6347", rgb: { r: 255, g: 99, b: 71, a: 1 }, label: "Tomato" },
  { hex: "#d05340", rgb: { r: 208, g: 83, b: 64, a: 1 }, label: "Jasper" },
  { hex: "#bc8f8f", rgb: { r: 188, g: 143, b: 143, a: 1 }, label: "Rosy Brown" },
  { hex: "#905d5d", rgb: { r: 144, g: 93, b: 93, a: 1 }, label: "Rose Taupe" },
  { hex: "#e52b50", rgb: { r: 229, g: 43, b: 80, a: 1 }, label: "Amaranth" },
  { hex: "#ff2226", rgb: { r: 255, g: 34, b: 38, a: 1 }, label: "Fluorescent Red" },
];

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
  }
};

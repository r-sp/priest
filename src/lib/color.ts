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
  { hex: "#ff0024", rgb: { r: 255, g: 0, b: 66 }, label: "Red (Munsell)" },
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
  { hex: "#da2c43", rgb: { r: 218, g: 44, b: 67 }, label: "Rusty Red" },
  { hex: "#58111a", rgb: { r: 88, g: 17, b: 26 }, label: "Chocolate Cosmos" },
  { hex: "#65000b", rgb: { r: 101, g: 0, b: 11 }, label: "Rosewood" },
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
  { hex: "#fa8072", rgb: { r: 250, g: 128, b: 114 }, label: "Salmon" },
  { hex: "#f88379", rgb: { r: 248, g: 131, b: 121 }, label: "Coral Pink" },
  { hex: "#fdbcb4", rgb: { r: 253, g: 188, b: 180 }, label: "Cantaloupe Melon" },
  { hex: "#7c0902", rgb: { r: 124, g: 9, b: 2 }, label: "Barn Red" },
  { hex: "#660000", rgb: { r: 102, g: 0, b: 0 }, label: "Blood Red" },
  { hex: "#f4c2c2", rgb: { r: 244, g: 194, b: 194 }, label: "Tea Rose" },
  { hex: "#e44d2e", rgb: { r: 228, g: 77, b: 46 }, label: "Cinnabar" },
  { hex: "#8b0000", rgb: { r: 139, g: 0, b: 0 }, label: "Dark Red" },
  { hex: "#b22222", rgb: { r: 178, g: 34, b: 34 }, label: "Fire Brick" },
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
  { hex: "#c46210", rgb: { r: 196, g: 98, b: 16 }, label: "Alloy Orange" },
  { hex: "#bf5700", rgb: { r: 191, g: 87, b: 0 }, label: "Burnt Orange" },
  { hex: "#b56917", rgb: { r: 181, g: 105, b: 23 }, label: "Tiger's Eye" },
  { hex: "#964b00", rgb: { r: 150, g: 75, b: 0 }, label: "Brown" },
  { hex: "#f8c8b0", rgb: { r: 248, g: 200, b: 176 }, label: "Apricot Peach" },
];

const colorYellow: ColorShadeList = [
  { hex: "#ffff00", rgb: { r: 255, g: 255, b: 0 }, label: "Yellow" },
  { hex: "#ffd300", rgb: { r: 255, g: 211, b: 0 }, label: "Yellow (NCS)" },
  { hex: "#ffdb00", rgb: { r: 255, g: 219, b: 0 }, label: "Yellow (Munsell)" },
  { hex: "#fedf00", rgb: { r: 254, g: 223, b: 0 }, label: "Yellow (Pantone)" },
  { hex: "#ffffe0", rgb: { r: 255, g: 255, b: 224 }, label: "Light Yellow" },
  { hex: "#ffffcc", rgb: { r: 255, g: 255, b: 204 }, label: "Cream" },
  { hex: "#fffacd", rgb: { r: 255, g: 250, b: 205 }, label: "Lemon Chiffon" },
  { hex: "#fdff00", rgb: { r: 253, g: 255, b: 0 }, label: "Lemon (Crayola)" },
  { hex: "#f8de7e", rgb: { r: 248, g: 222, b: 126 }, label: "Mellow Yellow" },
  { hex: "#fada5e", rgb: { r: 250, g: 218, b: 94 }, label: "Royal Yellow" },
  { hex: "#ffd700", rgb: { r: 255, g: 215, b: 0 }, label: "Gold (Golden)" },
  { hex: "#ffd300", rgb: { r: 255, g: 211, b: 0 }, label: "Cyber Yellow" },
  { hex: "#eed202", rgb: { r: 238, g: 210, b: 2 }, label: "Safety Yellow" },
  { hex: "#eeea62", rgb: { r: 238, g: 234, b: 98 }, label: "Greenish Yellow" },
  { hex: "#dfff00", rgb: { r: 223, g: 255, b: 0 }, label: "Chartreuse Yellow" },
  { hex: "#d1e231", rgb: { r: 223, g: 255, b: 0 }, label: "Pear" },
  { hex: "#dadd98", rgb: { r: 218, g: 221, b: 152 }, label: "Green Earth" },
  { hex: "#ffe4b5", rgb: { r: 255, g: 228, b: 181 }, label: "Moccasin" },
];

const colorGreen: ColorShadeList = [
  { hex: "#00ff00", rgb: { r: 0, g: 255, b: 0 }, label: "Green" },
  { hex: "#00a550", rgb: { r: 0, g: 165, b: 80 }, label: "Green (CMYK)" },
  { hex: "#009f6b", rgb: { r: 0, g: 159, b: 107 }, label: "Green (NCS)" },
  { hex: "#00ffb5", rgb: { r: 0, g: 255, b: 181 }, label: "Green (Munsell)" },
  { hex: "#00ad83", rgb: { r: 0, g: 173, b: 131 }, label: "Green (Pantone)" },
  { hex: "#01a368", rgb: { r: 1, g: 163, b: 104 }, label: "Green (Crayola)" },
  { hex: "#006400", rgb: { r: 0, g: 100, b: 0 }, label: "Dark Green (X11)" },
  { hex: "#90ee90", rgb: { r: 144, g: 238, b: 144 }, label: "Light Green" },
  { hex: "#32dc32", rgb: { r: 50, g: 205, b: 50 }, label: "Lime Green" },
  { hex: "#66ff00", rgb: { r: 102, g: 255, b: 0 }, label: "Bright Green" },
  { hex: "#98fb98", rgb: { r: 152, g: 251, b: 152 }, label: "Pale Green" },
  { hex: "#00ff40", rgb: { r: 0, g: 255, b: 64 }, label: "Erin" },
  { hex: "#3fff00", rgb: { r: 63, g: 255, b: 0 }, label: "Harleyquin" },
  { hex: "#39ff14", rgb: { r: 57, g: 255, b: 20 }, label: "Neon Green" },
  { hex: "#8ab800", rgb: { r: 138, g: 184, b: 0 }, label: "Apple Green" },
  { hex: "#4b6f44", rgb: { r: 75, g: 111, b: 68 }, label: "Artichoke Green (Pantone)" },
  { hex: "#05472a", rgb: { r: 5, g: 71, b: 42 }, label: "Evergreen" },
  { hex: "#4f7942", rgb: { r: 79, g: 121, b: 66 }, label: "Fern Green" },
  { hex: "#63b76c", rgb: { r: 99, g: 183, b: 108 }, label: "Fern" },
  { hex: "#228b22", rgb: { r: 34, g: 139, b: 34 }, label: "Forest Green" },
  { hex: "#f0fff0", rgb: { r: 240, g: 255, b: 240 }, label: "Honeydew" },
  { hex: "#29ab87", rgb: { r: 41, g: 171, b: 135 }, label: "Jungle Green" },
  { hex: "#4cbb17", rgb: { r: 76, g: 187, b: 23 }, label: "Kelly Green" },
  { hex: "#354230", rgb: { r: 53, g: 66, b: 48 }, label: "Kombu Green" },
  { hex: "#a9ba9d", rgb: { r: 169, g: 186, b: 157 }, label: "Laurel Green" },
  { hex: "#74c365", rgb: { r: 116, g: 195, b: 101 }, label: "Mantis" },
  { hex: "#8a9a5b", rgb: { r: 138, g: 154, b: 91 }, label: "Moss Green" },
  { hex: "#98fb98", rgb: { r: 152, g: 251, b: 152 }, label: "Mint Green" },
  { hex: "#21421e", rgb: { r: 33, g: 66, b: 30 }, label: "Myrtle" },
  { hex: "#808000", rgb: { r: 128, g: 128, b: 0 }, label: "Olive" },
  { hex: "#01796f", rgb: { r: 1, g: 121, b: 111 }, label: "Pine Green" },
  { hex: "#6c7c59", rgb: { r: 108, g: 124, b: 89 }, label: "Reseda Chartreuse" },
  { hex: "#507d2a", rgb: { r: 80, g: 125, b: 42 }, label: "Sap Green" },
  { hex: "#d0f0c0", rgb: { r: 208, g: 240, b: 192 }, label: "Tea Green" },
  { hex: "#50c878", rgb: { r: 80, g: 200, b: 120 }, label: "Emerald" },
  { hex: "#dadd98", rgb: { r: 218, g: 221, b: 152 }, label: "Green Earth" },
  { hex: "#49796b", rgb: { r: 73, g: 121, b: 107 }, label: "Hooker's Green" },
  { hex: "#00a86b", rgb: { r: 0, g: 168, b: 107 }, label: "Jade" },
  { hex: "#0bda51", rgb: { r: 11, g: 216, b: 81 }, label: "Malachite" },
  { hex: "#2e8b57", rgb: { r: 46, g: 139, b: 87 }, label: "Sea Green" },
  { hex: "#ace1af", rgb: { r: 172, g: 255, b: 175 }, label: "Celadon" },
  { hex: "#355e3b", rgb: { r: 53, g: 94, b: 59 }, label: "Hunter Green" },
];

const colorCyan: ColorShadeList = [
  { hex: "#00ffff", rgb: { r: 0, g: 255, b: 255 }, label: "Cyan" },
  { hex: "#0d98ba", rgb: { r: 13, g: 152, b: 186 }, label: "Blue Green" },
  { hex: "#b2ffff", rgb: { r: 178, g: 255, b: 255 }, label: "Caleste" },
  { hex: "#008b8b", rgb: { r: 0, g: 139, b: 139 }, label: "Dark Cyan" },
  { hex: "#7df9ff", rgb: { r: 125, g: 249, b: 255 }, label: "Electric Blue" },
  { hex: "#3ab09e", rgb: { r: 58, g: 176, b: 158 }, label: "Keppel" },
  { hex: "#e0ffff", rgb: { r: 224, g: 255, b: 255 }, label: "Light Cyan" },
  { hex: "#20b2aa", rgb: { r: 32, g: 178, b: 170 }, label: "Light Sea Green" },
  { hex: "#004953", rgb: { r: 0, g: 73, b: 83 }, label: "Midnight Green" },
  { hex: "#3aa8c1", rgb: { r: 58, g: 168, b: 193 }, label: "Moonstone" },
  { hex: "#317873", rgb: { r: 49, g: 120, b: 115 }, label: "Myrtle Green" },
  { hex: "#004958", rgb: { r: 0, g: 73, b: 88 }, label: "Peacock Blue" },
  { hex: "#00cccc", rgb: { r: 0, g: 204, b: 204 }, label: "Robin Egg Blue" },
  { hex: "#007474", rgb: { r: 0, g: 116, b: 116 }, label: "Skobeloff" },
  { hex: "#80daeb", rgb: { r: 128, g: 218, b: 235 }, label: "Sky Blue (Crayola)" },
  { hex: "#008080", rgb: { r: 0, g: 128, b: 128 }, label: "Teal" },
  { hex: "#81d8d0", rgb: { r: 129, g: 216, b: 208 }, label: "Tiffany Blue" },
  { hex: "#40e0d0", rgb: { r: 64, g: 224, b: 208 }, label: "Turqoise" },
  { hex: "#43b3ae", rgb: { r: 67, g: 179, b: 174 }, label: "Verdigris" },
  { hex: "#39a78d", rgb: { r: 57, g: 167, b: 141 }, label: "Zomp" },
];

const colorBlue: ColorShadeList = [
  { hex: "#0000ff", rgb: { r: 0, g: 0, b: 255 }, label: "Blue" },
  { hex: "#333399", rgb: { r: 51, g: 51, b: 153 }, label: "Blue (CMYK)" },
  { hex: "#0018a8", rgb: { r: 0, g: 24, b: 168 }, label: "Blue (Pantone)" },
  { hex: "#0087bd", rgb: { r: 0, g: 135, b: 189 }, label: "Blue (NCS)" },
  { hex: "#00deff", rgb: { r: 0, g: 222, b: 255 }, label: "Blue (Munsell)" },
  { hex: "#ccccff", rgb: { r: 204, g: 204, b: 255 }, label: "Periwinkle" },
  { hex: "#4d4dff", rgb: { r: 77, g: 77, b: 255 }, label: "Neon Blue" },
  { hex: "#1c1cf0", rgb: { r: 28, g: 28, b: 240 }, label: "Bluebonnet" },
  { hex: "#bedbed", rgb: { r: 190, g: 219, b: 237 }, label: "Twin Bed" },
  { hex: "#0000cd", rgb: { r: 0, g: 0, b: 205 }, label: "Medium Blue" },
  { hex: "#545aa7", rgb: { r: 84, g: 90, b: 167 }, label: "Liberty" },
  { hex: "#120a8f", rgb: { r: 18, g: 10, b: 143 }, label: "Ultramarine" },
  { hex: "#00008b", rgb: { r: 0, g: 0, b: 139 }, label: "Dark Blue" },
  { hex: "#2e2787", rgb: { r: 46, g: 39, b: 135 }, label: "Picotee Blue" },
  { hex: "#000080", rgb: { r: 0, g: 0, b: 128 }, label: "Navy Blue" },
  { hex: "#191970", rgb: { r: 25, g: 25, b: 112 }, label: "Midnight Blue" },
  { hex: "#1e2952", rgb: { r: 30, g: 41, b: 82 }, label: "Space Cadet" },
  { hex: "#89cff0", rgb: { r: 137, g: 207, b: 240 }, label: "Baby Blue" },
  { hex: "#add8e6", rgb: { r: 173, g: 216, b: 230 }, label: "Light Blue" },
  { hex: "#b0e0e6", rgb: { r: 176, g: 224, b: 230 }, label: "Powder Blue" },
  { hex: "#afdbf5", rgb: { r: 175, g: 219, b: 245 }, label: "Uranian Blue" },
  { hex: "#76abdf", rgb: { r: 118, g: 171, b: 223 }, label: "Ruddy Blue" },
  { hex: "#246bce", rgb: { r: 36, g: 107, b: 206 }, label: "Celtic Blue" },
  { hex: "#1f305e", rgb: { r: 31, g: 48, b: 94 }, label: "Delft Blue" },
  { hex: "#007791", rgb: { r: 0, g: 119, b: 145 }, label: "Duck Blue" },
  { hex: "#082567", rgb: { r: 8, g: 37, b: 103 }, label: "Sapphire" },
  { hex: "#15f4ee", rgb: { r: 21, g: 244, b: 238 }, label: "Fluorescent Blue" },
  { hex: "#367588", rgb: { r: 54, g: 117, b: 136 }, label: "Teal Blue" },
  { hex: "#9bbcd9", rgb: { r: 155, g: 188, b: 216 }, label: "Cloudy Blue" },
  { hex: "#87cefa", rgb: { r: 135, g: 206, b: 250 }, label: "Light Sky Blue" },
  { hex: "#87ceeb", rgb: { r: 135, g: 206, b: 235 }, label: "Sky Blue" },
  { hex: "#00bfff", rgb: { r: 0, g: 191, b: 255 }, label: "Deep Sky Blue" },
  { hex: "#007ba7", rgb: { r: 0, g: 123, b: 167 }, label: "Cerulean" },
  { hex: "#73c2fb", rgb: { r: 115, g: 194, b: 251 }, label: "Maya Blue" },
  { hex: "#8ab9f1", rgb: { r: 138, g: 185, b: 241 }, label: "Jordy Blue" },
  { hex: "#45b1e8", rgb: { r: 69, g: 177, b: 232 }, label: "Picton Blue" },
  { hex: "#6495ed", rgb: { r: 100, g: 149, b: 237 }, label: "Cornflower Blue" },
  { hex: "#1e90ff", rgb: { r: 30, g: 144, b: 255 }, label: "Dodger Blue" },
  { hex: "#4169e1", rgb: { r: 65, g: 105, b: 255 }, label: "Royal Blue" },
];

const colorViolet: ColorShadeList = [
  { hex: "#8000ff", rgb: { r: 128, g: 0, b: 255 }, label: "Violet" },
  { hex: "#8f00ff", rgb: { r: 143, g: 0, b: 255 }, label: "Electric Violet" },
  { hex: "#9400d3", rgb: { r: 148, g: 0, b: 211 }, label: "Dark Violet" },
  { hex: "#645394", rgb: { r: 100, g: 83, b: 148 }, label: "Ultra Violet" },
  { hex: "#6f2da8", rgb: { r: 111, g: 45, b: 168 }, label: "Grape" },
  { hex: "#b57edc", rgb: { r: 181, g: 126, b: 220 }, label: "Lavender" },
  { hex: "#e0b0ff", rgb: { r: 224, g: 176, b: 255 }, label: "Mauve (Mallow)" },
  { hex: "#c9a0dc", rgb: { r: 201, g: 160, b: 220 }, label: "Wisteria" },
];

const colorPurple: ColorShadeList = [
  { hex: "#800080", rgb: { r: 128, g: 0, b: 128 }, label: "Purple" },
  { hex: "#a020f0", rgb: { r: 160, g: 32, b: 240 }, label: "Purple (X11)" },
  { hex: "#cc00ff", rgb: { r: 102, g: 33, b: 99 }, label: "Purple (Munsell)" },
  { hex: "#bf00ff", rgb: { r: 191, g: 0, b: 255 }, label: "Electric Purple" },
  { hex: "#663399", rgb: { r: 102, g: 33, b: 99 }, label: "Rebecca Purple" },
  { hex: "#7851a9", rgb: { r: 120, g: 81, b: 169 }, label: "Royal Purple" },
  { hex: "#c71585", rgb: { r: 199, g: 21, b: 133 }, label: "Red Violet" },
  { hex: "#66023c", rgb: { r: 102, g: 2, b: 60 }, label: "Tyrian Purple" },
  { hex: "#9370db", rgb: { r: 147, g: 112, b: 219 }, label: "Medium Purple" },
  { hex: "#b57edc", rgb: { r: 181, g: 126, b: 220 }, label: "Lavender" },
  { hex: "#e0b0ff", rgb: { r: 224, g: 176, b: 255 }, label: "Mauve (Mallow)" },
  { hex: "#d8bfd8", rgb: { r: 216, g: 191, b: 216 }, label: "Thistle" },
  { hex: "#da70d6", rgb: { r: 218, g: 112, b: 214 }, label: "Orchid" },
  { hex: "#df73ff", rgb: { r: 223, g: 115, b: 255 }, label: "Heliotrope" },
  { hex: "#df00ff", rgb: { r: 223, g: 0, b: 255 }, label: "Psychedelic Purple (Phlox)" },
  { hex: "#fe4eda", rgb: { r: 254, g: 78, b: 218 }, label: "Purple Pizzazz" },
  { hex: "#de6fa1", rgb: { r: 222, g: 111, b: 161 }, label: "Liseran Purple" },
  { hex: "#c54b8c", rgb: { r: 197, g: 75, b: 140 }, label: "Mulberry" },
  { hex: "#b768a2", rgb: { r: 183, g: 104, b: 162 }, label: "Pearly Purple" },
  { hex: "#9a4eae", rgb: { r: 154, g: 78, b: 174 }, label: "Purpureus" },
  { hex: "#702963", rgb: { r: 112, g: 41, b: 99 }, label: "Byzantium" },
  { hex: "#78184a", rgb: { r: 120, g: 24, b: 74 }, label: "Pansy Purple" },
  { hex: "#72246c", rgb: { r: 48, g: 25, b: 152 }, label: "Dark Purple" },
];

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

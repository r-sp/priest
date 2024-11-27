import { type Metadata } from "next";
import { type ColorShadeList } from "~/lib/types";

import ColorShade from "~/components/ui/color-shade";

export const metadata: Metadata = {
  title: "Color Red",
  description: "The Holy Colors",
};

export default function ColorRedPage() {
  const red: ColorShadeList = [
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
    { hex: "#ff2226", rgb: { r: 255, g: 34, b: 38, a: 1 }, label: "Amaranth" },
  ];

  return (
    <div className="grid gap-4" role="none">
      <h1 className="text-3xl font-semibold text-holy-100">Color Red</h1>
      <ColorShade color={red} />
    </div>
  );
}

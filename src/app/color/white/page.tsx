import { type Metadata } from "next";
import { type ColorShadeList } from "~/lib/types";

import ColorShade from "~/components/ui/color-shade";

export const metadata: Metadata = {
  title: "Color White",
  description: "The Holy Colors",
};

export default function ColorWhitePage() {
  const white: ColorShadeList = [
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

  return (
    <div className="grid gap-4" role="none">
      <h1 className="text-3xl font-semibold text-holy-100">Color Gray</h1>
      <ColorShade color={white} />
    </div>
  );
}

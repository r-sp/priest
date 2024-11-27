import { type Metadata } from "next";
import { type ColorShadeList } from "~/lib/types";

import ColorShade from "~/components/ui/color-shade";

export const metadata: Metadata = {
  title: "Color Gray",
  description: "The Holy Colors",
};

export default function ColorGrayPage() {
  const gray: ColorShadeList = [
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

  return (
    <div className="grid gap-4" role="none">
      <h1 className="text-3xl font-semibold text-holy-100">Color Gray</h1>
      <ColorShade color={gray} />
    </div>
  );
}

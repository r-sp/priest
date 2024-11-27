import { type Metadata } from "next";
import { type ColorShadeList } from "~/lib/types";

import ColorShade from "~/components/ui/color-shade";

export const metadata: Metadata = {
  title: "Color Black",
  description: "The Holy Colors",
};

export default function ColorBlackPage() {
  const black: ColorShadeList = [
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

  return (
    <div className="grid gap-4" role="none">
      <h1 className="text-3xl font-semibold text-holy-100">Color Black</h1>
      <ColorShade color={black} />
    </div>
  );
}

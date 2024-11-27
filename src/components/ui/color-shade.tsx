"use client";

import { type ColorShadeList } from "~/lib/color";
import { stringifyRgb } from "~/lib/utils";
import ColorCard from "./color-card";
import Link from "next/link";

export default function ColorShade({ color }: { color: ColorShadeList }) {
  const list: ColorShadeList = [
    { hex: "#000000", rgb: { r: 0, g: 0, b: 0, a: 1 }, label: "Black" },
    { hex: "#808080", rgb: { r: 128, g: 128, b: 128, a: 1 }, label: "Gray" },
    { hex: "#ffffff", rgb: { r: 255, g: 255, b: 255, a: 1 }, label: "White" },
    { hex: "#ff0000", rgb: { r: 255, g: 0, b: 0, a: 1 }, label: "Red" },
  ];

  return (
    <div className="grid gap-12" role="none">
      <div className="grid gap-4 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4" role="none">
        {color.map((c, i) => (
          <ColorCard color={c} key={i} options={{ copyColor: false, colorName: true, colorLabel: true }} />
        ))}
      </div>
      <div className="grid gap-4" role="none">
        <h2 className="text-xl font-semibold text-holy-100">Collections</h2>
        <div className="grid gap-4 sm:grid-cols-4" role="none">
          {list.map((c, i) => (
            <Link
              aria-label={c.hex}
              className="flex flex-col gap-2 rounded-lg"
              href={`/color/${c.label?.toLowerCase()}`}
              key={i}
            >
              <span
                className="inline-flex h-36 rounded-lg md:h-48 lg:h-60 xl:h-80 max-sm:h-48"
                style={{ backgroundColor: stringifyRgb(c.rgb) }}
              ></span>
              <p className="inline-flex text-base text-holy-100">{c.label}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

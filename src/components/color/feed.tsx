"use client";

import { useColorProvider } from "./provider";
import { stringifyRgb } from "~/lib/utils";
import Link from "next/link";

export default function ColorFeed() {
  const { hsl, convert, hex, rgb } = useColorProvider();

  const hue = (deg: number) => {
    const angle = Math.round(deg + hsl.h);

    return ((angle % 360) + 360) % 360;
  };

  const related = [
    hue(15),
    hue(30),
    hue(45),
    hue(60),
    hue(75),
    hue(90),
    hue(105),
    hue(120),
    hue(135),
    hue(150),
    hue(165),
    hue(180),
    hue(195),
    hue(210),
    hue(225),
    hue(240),
    hue(255),
    hue(270),
    hue(285),
    hue(300),
    hue(315),
    hue(330),
    hue(345),
    hue(360),
  ];

  const color = related.map((c) => {
    const newColor = convert({ ...hsl, h: c });

    return { hex: newColor.toHex(), rgb: newColor.toRgb() };
  });

  return (
    <div className="grid gap-4 px-2 py-4 xl:mx-auto xl:max-w-screen-xl" role="none">
      <Link href={`/color/${hex.replace("#", "")}`} className="flex flex-col gap-2 rounded-lg" title={hex}>
        <span
          role="presentation"
          className="inline-flex h-36 rounded-lg md:h-48 lg:h-60 xl:h-80 max-sm:h-48"
          style={{ backgroundColor: stringifyRgb(rgb) }}
        ></span>
      </Link>

      <ul aria-label={`related color of ${hex}`} className="grid gap-4 sm:grid-cols-4">
        {color.map((c, i) => (
          <li key={i} aria-label={c.hex} className="inline-grid">
            <Link href={`/color/${c.hex.replace("#", "")}`} className="flex rounded-lg" title={c.hex}>
              <span
                role="presentation"
                className="inline-flex h-36 w-full rounded-lg md:h-48 lg:h-60 xl:h-80 max-sm:h-48"
                style={{ backgroundColor: stringifyRgb(c.rgb) }}
              ></span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

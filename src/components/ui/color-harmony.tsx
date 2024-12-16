"use client";

import { useColorStore } from "../color/provider";
import { formatOklch, parseColor } from "~/lib/color";
import { limiter, multiplier } from "~/lib/utils";
import { ColorInput } from "../color";
import Link from "next/link";

export default function ColorHarmony() {
  const { oklch } = useColorStore((state) => state);
  const base = oklch.color.h || 0;
  const parse = parseColor();

  const hueShift = (angle: number[]) =>
    angle.map((deg) => {
      const _oklch = { ...oklch.color, h: deg };
      return {
        css: formatOklch(_oklch),
        hex: parse.hex({ mode: "oklch", ..._oklch }),
      };
    });

  const harmony = hueShift(
    multiplier(15, 0, 360).map((deg) => limiter(base + deg, 0, 360)),
  );

  return (
    <div className="grid gap-8">
      <div className="mx-auto w-full max-w-3xl max-md:px-3">
        <ColorInput.Oklch />
      </div>
      <div className="mx-auto grid w-full max-w-7xl gap-x-3 gap-y-4 max-xl:px-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {harmony.map((color, index) => (
          <Link
            href={`/color/${color.hex.replace("#", "")}`}
            className="grid gap-2 rounded-lg"
            key={index}
          >
            <div className="frame rounded-lg">
              <span style={{ backgroundColor: color.css }}></span>
            </div>
            <code>{color.hex}</code>
          </Link>
        ))}
      </div>
    </div>
  );
}

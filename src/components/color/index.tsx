"use client";

import { useState } from "react";
import { useColor } from "~/lib/color";
import { type ColorProps } from "./types";
import Toolkit from "./toolkit";
import Picker from "./picker";

export default function Color({ raw }: ColorProps) {
  const [rawColor, setRawColor] = useState<typeof raw>(raw);
  const color = useColor(rawColor);

  return (
    <section className="grid gap-8 px-4 xl:mx-auto xl:max-w-screen-xl" aria-labelledby="site-name">
      <div className="flex h-64 w-full rounded-lg" style={{ backgroundColor: color.toRgbString() }}></div>
      <Toolkit color={{ hex: color.toHex(), rgb: color.toRgbString(), raw: color.toHsl() }} action={setRawColor} />
      <Picker raw={color.toHsv()} action={setRawColor} />
    </section>
  );
}

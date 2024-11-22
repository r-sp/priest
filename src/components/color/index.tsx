"use client";

import ColorPicker from "./picker";
import ColorHex from "./space/hex";
import ColorHsl from "./space/hsl";
import ColorRgb from "./space/rgb";

export default function Color() {
  return (
    <section className="grid gap-8 px-4 xl:mx-auto xl:max-w-screen-xl" aria-labelledby="site-name">
      <ColorPicker />
      <ColorHex />
      <ColorHsl />
      <ColorRgb />
    </section>
  );
}

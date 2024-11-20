"use client";

import dynamic from "next/dynamic";

// import ColorPicker from "./picker";
// import ColorHex from "./space/hex";
// import ColorHsl from "./space/hsl";
// import ColorRgb from "./space/rgb";

export default function Color() {
  const ColorPicker = dynamic(() => import("./picker"), { ssr: false });
  const ColorHex = dynamic(() => import("./space/hex"), { ssr: false });
  const ColorHsl = dynamic(() => import("./space/hsl"), { ssr: false });
  const ColorRgb = dynamic(() => import("./space/rgb"), { ssr: false });

  return (
    <section className="grid gap-8 px-4 xl:mx-auto xl:max-w-screen-xl" aria-labelledby="site-name">
      <ColorPicker />
      <ColorHex />
      <ColorHsl />
      <ColorRgb />
    </section>
  );
}

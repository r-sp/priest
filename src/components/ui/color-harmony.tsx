"use client";

import { useColorProvider } from "../provider";
import ColorCard from "./color-card";

export default function ColorHarmony() {
  const { hex, rgb } = useColorProvider();

  return (
    <div className="grid gap-4 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      <ColorCard color={{ hex, rgb }} />
      <ColorCard color={{ hex, rgb }} />
      <ColorCard color={{ hex, rgb }} />
      <ColorCard color={{ hex, rgb }} />
      <ColorCard color={{ hex, rgb }} />
      <ColorCard color={{ hex, rgb }} />
      <ColorCard color={{ hex, rgb }} />
      <ColorCard color={{ hex, rgb }} />
      <ColorCard color={{ hex, rgb }} />
      <ColorCard color={{ hex, rgb }} />
      <ColorCard color={{ hex, rgb }} />
      <ColorCard color={{ hex, rgb }} />
      <ColorCard color={{ hex, rgb }} />
      <ColorCard color={{ hex, rgb }} />
      <ColorCard color={{ hex, rgb }} />
      <ColorCard color={{ hex, rgb }} />
      <ColorCard color={{ hex, rgb }} />
      <ColorCard color={{ hex, rgb }} />
      <ColorCard color={{ hex, rgb }} />
      <ColorCard color={{ hex, rgb }} />
    </div>
  );
}

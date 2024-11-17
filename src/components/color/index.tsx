"use client";

import { useState, useDeferredValue } from "react";
import { useColor } from "~/lib/color";
import type { AnyColor } from "~/lib/types";
import Toolkit from "./toolkit";

export default function Color(props: { raw: AnyColor }) {
  const [rawColor, setRawColor] = useState<AnyColor>(props.raw);

  const deferredColor = useDeferredValue(rawColor);
  const color = useColor(deferredColor);

  return (
    <section className="color">
      <div
        style={{
          backgroundColor: color.toRgbString(),
          borderRadius: "0.5rem",
          height: "20rem",
          width: "100%",
          marginBottom: "2rem",
        }}
      ></div>
      <Toolkit color={{ hex: color.toHex(), rgb: color.toRgbString(), raw: color.toHsl() }} action={setRawColor} />
    </section>
  );
}

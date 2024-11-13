"use client";

import { useState, useDeferredValue } from "react";
import { type HsvaColor, colord } from "colord";
import clsx from "clsx";
import chroma from "chroma-js";
import ColorPicker from "./color-picker";
import ColorInfo from "./color-info";
import ColorHarmony from "./color-harmony";

export default function Color(props: { hsv: { h: number; s: number; v: number; a: number } }) {
  const [hsv, setHsv] = useState<HsvaColor>(props.hsv);
  const deferredColor = useDeferredValue(hsv);

  const colorHSV = colord(deferredColor);
  const colorHEX = colorHSV.toHex();
  const colorRGB = colorHSV.toRgbString();
  const colorHSL = chroma(colorHEX).css("hsl");

  return (
    <section className="color" aria-label={clsx("color", colorHEX)}>
      <ColorPicker rgb={colorRGB} hsva={deferredColor} action={setHsv} />
      <ColorInfo hex={colorHEX} hsl={colorHSL} action={setHsv} />
      <ColorHarmony hex={colorHEX} />
    </section>
  );
}

"use client";

import { useState, useDeferredValue } from "react";
import { useColor } from "~/lib/color";
import { type CustomColor } from "~/lib/types";
import ColorPicker from "./color-picker";
import ColorDetails from "./color-details";
import ColorOptions from "./color-options";
import ColorHarmony from "./color-harmony";

export default function Color(props: { raw: CustomColor }) {
  const [color, setColor] = useState<CustomColor>(props.raw);
  const deferredColor = useDeferredValue(color);

  const raw = useColor(deferredColor);
  const colorHEX = raw.toHex();
  const colorRGB = raw.toRgbString();
  const colorHSL = raw.toHslString();

  return (
    <section className="color">
      <ColorPicker color={{ rgb: colorRGB, raw: deferredColor }} action={setColor} />
      <ColorDetails color={{ hex: colorHEX, hsl: colorHSL }} action={setColor}>
        <ColorOptions color={{ hex: colorHEX }} action={setColor} />
      </ColorDetails>
      <ColorHarmony raw={colorHEX} />
    </section>
  );
}

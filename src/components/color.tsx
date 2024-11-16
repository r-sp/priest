"use client";

import { useState, useDeferredValue } from "react";
import { useColor } from "~/lib/color";
import type { AnyColor } from "~/lib/types";
import ColorPicker from "./color-picker";
import ColorDetails from "./color-details";
import ColorOptions from "./color-options";
import ColorHarmony from "./color-harmony";

export default function Color(props: { raw: AnyColor }) {
  const [rawColor, setRawColor] = useState<AnyColor>(props.raw);

  const deferredColor = useDeferredValue(rawColor);
  const color = useColor(deferredColor);

  return (
    <section className="color">
      <ColorPicker color={{ rgb: color.toRgbString(), raw: color.toHsv() }} action={setRawColor} />
      <ColorDetails color={{ hex: color.toHex(), hsl: color.toHslString() }} action={setRawColor}>
        <ColorOptions color={{ hex: color.toHex(), rgb: color.toRgbString(), raw: color.toHsl() }} action={setRawColor} />
      </ColorDetails>
      <ColorHarmony raw={deferredColor} />
    </section>
  );
}

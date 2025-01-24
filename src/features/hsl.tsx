"use client";

import type { HslColor, HslColorMode } from "~/lib/color";
import { useMemo, useCallback, Fragment } from "react";
import { createTracks } from "~/lib/tracks";
import { Slider } from "~/components";

export default function InputHsl({
  color,
  action,
  dynamicPreview = true,
  prefix = "hsl",
}: {
  color: HslColor;
  action: (color: HslColorMode) => void;
  dynamicPreview?: boolean;
  prefix?: string;
}) {
  const updateColor = useCallback(
    (newColor: Partial<HslColor>) =>
      action({ mode: "hsl", ...color, ...newColor }),
    [color, action],
  );

  const previewColor = useMemo(
    () => createTracks({ mode: "hsl", ...color }, dynamicPreview),
    [color, dynamicPreview],
  );

  const [hue, saturation, lightness] = previewColor;

  return (
    <Fragment>
      <Slider
        prefix={prefix}
        label="hue"
        gradient={hue}
        stepMin={1}
        stepMax={0.01}
        min={0}
        max={360}
        value={color.h}
        onChange={(e) => updateColor({ h: e.target.valueAsNumber })}
      />
      <Slider
        prefix={prefix}
        label="saturation"
        gradient={saturation}
        stepMin={1}
        stepMax={0.01}
        min={0}
        max={100}
        value={color.s}
        onChange={(e) => updateColor({ s: e.target.valueAsNumber })}
      />
      <Slider
        prefix={prefix}
        label="lightness"
        gradient={lightness}
        stepMin={1}
        stepMax={0.01}
        min={0}
        max={100}
        value={color.l}
        onChange={(e) => updateColor({ l: e.target.valueAsNumber })}
      />
    </Fragment>
  );
}

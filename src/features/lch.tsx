"use client";

import type { LchColor, LchColorMode } from "~/lib/color";
import { useMemo, useCallback, Fragment } from "react";
import { createTracks } from "~/lib/tracks";
import { Slider } from "~/components";

export default function InputLch({
  color,
  action,
  dynamicPreview = true,
  prefix = "lch",
}: {
  color: LchColor;
  action: (color: LchColorMode) => void;
  dynamicPreview?: boolean;
  prefix?: string;
}) {
  const updateColor = useCallback(
    (newColor: Partial<LchColor>) =>
      action({ mode: "lch", ...color, ...newColor }),
    [color, action],
  );

  const previewColor = useMemo(
    () => createTracks({ mode: "lch", ...color }, dynamicPreview),
    [color, dynamicPreview],
  );

  const [lightness, chroma, hue] = previewColor;

  return (
    <Fragment>
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
      <Slider
        prefix={prefix}
        label="chroma"
        gradient={chroma}
        stepMin={1}
        stepMax={0.01}
        min={0}
        max={150}
        value={color.c}
        onChange={(e) => updateColor({ c: e.target.valueAsNumber })}
      />
      <Slider
        prefix={prefix}
        label="hue"
        gradient={hue}
        stepMin={1}
        stepMax={0.001}
        min={0}
        max={360}
        value={color.h}
        onChange={(e) => updateColor({ h: e.target.valueAsNumber })}
      />
    </Fragment>
  );
}

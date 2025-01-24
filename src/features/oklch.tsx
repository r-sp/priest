"use client";

import type { OklchColor, OklchColorMode } from "~/lib/color";
import { useMemo, useCallback, Fragment } from "react";
import { createTracks } from "~/lib/tracks";
import { Slider } from "~/components";

export default function InputOklch({
  color,
  action,
  dynamicPreview = true,
  prefix = "oklch",
}: {
  color: OklchColor;
  action: (color: OklchColorMode) => void;
  dynamicPreview?: boolean;
  prefix?: string;
}) {
  const updateColor = useCallback(
    (newColor: Partial<OklchColor>) =>
      action({ mode: "oklch", ...color, ...newColor }),
    [color, action],
  );

  const previewColor = useMemo(
    () => createTracks({ mode: "oklch", ...color }, dynamicPreview),
    [color, dynamicPreview],
  );

  const [lightness, chroma, hue] = previewColor;

  return (
    <Fragment>
      <Slider
        prefix={prefix}
        label="lightness"
        gradient={lightness}
        stepMin={0.01}
        stepMax={0.001}
        min={0}
        max={1}
        value={color.l}
        onChange={(e) => updateColor({ l: e.target.valueAsNumber })}
      />
      <Slider
        prefix={prefix}
        label="chroma"
        gradient={chroma}
        stepMin={0.01}
        stepMax={0.001}
        min={0}
        max={0.4}
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

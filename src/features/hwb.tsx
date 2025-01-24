"use client";

import type { HwbColor, HwbColorMode } from "~/lib/color";
import { useMemo, useCallback, Fragment } from "react";
import { createTracks } from "~/lib/tracks";
import { Slider } from "~/components";

export default function InputHwb({
  color,
  action,
  dynamicPreview = true,
  prefix = "hwb",
}: {
  color: HwbColor;
  action: (color: HwbColorMode) => void;
  dynamicPreview?: boolean;
  prefix?: string;
}) {
  const updateColor = useCallback(
    (newColor: Partial<HwbColor>) =>
      action({ mode: "hwb", ...color, ...newColor }),
    [color, action],
  );

  const previewColor = useMemo(
    () => createTracks({ mode: "hwb", ...color }, dynamicPreview),
    [color, dynamicPreview],
  );

  const [hue, whiteness, blackness] = previewColor;

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
        label="whiteness"
        gradient={whiteness}
        stepMin={1}
        stepMax={0.01}
        min={0}
        max={100}
        value={color.w}
        onChange={(e) => updateColor({ w: e.target.valueAsNumber })}
      />
      <Slider
        prefix={prefix}
        label="blackness"
        gradient={blackness}
        stepMin={1}
        stepMax={0.01}
        min={0}
        max={100}
        value={color.b}
        onChange={(e) => updateColor({ b: e.target.valueAsNumber })}
      />
    </Fragment>
  );
}

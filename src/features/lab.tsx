"use client";

import type { LabColor, LabColorMode } from "~/lib/color";
import { useMemo, useCallback, Fragment } from "react";
import { createTracks } from "~/lib/tracks";
import { Slider } from "~/components";

export default function InputLab({
  color,
  action,
  dynamicPreview = true,
  prefix = "lab",
}: {
  color: LabColor;
  action: (color: LabColorMode) => void;
  dynamicPreview?: boolean;
  prefix?: string;
}) {
  const updateColor = useCallback(
    (newColor: Partial<LabColor>) =>
      action({ mode: "lab", ...color, ...newColor }),
    [color, action],
  );

  const previewColor = useMemo(
    () => createTracks({ mode: "lab", ...color }, dynamicPreview),
    [color, dynamicPreview],
  );

  const [lightness, greenRed, blueYellow] = previewColor;

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
        label="green-red"
        gradient={greenRed}
        stepMin={1}
        stepMax={0.01}
        min={-100}
        max={100}
        value={color.a}
        onChange={(e) => updateColor({ a: e.target.valueAsNumber })}
      />
      <Slider
        prefix={prefix}
        label="blue-yellow"
        gradient={blueYellow}
        stepMin={1}
        stepMax={0.01}
        min={-100}
        max={100}
        value={color.b}
        onChange={(e) => updateColor({ b: e.target.valueAsNumber })}
      />
    </Fragment>
  );
}

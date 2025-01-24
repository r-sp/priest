"use client";

import type { OklabColor, OklabColorMode } from "~/lib/color";
import { useMemo, useCallback, Fragment } from "react";
import { createTracks } from "~/lib/tracks";
import { Slider } from "~/components";

export default function InputOklab({
  color,
  action,
  dynamicPreview = true,
  prefix = "oklab",
}: {
  color: OklabColor;
  action: (color: OklabColorMode) => void;
  dynamicPreview?: boolean;
  prefix?: string;
}) {
  const updateColor = useCallback(
    (newColor: Partial<OklabColor>) =>
      action({ mode: "oklab", ...color, ...newColor }),
    [color, action],
  );

  const previewColor = useMemo(
    () => createTracks({ mode: "oklab", ...color }, dynamicPreview),
    [color, dynamicPreview],
  );

  const [lightness, greenRed, blueYellow] = previewColor;

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
        label="green-red"
        gradient={greenRed}
        stepMin={0.01}
        stepMax={0.001}
        min={-0.4}
        max={0.4}
        value={color.a}
        onChange={(e) => updateColor({ a: e.target.valueAsNumber })}
      />
      <Slider
        prefix={prefix}
        label="blue-yellow"
        gradient={blueYellow}
        stepMin={0.01}
        stepMax={0.001}
        min={-0.4}
        max={0.4}
        value={color.b}
        onChange={(e) => updateColor({ b: e.target.valueAsNumber })}
      />
    </Fragment>
  );
}

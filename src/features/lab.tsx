"use client";

import type { LabColor, LabColorMode } from "~/lib/types";
import { useCallback, Fragment } from "react";
import { formatLab } from "~/lib";
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

  const previewColor = useCallback(
    (newColor: Partial<LabColor>) => {
      return formatLab({ ...color, ...newColor });
    },
    [color],
  );

  const trackLightnessLeft = previewColor({ l: 0 });
  const trackLightnessRight = previewColor({ l: 100 });
  const trackGreenRedLeft = previewColor(
    dynamicPreview ? { a: -100 } : { a: -100, b: 50 },
  );
  const trackGreenRedRight = previewColor(
    dynamicPreview ? { a: 100 } : { a: 100, b: 50 },
  );
  const trackBlueYellowLeft = previewColor(
    dynamicPreview ? { b: -100 } : { a: 0, b: -100 },
  );
  const trackBlueYellowRight = previewColor(
    dynamicPreview ? { b: 100 } : { a: 0, b: 100 },
  );

  return (
    <Fragment>
      <Slider
        prefix={prefix}
        label="lightness"
        gradient={`${trackLightnessLeft}, ${trackLightnessRight}`}
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
        gradient={`${trackGreenRedLeft}, ${trackGreenRedRight}`}
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
        gradient={`${trackBlueYellowLeft}, ${trackBlueYellowRight}`}
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

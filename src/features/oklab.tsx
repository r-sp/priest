"use client";

import type { OklabColor, OklabColorMode } from "~/lib/types";
import { useCallback, Fragment } from "react";
import { formatOklab } from "~/lib";
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

  const previewColor = useCallback(
    (newColor: Partial<OklabColor>) => {
      return formatOklab({ ...color, ...newColor });
    },
    [color],
  );

  const trackLightnessLeft = previewColor({ l: 0 });
  const trackLightnessRight = previewColor({ l: 1 });
  const trackGreenRedLeft = previewColor(
    dynamicPreview ? { a: -0.4 } : { a: -0.4, b: 0.4 },
  );
  const trackGreenRedRight = previewColor(
    dynamicPreview ? { a: 0.4 } : { a: 0.4, b: 0.4 },
  );
  const trackBlueYellowLeft = previewColor(
    dynamicPreview ? { b: -0.4 } : { a: 0, b: -0.4 },
  );
  const trackBlueYellowRight = previewColor(
    dynamicPreview ? { b: 0.4 } : { a: 0, b: 0.4 },
  );

  return (
    <Fragment>
      <Slider
        prefix={prefix}
        label="lightness"
        gradient={`${trackLightnessLeft}, ${trackLightnessRight}`}
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
        gradient={`${trackGreenRedLeft}, ${trackGreenRedRight}`}
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
        gradient={`${trackBlueYellowLeft}, ${trackBlueYellowRight}`}
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

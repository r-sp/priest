"use client";

import type { OklabColor, OklabColorMode } from "~/lib/types";
import { useCallback, Fragment } from "react";
import { useColorStore } from "~/hooks";
import { formatOklab } from "~/lib/format";
import { Slider } from "~/components";

export default function InputOklab({
  onChange,
  dynamicPreview = true,
  lightness = true,
  greenRed = true,
  blueYellow = true,
  prefix = "oklab",
}: {
  onChange?: (color: OklabColorMode) => void;
  dynamicPreview?: boolean;
  lightness?: boolean;
  greenRed?: boolean;
  blueYellow?: boolean;
  prefix?: string;
}) {
  const { color } = useColorStore((state) => state.oklab);

  const updateColor = useCallback(
    (newColor: Partial<OklabColor>) => {
      if (onChange) {
        onChange({ mode: "oklab", ...color, ...newColor });
      }
    },
    [color, onChange],
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
      {lightness && (
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
      )}
      {greenRed && (
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
      )}
      {blueYellow && (
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
      )}
    </Fragment>
  );
}

"use client";

import type { LabColor, LabColorMode } from "~/lib/types";
import { useCallback, Fragment } from "react";
import { useColorStore } from "~/hooks";
import { formatLab } from "~/lib/format";
import { Slider } from "~/components";

export default function InputLab({
  onChange,
  dynamicPreview = true,
  lightness = true,
  greenRed = true,
  blueYellow = true,
  prefix = "lab",
}: {
  onChange?: (color: LabColorMode) => void;
  dynamicPreview?: boolean;
  lightness?: boolean;
  greenRed?: boolean;
  blueYellow?: boolean;
  prefix?: string;
}) {
  const { color } = useColorStore((state) => state.lab);

  const updateColor = useCallback(
    (newColor: Partial<LabColor>) => {
      if (onChange) {
        onChange({ mode: "lab", ...color, ...newColor });
      }
    },
    [color, onChange],
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
      {lightness && (
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
      )}
      {greenRed && (
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
      )}
      {blueYellow && (
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
      )}
    </Fragment>
  );
}

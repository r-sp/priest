"use client";

import type { RgbColor, RgbColorMode } from "~/lib/types";
import { useCallback, Fragment } from "react";
import { useColorStore } from "~/hooks";
import { formatRgb } from "~/lib";
import { Slider } from "~/components";

export default function InputRgb({
  onChange,
  dynamicPreview = true,
  prefix = "rgb",
}: {
  onChange?: (color: RgbColorMode) => void;
  dynamicPreview?: boolean;
  prefix?: string;
}) {
  const { color } = useColorStore((state) => state.rgb);

  const updateColor = useCallback(
    (newColor: Partial<RgbColor>) => {
      if (onChange) {
        onChange({ mode: "rgb", ...color, ...newColor });
      }
    },
    [color, onChange],
  );

  const previewColor = useCallback(
    (newColor: Partial<RgbColor>) => {
      return formatRgb({ ...color, ...newColor });
    },
    [color],
  );

  const trackRedLeft = previewColor({ r: 0 });
  const trackRedRight = previewColor(
    dynamicPreview ? { r: 1 } : { r: 1, g: 0, b: 0 },
  );
  const trackGreenLeft = previewColor({ g: 0 });
  const trackGreenRight = previewColor(
    dynamicPreview ? { g: 1 } : { r: 0, g: 1, b: 0 },
  );
  const trackBlueLeft = previewColor({ b: 0 });
  const trackBlueRight = previewColor(
    dynamicPreview ? { b: 1 } : { r: 0, g: 0, b: 1 },
  );

  return (
    <Fragment>
      <Slider
        prefix={prefix}
        label="red"
        gradient={`${trackRedLeft}, ${trackRedRight}`}
        stepMin={0.0045}
        min={0}
        max={1}
        value={color.r}
        onChange={(e) => updateColor({ r: e.target.valueAsNumber })}
      />
      <Slider
        prefix={prefix}
        label="green"
        gradient={`${trackGreenLeft}, ${trackGreenRight}`}
        stepMin={0.0045}
        min={0}
        max={1}
        value={color.g}
        onChange={(e) => updateColor({ g: e.target.valueAsNumber })}
      />
      <Slider
        prefix={prefix}
        label="blue"
        gradient={`${trackBlueLeft}, ${trackBlueRight}`}
        stepMin={0.0045}
        min={0}
        max={1}
        value={color.b}
        onChange={(e) => updateColor({ b: e.target.valueAsNumber })}
      />
    </Fragment>
  );
}

"use client";

import type { RgbColor, RgbColorMode } from "~/lib/color";
import { useMemo, useCallback, Fragment } from "react";
import { createTracks } from "~/lib/tracks";
import { Slider } from "~/components";

export default function InputRgb({
  color,
  action,
  dynamicPreview = true,
  prefix = "rgb",
}: {
  color: RgbColor;
  action: (color: RgbColorMode) => void;
  dynamicPreview?: boolean;
  prefix?: string;
}) {
  const updateColor = useCallback(
    (newColor: Partial<RgbColor>) =>
      action({ mode: "rgb", ...color, ...newColor }),
    [color, action],
  );

  const previewColor = useMemo(
    () => createTracks({ mode: "rgb", ...color }, dynamicPreview),
    [color, dynamicPreview],
  );

  const [red, green, blue] = previewColor;

  return (
    <Fragment>
      <Slider
        prefix={prefix}
        label="red"
        gradient={red}
        stepMin={1}
        min={0}
        max={255}
        value={color.r}
        onChange={(e) => updateColor({ r: e.target.valueAsNumber })}
      />
      <Slider
        prefix={prefix}
        label="green"
        gradient={green}
        stepMin={1}
        min={0}
        max={255}
        value={color.g}
        onChange={(e) => updateColor({ g: e.target.valueAsNumber })}
      />
      <Slider
        prefix={prefix}
        label="blue"
        gradient={blue}
        stepMin={1}
        min={0}
        max={255}
        value={color.b}
        onChange={(e) => updateColor({ b: e.target.valueAsNumber })}
      />
    </Fragment>
  );
}

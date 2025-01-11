"use client";

import type { RgbColor, RgbColorMode } from "~/lib/types";
import { useState, useCallback, startTransition } from "react";
import { useColor } from "~/hooks";
import { formatRgb } from "~/lib/color";
import { Range } from "~/components";

export default function InputRgb({
  onChange,
  dynamicPreview = true,
}: {
  onChange?: (color: RgbColorMode) => void;
  dynamicPreview?: boolean;
}) {
  const [{ rgb }] = useColor();
  const [color, setRgb] = useState<RgbColor>(rgb.color);

  const updateColor = useCallback(
    (newColor: Partial<RgbColor>) => {
      startTransition(() => {
        setRgb({ ...color, ...newColor });

        if (onChange) {
          onChange({ mode: "rgb", ...color, ...newColor });
        }
      });
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
    <>
      <Range
        prefix="rgb"
        label="red"
        color={`${trackRedLeft}, ${trackRedRight}`}
        stepMin={0.0045}
        min={0}
        max={1}
        value={color.r}
        onChange={(e) => updateColor({ r: e.target.valueAsNumber })}
      />
      <Range
        prefix="rgb"
        label="green"
        color={`${trackGreenLeft}, ${trackGreenRight}`}
        stepMin={0.0045}
        min={0}
        max={1}
        value={color.g}
        onChange={(e) => updateColor({ g: e.target.valueAsNumber })}
      />
      <Range
        prefix="rgb"
        label="blue"
        color={`${trackBlueLeft}, ${trackBlueRight}`}
        stepMin={0.0045}
        min={0}
        max={1}
        value={color.b}
        onChange={(e) => updateColor({ b: e.target.valueAsNumber })}
      />
    </>
  );
}

"use client";

import type { OklabColor, OklabColorMode } from "~/lib/types";
import { useState, useCallback } from "react";
import { useColor } from "~/hooks";
import { formatOklab } from "~/lib/color";
import { Range } from "~/components";

export default function InputOklab({
  onChange,
  dynamicPreview = true,
}: {
  onChange?: (color: OklabColorMode) => void;
  dynamicPreview?: boolean;
}) {
  const [{ oklab }] = useColor();
  const [color, setOklab] = useState<OklabColor>(oklab.color);

  const updateColor = useCallback(
    (newColor: Partial<OklabColor>) => {
      setOklab({ ...color, ...newColor });

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
    <>
      <Range
        prefix="oklab"
        label="lightness"
        color={`${trackLightnessLeft}, ${trackLightnessRight}`}
        stepMin={0.01}
        stepMax={0.001}
        min={0}
        max={1}
        value={color.l}
        onChange={(e) => updateColor({ l: e.target.valueAsNumber })}
      />
      <Range
        prefix="oklab"
        label="green-red"
        color={`${trackGreenRedLeft}, ${trackGreenRedRight}`}
        stepMin={0.01}
        stepMax={0.001}
        min={-0.4}
        max={0.4}
        value={color.a}
        onChange={(e) => updateColor({ a: e.target.valueAsNumber })}
      />
      <Range
        prefix="oklab"
        label="blue-yellow"
        color={`${trackBlueYellowLeft}, ${trackBlueYellowRight}`}
        stepMin={0.01}
        stepMax={0.001}
        min={-0.4}
        max={0.4}
        value={color.b}
        onChange={(e) => updateColor({ b: e.target.valueAsNumber })}
      />
    </>
  );
}

"use client";

import type { LabColor, LabColorMode } from "~/lib/types";
import { useState, useCallback, startTransition } from "react";
import { useColor } from "~/hooks";
import { formatLab } from "~/lib/color";
import { Range } from "~/components";

export default function InputLab({
  onChange,
  dynamicPreview = true,
}: {
  onChange?: (color: LabColorMode) => void;
  dynamicPreview?: boolean;
}) {
  const [{ lab }] = useColor();
  const [color, setLab] = useState<LabColor>(lab.color);

  const updateColor = useCallback(
    (newColor: Partial<LabColor>) => {
      startTransition(() => {
        setLab({ ...color, ...newColor });

        if (onChange) {
          onChange({ mode: "lab", ...color, ...newColor });
        }
      });
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
    <>
      <Range
        prefix="lab"
        label="lightness"
        color={`${trackLightnessLeft}, ${trackLightnessRight}`}
        stepMin={1}
        stepMax={0.01}
        min={0}
        max={100}
        value={color.l}
        onChange={(e) => updateColor({ l: e.target.valueAsNumber })}
      />
      <Range
        prefix="lab"
        label="green-red"
        color={`${trackGreenRedLeft}, ${trackGreenRedRight}`}
        stepMin={1}
        stepMax={0.01}
        min={-100}
        max={100}
        value={color.a}
        onChange={(e) => updateColor({ a: e.target.valueAsNumber })}
      />
      <Range
        prefix="lab"
        label="blue-yellow"
        color={`${trackBlueYellowLeft}, ${trackBlueYellowRight}`}
        stepMin={1}
        stepMax={0.01}
        min={-100}
        max={100}
        value={color.b}
        onChange={(e) => updateColor({ b: e.target.valueAsNumber })}
      />
    </>
  );
}

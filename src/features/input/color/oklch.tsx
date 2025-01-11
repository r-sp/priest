"use client";

import type { OklchColor, OklchColorMode } from "~/lib/types";
import { useState, useCallback, startTransition } from "react";
import { useColor } from "~/hooks";
import { formatOklch } from "~/lib/color";
import { Range } from "~/components";

export default function InputOklch({
  onChange,
  dynamicPreview = true,
}: {
  onChange?: (color: OklchColorMode) => void;
  dynamicPreview?: boolean;
}) {
  const [{ oklch }] = useColor();
  const [color, setOklch] = useState<OklchColor>(oklch.color);

  const updateColor = useCallback(
    (newColor: Partial<OklchColor>) => {
      startTransition(() => {
        setOklch({ ...color, ...newColor });

        if (onChange) {
          onChange({ mode: "oklch", ...color, ...newColor });
        }
      });
    },
    [color, onChange],
  );

  const previewColor = useCallback(
    (newColor: Partial<OklchColor>) => {
      return formatOklch({ ...color, ...newColor });
    },
    [color],
  );

  const trackLightnessLeft = previewColor(
    dynamicPreview ? { l: 0 } : { l: 0, c: 0.235 },
  );
  const trackLightnessRight = previewColor(
    dynamicPreview ? { l: 1 } : { l: 1, c: 0.235 },
  );
  const trackChromaLeft = previewColor(
    dynamicPreview ? { c: 0 } : { l: 0.875, c: 0 },
  );
  const trackChromaRight = previewColor(
    dynamicPreview ? { c: 0.4 } : { l: 0.875, c: 0.4 },
  );
  const trackHueLeft = previewColor(
    dynamicPreview ? { h: 0 } : { l: 0.75, c: 0.333, h: 0 },
  );
  const trackHueRed = previewColor(
    dynamicPreview ? { h: 60 } : { l: 0.75, c: 0.333, h: 60 },
  );
  const trackHueGreen = previewColor(
    dynamicPreview ? { h: 120 } : { l: 0.75, c: 0.333, h: 120 },
  );
  const trackHueCenter = previewColor(
    dynamicPreview ? { h: 180 } : { l: 0.75, c: 0.333, h: 180 },
  );
  const trackHueBlue = previewColor(
    dynamicPreview ? { h: 240 } : { l: 0.75, c: 0.333, h: 240 },
  );
  const trackHuePurple = previewColor(
    dynamicPreview ? { h: 300 } : { l: 0.75, c: 0.333, h: 300 },
  );
  const trackHueRight = previewColor(
    dynamicPreview ? { h: 360 } : { l: 0.75, c: 0.333, h: 360 },
  );

  return (
    <>
      <Range
        prefix="oklch"
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
        prefix="oklch"
        label="chroma"
        color={`${trackChromaLeft}, ${trackChromaRight}`}
        stepMin={0.01}
        stepMax={0.001}
        min={0}
        max={0.4}
        value={color.c}
        onChange={(e) => updateColor({ c: e.target.valueAsNumber })}
      />
      <Range
        prefix="oklch"
        label="hue"
        color={`${trackHueLeft}, ${trackHueRed}, ${trackHueGreen}, ${trackHueCenter}, ${trackHueBlue}, ${trackHuePurple}, ${trackHueRight}`}
        stepMin={1}
        stepMax={0.001}
        min={0}
        max={360}
        value={color.h}
        onChange={(e) => updateColor({ h: e.target.valueAsNumber })}
      />
    </>
  );
}

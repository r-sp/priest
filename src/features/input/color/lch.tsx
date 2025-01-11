"use client";

import type { LchColor, LchColorMode } from "~/lib/types";
import { useState, useCallback } from "react";
import { useColor } from "~/hooks";
import { formatLch } from "~/lib/color";
import { Range } from "~/components";

export default function InputLch({
  onChange,
  dynamicPreview = true,
}: {
  onChange?: (color: LchColorMode) => void;
  dynamicPreview?: boolean;
}) {
  const [{ lch }] = useColor();
  const [color, setLch] = useState<LchColor>(lch.color);

  const updateColor = useCallback(
    (newColor: Partial<LchColor>) => {
      setLch({ ...color, ...newColor });

      if (onChange) {
        onChange({ mode: "lch", ...color, ...newColor });
      }
    },
    [color, onChange],
  );

  const previewColor = useCallback(
    (newColor: Partial<LchColor>) => {
      return formatLch({ ...color, ...newColor });
    },
    [color],
  );

  const trackLightnessLeft = previewColor(
    dynamicPreview ? { l: 0 } : { l: 0, c: 73.06 },
  );
  const trackLightnessRight = previewColor(
    dynamicPreview ? { l: 100 } : { l: 100, c: 73.06 },
  );
  const trackChromaLeft = previewColor(
    dynamicPreview ? { c: 0 } : { l: 90, c: 0 },
  );
  const trackChromaRight = previewColor(
    dynamicPreview ? { c: 150 } : { l: 90, c: 150 },
  );
  const trackHueLeft = previewColor(
    dynamicPreview ? { h: 0 } : { l: 67, c: 106.45, h: 0 },
  );
  const trackHueRed = previewColor(
    dynamicPreview ? { h: 60 } : { l: 67, c: 106.45, h: 60 },
  );
  const trackHueGreen = previewColor(
    dynamicPreview ? { h: 120 } : { l: 67, c: 106.45, h: 120 },
  );
  const trackHueCenter = previewColor(
    dynamicPreview ? { h: 180 } : { l: 67, c: 106.45, h: 180 },
  );
  const trackHueBlue = previewColor(
    dynamicPreview ? { h: 240 } : { l: 67, c: 106.45, h: 240 },
  );
  const trackHuePurple = previewColor(
    dynamicPreview ? { h: 300 } : { l: 67, c: 106.45, h: 300 },
  );
  const trackHueRight = previewColor(
    dynamicPreview ? { h: 360 } : { l: 67, c: 106.45, h: 360 },
  );

  return (
    <>
      <Range
        prefix="lch"
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
        prefix="lch"
        label="chroma"
        color={`${trackChromaLeft}, ${trackChromaRight}`}
        stepMin={1}
        stepMax={0.01}
        min={0}
        max={150}
        value={color.c}
        onChange={(e) => updateColor({ c: e.target.valueAsNumber })}
      />
      <Range
        prefix="lch"
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

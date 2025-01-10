"use client";

import type { HwbColor, HwbColorMode } from "~/lib/types";
import { useState, useCallback } from "react";
import { useColor } from "~/hooks";
import { formatHwb } from "~/lib/color";
import { Range } from "~/components";

export default function InputHwb({
  onChange,
  dynamicPreview = true,
}: {
  onChange?: (color: HwbColorMode) => void;
  dynamicPreview?: boolean;
}) {
  const [{ hwb }] = useColor();
  const [color, setHwb] = useState<HwbColor>(hwb.color);

  const updateColor = useCallback(
    (newColor: Partial<HwbColor>) => {
      setHwb({ ...color, ...newColor });

      if (onChange) {
        onChange({ mode: "hwb", ...color, ...newColor });
      }
    },
    [color, onChange],
  );

  const previewColor = useCallback(
    (newColor: Partial<HwbColor>) => {
      return formatHwb({ ...color, ...newColor });
    },
    [color],
  );

  const trackHueRed = previewColor(
    dynamicPreview ? { h: 0 } : { h: 0, w: 0, b: 0 },
  );
  const trackHueYellow = previewColor(
    dynamicPreview ? { h: 60 } : { h: 60, w: 0, b: 0 },
  );
  const trackHueGreen = previewColor(
    dynamicPreview ? { h: 120 } : { h: 120, w: 0, b: 0 },
  );
  const trackHueCyan = previewColor(
    dynamicPreview ? { h: 180 } : { h: 180, w: 0, b: 0 },
  );
  const trackHueBlue = previewColor(
    dynamicPreview ? { h: 240 } : { h: 240, w: 0, b: 0 },
  );
  const trackHuePurple = previewColor(
    dynamicPreview ? { h: 300 } : { h: 300, w: 0, b: 0 },
  );
  const trackWhitenessLeft = previewColor(
    dynamicPreview ? { w: 0 } : { w: 0, b: 0.5 },
  );
  const trackWhitenessRight = previewColor(
    dynamicPreview ? { w: 1 } : { w: 1, b: 0 },
  );
  const trackBlacknessLeft = previewColor(
    dynamicPreview ? { b: 0 } : { w: 0, b: 0 },
  );
  const trackBlacknessRight = previewColor(
    dynamicPreview ? { b: 1 } : { w: 0, b: 1 },
  );

  return (
    <>
      <Range
        prefix="hwb"
        label="hue"
        color={`${trackHueRed} 0%, ${trackHueYellow} 17%, ${trackHueGreen} 33%, ${trackHueCyan} 50%, ${trackHueBlue} 67%, ${trackHuePurple} 83%, ${trackHueRed} 100%`}
        stepMin={1}
        stepMax={0.01}
        min={0}
        max={360}
        value={color.h}
        onChange={(e) => updateColor({ h: e.target.valueAsNumber })}
      />
      <Range
        prefix="hwb"
        label="whiteness"
        color={`${trackWhitenessLeft}, ${trackWhitenessRight}`}
        stepMin={0.01}
        stepMax={0.0001}
        min={0}
        max={1}
        value={color.w}
        onChange={(e) => updateColor({ w: e.target.valueAsNumber })}
      />
      <Range
        prefix="hwb"
        label="blackness"
        color={`${trackBlacknessLeft}, ${trackBlacknessRight}`}
        stepMin={0.01}
        stepMax={0.0001}
        min={0}
        max={1}
        value={color.b}
        onChange={(e) => updateColor({ b: e.target.valueAsNumber })}
      />
    </>
  );
}

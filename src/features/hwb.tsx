"use client";

import type { HwbColor, HwbColorMode } from "~/lib/types";
import { useCallback, Fragment } from "react";
import { formatHwb } from "~/lib";
import { Slider } from "~/components";

export default function InputHwb({
  color,
  action,
  dynamicPreview = true,
  prefix = "hwb",
}: {
  color: HwbColor;
  action: (color: HwbColorMode) => void;
  dynamicPreview?: boolean;
  prefix?: string;
}) {
  const updateColor = useCallback(
    (newColor: Partial<HwbColor>) =>
      action({ mode: "hwb", ...color, ...newColor }),
    [color, action],
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
    dynamicPreview ? { w: 0 } : { w: 0, b: 50 },
  );
  const trackWhitenessRight = previewColor(
    dynamicPreview ? { w: 100 } : { w: 100, b: 0 },
  );
  const trackBlacknessLeft = previewColor(
    dynamicPreview ? { b: 0 } : { w: 0, b: 0 },
  );
  const trackBlacknessRight = previewColor(
    dynamicPreview ? { b: 100 } : { w: 0, b: 100 },
  );

  return (
    <Fragment>
      <Slider
        prefix={prefix}
        label="hue"
        gradient={`${trackHueRed} 0%, ${trackHueYellow} 17%, ${trackHueGreen} 33%, ${trackHueCyan} 50%, ${trackHueBlue} 67%, ${trackHuePurple} 83%, ${trackHueRed} 100%`}
        stepMin={1}
        stepMax={0.01}
        min={0}
        max={360}
        value={color.h}
        onChange={(e) => updateColor({ h: e.target.valueAsNumber })}
      />
      <Slider
        prefix={prefix}
        label="whiteness"
        gradient={`${trackWhitenessLeft}, ${trackWhitenessRight}`}
        stepMin={1}
        stepMax={0.01}
        min={0}
        max={100}
        value={color.w}
        onChange={(e) => updateColor({ w: e.target.valueAsNumber })}
      />
      <Slider
        prefix={prefix}
        label="blackness"
        gradient={`${trackBlacknessLeft}, ${trackBlacknessRight}`}
        stepMin={1}
        stepMax={0.01}
        min={0}
        max={100}
        value={color.b}
        onChange={(e) => updateColor({ b: e.target.valueAsNumber })}
      />
    </Fragment>
  );
}

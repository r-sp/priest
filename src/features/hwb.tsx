"use client";

import type { HwbColor, HwbColorMode } from "~/lib/types";
import { useCallback, Fragment } from "react";
import { useColorStore } from "~/hooks";
import { formatHwb } from "~/lib";
import { Slider } from "~/components";

export default function InputHwb({
  onChange,
  dynamicPreview = true,
  hue = true,
  whiteness = true,
  blackness = true,
  prefix = "hwb",
}: {
  onChange?: (color: HwbColorMode) => void;
  dynamicPreview?: boolean;
  hue?: boolean;
  whiteness?: boolean;
  blackness?: boolean;
  prefix?: string;
}) {
  const { color } = useColorStore((state) => state.hwb);

  const updateColor = useCallback(
    (newColor: Partial<HwbColor>) => {
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
    <Fragment>
      {hue && (
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
      )}
      {whiteness && (
        <Slider
          prefix={prefix}
          label="whiteness"
          gradient={`${trackWhitenessLeft}, ${trackWhitenessRight}`}
          stepMin={0.01}
          stepMax={0.0001}
          min={0}
          max={1}
          value={color.w}
          onChange={(e) => updateColor({ w: e.target.valueAsNumber })}
        />
      )}
      {blackness && (
        <Slider
          prefix={prefix}
          label="blackness"
          gradient={`${trackBlacknessLeft}, ${trackBlacknessRight}`}
          stepMin={0.01}
          stepMax={0.0001}
          min={0}
          max={1}
          value={color.b}
          onChange={(e) => updateColor({ b: e.target.valueAsNumber })}
        />
      )}
    </Fragment>
  );
}

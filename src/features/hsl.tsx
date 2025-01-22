"use client";

import type { HslColor, HslColorMode } from "~/lib/types";
import { useCallback, Fragment } from "react";
import { formatHsl } from "~/lib";
import { Slider } from "~/components";

export default function InputHsl({
  color,
  action,
  dynamicPreview = true,
  prefix = "hsl",
}: {
  color: HslColor;
  action: (color: HslColorMode) => void;
  dynamicPreview?: boolean;
  prefix?: string;
}) {
  const updateColor = useCallback(
    (newColor: Partial<HslColor>) =>
      action({ mode: "hsl", ...color, ...newColor }),
    [color, action],
  );

  const previewColor = useCallback(
    (newColor: Partial<HslColor>) => {
      return formatHsl({ ...color, ...newColor });
    },
    [color],
  );

  const trackHueRed = previewColor(
    dynamicPreview ? { h: 0 } : { h: 0, s: 100, l: 50 },
  );
  const trackHueYellow = previewColor(
    dynamicPreview ? { h: 60 } : { h: 60, s: 100, l: 50 },
  );
  const trackHueGreen = previewColor(
    dynamicPreview ? { h: 120 } : { h: 120, s: 100, l: 50 },
  );
  const trackHueCyan = previewColor(
    dynamicPreview ? { h: 180 } : { h: 180, s: 100, l: 50 },
  );
  const trackHueBlue = previewColor(
    dynamicPreview ? { h: 240 } : { h: 240, s: 100, l: 50 },
  );
  const trackHuePurple = previewColor(
    dynamicPreview ? { h: 300 } : { h: 300, s: 100, l: 50 },
  );
  const trackSaturationLeft = previewColor(
    dynamicPreview ? { s: 0 } : { s: 0, l: 50 },
  );
  const trackSaturationRight = previewColor(
    dynamicPreview ? { s: 100 } : { s: 100, l: 50 },
  );
  const trackLightnessCenter = previewColor({ s: 100, l: 50 });

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
        label="saturation"
        gradient={`${trackSaturationLeft}, ${trackSaturationRight}`}
        stepMin={1}
        stepMax={0.01}
        min={0}
        max={100}
        value={color.s}
        onChange={(e) => updateColor({ s: e.target.valueAsNumber })}
      />
      <Slider
        prefix={prefix}
        label="lightness"
        gradient={`hsl(0 0% 0%), ${trackLightnessCenter}, hsl(0 0% 100%)`}
        stepMin={1}
        stepMax={0.01}
        min={0}
        max={100}
        value={color.l}
        onChange={(e) => updateColor({ l: e.target.valueAsNumber })}
      />
    </Fragment>
  );
}

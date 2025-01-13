"use client";

import type { HslColor, HslColorMode } from "~/lib/types";
import { useCallback, Fragment } from "react";
import { useColorStore } from "~/hooks";
import { formatHsl } from "~/lib";
import { Slider } from "~/components";

export default function InputHsl({
  onChange,
  dynamicPreview = true,
  hue = true,
  saturation = true,
  lightness = true,
  prefix = "hsl",
}: {
  onChange?: (color: HslColorMode) => void;
  dynamicPreview?: boolean;
  hue?: boolean;
  saturation?: boolean;
  lightness?: boolean;
  prefix?: string;
}) {
  const { color } = useColorStore((state) => state.hsl);

  const updateColor = useCallback(
    (newColor: Partial<HslColor>) => {
      if (onChange) {
        onChange({ mode: "hsl", ...color, ...newColor });
      }
    },
    [color, onChange],
  );

  const previewColor = useCallback(
    (newColor: Partial<HslColor>) => {
      return formatHsl({ ...color, ...newColor });
    },
    [color],
  );

  const trackHueRed = previewColor(
    dynamicPreview ? { h: 0 } : { h: 0, s: 1, l: 0.5 },
  );
  const trackHueYellow = previewColor(
    dynamicPreview ? { h: 60 } : { h: 60, s: 1, l: 0.5 },
  );
  const trackHueGreen = previewColor(
    dynamicPreview ? { h: 120 } : { h: 120, s: 1, l: 0.5 },
  );
  const trackHueCyan = previewColor(
    dynamicPreview ? { h: 180 } : { h: 180, s: 1, l: 0.5 },
  );
  const trackHueBlue = previewColor(
    dynamicPreview ? { h: 240 } : { h: 240, s: 1, l: 0.5 },
  );
  const trackHuePurple = previewColor(
    dynamicPreview ? { h: 300 } : { h: 300, s: 1, l: 0.5 },
  );
  const trackSaturationLeft = previewColor(
    dynamicPreview ? { s: 0 } : { s: 0, l: 0.5 },
  );
  const trackSaturationRight = previewColor(
    dynamicPreview ? { s: 1 } : { s: 1, l: 0.5 },
  );
  const trackLightnessCenter = previewColor({ s: 1, l: 0.5 });

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
      {saturation && (
        <Slider
          prefix={prefix}
          label="saturation"
          gradient={`${trackSaturationLeft}, ${trackSaturationRight}`}
          stepMin={0.01}
          stepMax={0.0001}
          min={0}
          max={1}
          value={color.s}
          onChange={(e) => updateColor({ s: e.target.valueAsNumber })}
        />
      )}
      {lightness && (
        <Slider
          prefix={prefix}
          label="lightness"
          gradient={`hsl(0 0% 0%), ${trackLightnessCenter}, hsl(0 0% 100%)`}
          stepMin={0.01}
          stepMax={0.0001}
          min={0}
          max={1}
          value={color.l}
          onChange={(e) => updateColor({ l: e.target.valueAsNumber })}
        />
      )}
    </Fragment>
  );
}

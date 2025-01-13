"use client";

import type { OklchColor, OklchColorMode } from "~/lib/types";
import { useCallback, Fragment } from "react";
import { useColorStore } from "~/hooks";
import { formatOklch } from "~/lib/format";
import { Slider } from "~/components";

export default function InputOklch({
  onChange,
  dynamicPreview = true,
  lightness = true,
  chroma = true,
  hue = true,
  prefix = "oklch",
}: {
  onChange?: (color: OklchColorMode) => void;
  dynamicPreview?: boolean;
  lightness?: boolean;
  chroma?: boolean;
  hue?: boolean;
  prefix?: string;
}) {
  const { color } = useColorStore((state) => state.oklch);

  const updateColor = useCallback(
    (newColor: Partial<OklchColor>) => {
      if (onChange) {
        onChange({ mode: "oklch", ...color, ...newColor });
      }
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
    <Fragment>
      {lightness && (
        <Slider
          prefix={prefix}
          label="lightness"
          gradient={`${trackLightnessLeft}, ${trackLightnessRight}`}
          stepMin={0.01}
          stepMax={0.001}
          min={0}
          max={1}
          value={color.l}
          onChange={(e) => updateColor({ l: e.target.valueAsNumber })}
        />
      )}
      {chroma && (
        <Slider
          prefix={prefix}
          label="chroma"
          gradient={`${trackChromaLeft}, ${trackChromaRight}`}
          stepMin={0.01}
          stepMax={0.001}
          min={0}
          max={0.4}
          value={color.c}
          onChange={(e) => updateColor({ c: e.target.valueAsNumber })}
        />
      )}
      {hue && (
        <Slider
          prefix={prefix}
          label="hue"
          gradient={`${trackHueLeft}, ${trackHueRed}, ${trackHueGreen}, ${trackHueCenter}, ${trackHueBlue}, ${trackHuePurple}, ${trackHueRight}`}
          stepMin={1}
          stepMax={0.001}
          min={0}
          max={360}
          value={color.h}
          onChange={(e) => updateColor({ h: e.target.valueAsNumber })}
        />
      )}
    </Fragment>
  );
}

"use client";

import type { OklchColor, OklchColorMode } from "~/lib/types";
import { useState, useCallback } from "react";
import { useColor } from "~/hooks";
import { formatOklch } from "~/lib/color";
import { Inline } from "~/components";

export default function InputOklch({
  onChange,
  dynamicPreview = true,
}: {
  onChange?: (color: OklchColorMode) => void;
  dynamicPreview?: boolean;
}) {
  const [{ oklch }] = useColor();
  const [color, setOklch] = useState<OklchColor>(oklch.color);
  const [focusLightness, setFocusLightness] = useState<boolean>(false);
  const [focusChroma, setFocusChroma] = useState<boolean>(false);
  const [focusHue, setFocusHue] = useState<boolean>(false);

  const updateColor = useCallback(
    (newColor: Partial<OklchColor>) => {
      setOklch({ ...color, ...newColor });

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
    <>
      <Inline
        role="none"
        className="relative inline-grid"
        bg={`linear-gradient(to right, ${trackLightnessLeft}, ${trackLightnessRight})`}
      >
        <input
          aria-label="lightness"
          type="range"
          min={0}
          max={1}
          step={focusLightness ? 0.01 : 0.001}
          value={color.l}
          id="oklch-lightness"
          className="slider relative z-2 text-neutral-400"
          onChange={(e) => updateColor({ l: e.target.valueAsNumber })}
          onKeyDown={() => setFocusLightness(true)}
          onBlur={() => focusLightness && setFocusLightness(false)}
        />
        <span
          role="presentation"
          className="bg-gradient-ref pointer-events-none absolute top-1 right-0 bottom-1 left-0 z-0 rounded-md"
        ></span>
      </Inline>
      <Inline
        role="none"
        className="relative inline-grid"
        bg={`linear-gradient(to right, ${trackChromaLeft}, ${trackChromaRight})`}
      >
        <input
          aria-label="chroma"
          type="range"
          min={0}
          max={0.4}
          step={focusChroma ? 0.01 : 0.001}
          value={color.c}
          id="oklch-chroma"
          className="slider relative z-2 text-neutral-400"
          onChange={(e) => updateColor({ c: e.target.valueAsNumber })}
          onKeyDown={() => setFocusChroma(true)}
          onBlur={() => focusChroma && setFocusChroma(false)}
        />
        <span
          role="presentation"
          className="bg-gradient-ref pointer-events-none absolute top-1 right-0 bottom-1 left-0 z-0 rounded-md"
        ></span>
      </Inline>
      <Inline
        role="none"
        className="relative inline-grid"
        bg={`linear-gradient(to right, ${trackHueLeft}, ${trackHueRed}, ${trackHueGreen}, ${trackHueCenter}, ${trackHueBlue}, ${trackHuePurple}, ${trackHueRight})`}
      >
        <input
          aria-label="hue"
          type="range"
          min={0}
          max={360}
          step={focusHue ? 1 : 0.001}
          value={color.h}
          id="oklch-hue"
          className="slider relative z-2 text-neutral-400"
          onChange={(e) => updateColor({ h: e.target.valueAsNumber })}
          onKeyDown={() => setFocusHue(true)}
          onBlur={() => focusHue && setFocusHue(false)}
        />
        <span
          role="presentation"
          className="bg-gradient-ref pointer-events-none absolute top-1 right-0 bottom-1 left-0 z-0 rounded-md"
        ></span>
      </Inline>
    </>
  );
}

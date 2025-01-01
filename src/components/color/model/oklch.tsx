"use client";

import type { OklchColor, OklchColorMode } from "~/lib/types";
import { useState, useEffect, useCallback } from "react";
import { formatOklch } from "~/lib/color";
import { useColor } from "~/app/store";

export default function InputOklch({
  onChange,
}: {
  onChange?: (color: OklchColorMode) => void;
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

  const trackLightnessLeft = previewColor({ l: 0 });
  const trackLightnessRight = previewColor({ l: 1 });
  const trackChromaLeft = previewColor({ c: 0 });
  const trackChromaRight = previewColor({ c: 0.4 });
  const trackHueLeft = previewColor({ h: 0 });
  const trackHueRed = previewColor({ h: 60 });
  const trackHueGreen = previewColor({ h: 120 });
  const trackHueCenter = previewColor({ h: 180 });
  const trackHueBlue = previewColor({ h: 240 });
  const trackHuePurple = previewColor({ h: 300 });
  const trackHueRight = previewColor({ h: 360 });

  useEffect(() => {
    const currentColor = formatOklch(color);
    return () => {
      if (currentColor !== oklch.css) {
        setOklch(oklch.color);
      }
    };
  }, [color, oklch]);

  return (
    <>
      <div role="none" className="relative inline-grid">
        <input
          aria-label="lightness"
          type="range"
          min={0}
          max={1}
          step={focusLightness ? 0.01 : 0.001}
          value={color.l}
          id="oklch-lightness"
          className="color-slider relative z-2 text-neutral-400"
          onChange={(e) => updateColor({ l: e.target.valueAsNumber })}
          onKeyDown={() => setFocusLightness(true)}
          onBlur={() => focusLightness && setFocusLightness(false)}
        />
        <span
          role="presentation"
          className="pointer-events-none absolute top-1 right-0 bottom-1 left-0 z-0 rounded-md"
          style={{
            backgroundImage: `linear-gradient(to right, ${trackLightnessLeft}, ${trackLightnessRight})`,
          }}
        ></span>
      </div>
      <div role="none" className="relative inline-grid">
        <input
          aria-label="chroma"
          type="range"
          min={0}
          max={0.4}
          step={focusChroma ? 0.01 : 0.001}
          value={color.c}
          id="oklch-chroma"
          className="color-slider relative z-2 text-neutral-400"
          onChange={(e) => updateColor({ c: e.target.valueAsNumber })}
          onKeyDown={() => setFocusChroma(true)}
          onBlur={() => focusChroma && setFocusChroma(false)}
        />
        <span
          role="presentation"
          className="pointer-events-none absolute top-1 right-0 bottom-1 left-0 z-0 rounded-md"
          style={{
            backgroundImage: `linear-gradient(to right, ${trackChromaLeft}, ${trackChromaRight})`,
          }}
        ></span>
      </div>
      <div role="none" className="relative inline-grid">
        <input
          aria-label="hue"
          type="range"
          min={0}
          max={360}
          step={focusHue ? 1 : 0.001}
          value={color.h}
          id="oklch-hue"
          className="color-slider relative z-2 text-neutral-400"
          onChange={(e) => updateColor({ h: e.target.valueAsNumber })}
          onKeyDown={() => setFocusHue(true)}
          onBlur={() => focusHue && setFocusHue(false)}
        />
        <span
          role="presentation"
          className="pointer-events-none absolute top-1 right-0 bottom-1 left-0 z-0 rounded-md"
          style={{
            backgroundImage: `linear-gradient(to right, ${trackHueLeft}, ${trackHueRed}, ${trackHueGreen}, ${trackHueCenter}, ${trackHueBlue}, ${trackHuePurple}, ${trackHueRight})`,
          }}
        ></span>
      </div>
    </>
  );
}

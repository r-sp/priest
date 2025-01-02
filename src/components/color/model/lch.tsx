"use client";

import type { LchColor, LchColorMode } from "~/lib/types";
import { useState, useEffect, useCallback } from "react";
import { formatLch } from "~/lib/color";
import { useColor } from "~/app/store";

export default function InputLch({
  onChange,
  dynamicPreview = true,
}: {
  onChange?: (color: LchColorMode) => void;
  dynamicPreview?: boolean;
}) {
  const [{ lch }] = useColor();
  const [color, setLch] = useState<LchColor>(lch.color);
  const [focusLightness, setFocusLightness] = useState<boolean>(false);
  const [focusChroma, setFocusChroma] = useState<boolean>(false);
  const [focusHue, setFocusHue] = useState<boolean>(false);

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

  useEffect(() => {
    const currentColor = formatLch(color);
    return () => {
      if (currentColor !== lch.css) {
        setLch(lch.color);
      }
    };
  }, [color, lch]);

  return (
    <>
      <div
        role="none"
        className="relative inline-grid"
        style={{
          ["--bg" as string]: `linear-gradient(to right, ${trackLightnessLeft}, ${trackLightnessRight})`,
        }}
      >
        <input
          aria-label="lightness"
          type="range"
          min={0}
          max={100}
          step={focusLightness ? 1 : 0.01}
          value={color.l}
          id="lch-lightness"
          className="color-slider relative z-2 text-neutral-400"
          onChange={(e) => updateColor({ l: e.target.valueAsNumber })}
          onKeyDown={() => setFocusLightness(true)}
          onBlur={() => focusLightness && setFocusLightness(false)}
        />
        <span
          role="presentation"
          className="pointer-events-none absolute top-1 right-0 bottom-1 left-0 z-0 rounded-md"
          style={{
            backgroundImage: "var(--bg)",
          }}
        ></span>
      </div>
      <div
        role="none"
        className="relative inline-grid"
        style={{
          ["--bg" as string]: `linear-gradient(to right, ${trackChromaLeft}, ${trackChromaRight})`,
        }}
      >
        <input
          aria-label="chroma"
          type="range"
          min={0}
          max={150}
          step={focusChroma ? 1 : 0.01}
          value={color.c}
          id="lch-chroma"
          className="color-slider relative z-2 text-neutral-400"
          onChange={(e) => updateColor({ c: e.target.valueAsNumber })}
          onKeyDown={() => setFocusChroma(true)}
          onBlur={() => focusChroma && setFocusChroma(false)}
        />
        <span
          role="presentation"
          className="pointer-events-none absolute top-1 right-0 bottom-1 left-0 z-0 rounded-md"
          style={{
            backgroundImage: "var(--bg)",
          }}
        ></span>
      </div>
      <div
        role="none"
        className="relative inline-grid"
        style={{
          ["--bg" as string]: `linear-gradient(to right, ${trackHueLeft}, ${trackHueRed}, ${trackHueGreen}, ${trackHueCenter}, ${trackHueBlue}, ${trackHuePurple}, ${trackHueRight})`,
        }}
      >
        <input
          aria-label="hue"
          type="range"
          min={0}
          max={360}
          step={focusHue ? 1 : 0.001}
          value={color.h}
          id="lch-hue"
          className="color-slider relative z-2 text-neutral-400"
          onChange={(e) => updateColor({ h: e.target.valueAsNumber })}
          onKeyDown={() => setFocusHue(true)}
          onBlur={() => focusHue && setFocusHue(false)}
        />
        <span
          role="presentation"
          className="pointer-events-none absolute top-1 right-0 bottom-1 left-0 z-0 rounded-md"
          style={{
            backgroundImage: "var(--bg)",
          }}
        ></span>
      </div>
    </>
  );
}

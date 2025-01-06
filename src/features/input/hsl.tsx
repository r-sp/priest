"use client";

import type { HslColor, HslColorMode } from "~/lib/types";
import { useState, useEffect, useCallback } from "react";
import { formatHsl } from "~/lib/color";
import { useColor } from "~/hooks";

export default function InputHsl({
  onChange,
  dynamicPreview = true,
}: {
  onChange?: (color: HslColorMode) => void;
  dynamicPreview?: boolean;
}) {
  const [{ hsl }] = useColor();
  const [color, setHsl] = useState<HslColor>(hsl.color);
  const [focusHue, setFocusHue] = useState<boolean>(false);
  const [focusSaturation, setFocusSaturation] = useState<boolean>(false);
  const [focusLightness, setFocusLightness] = useState<boolean>(false);

  const updateColor = useCallback(
    (newColor: Partial<HslColor>) => {
      setHsl({ ...color, ...newColor });

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

  useEffect(() => {
    const currentColor = formatHsl(color);
    return () => {
      if (currentColor !== hsl.css) {
        setHsl(hsl.color);
      }
    };
  }, [color, hsl]);

  return (
    <>
      <div
        role="none"
        className="relative inline-grid"
        style={{
          ["--bg" as string]: `linear-gradient(to right, ${trackHueRed} 0%, ${trackHueYellow} 17%, ${trackHueGreen} 33%, ${trackHueCyan} 50%, ${trackHueBlue} 67%, ${trackHuePurple} 83%, ${trackHueRed} 100%)`,
        }}
      >
        <input
          aria-label="hue"
          type="range"
          min={0}
          max={360}
          step={focusHue ? 1 : 0.01}
          value={color.h}
          id="hsl-hue"
          className="slider relative z-2 text-neutral-400"
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
      <div
        role="none"
        className="relative inline-grid"
        style={{
          ["--bg" as string]: `linear-gradient(to right, ${trackSaturationLeft}, ${trackSaturationRight})`,
        }}
      >
        <input
          aria-label="saturation"
          type="range"
          min={0}
          max={1}
          step={focusSaturation ? 0.01 : 0.0001}
          value={color.s}
          id="hsl-saturation"
          className="slider relative z-2 text-neutral-400"
          onChange={(e) => updateColor({ s: e.target.valueAsNumber })}
          onKeyDown={() => setFocusSaturation(true)}
          onBlur={() => focusSaturation && setFocusSaturation(false)}
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
          ["--bg" as string]: `linear-gradient(to right, hsl(0 0% 0%), ${trackLightnessCenter}, hsl(0 0% 100%))`,
        }}
      >
        <input
          aria-label="lightness"
          type="range"
          min={0}
          max={1}
          step={focusLightness ? 0.01 : 0.0001}
          value={color.l}
          id="hsl-lightness"
          className="slider relative z-2 text-neutral-400"
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
    </>
  );
}

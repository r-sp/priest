"use client";

import type { HslColor, HslColorMode } from "~/lib/types";
import { useState, useEffect, useCallback } from "react";
import { formatHsl } from "~/lib/color";
import { useColor } from "~/app/store";

export default function InputHsl({
  onChange,
}: {
  onChange?: (color: HslColorMode) => void;
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

  const trackHueRed = previewColor({ h: 0 });
  const trackHueYellow = previewColor({ h: 60 });
  const trackHueGreen = previewColor({ h: 120 });
  const trackHueCyan = previewColor({ h: 180 });
  const trackHueBlue = previewColor({ h: 240 });
  const trackHuePurple = previewColor({ h: 300 });
  const trackSaturationLeft = previewColor({ s: 0 });
  const trackSaturationRight = previewColor({ s: 1 });
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
      <div role="none" className="relative inline-grid">
        <input
          aria-label="hue"
          type="range"
          min={0}
          max={360}
          step={focusHue ? 1 : 0.01}
          value={color.h}
          id="hsl-hue"
          className="color-slider relative z-2 text-neutral-400"
          onChange={(e) => updateColor({ h: e.target.valueAsNumber })}
          onKeyDown={() => setFocusHue(true)}
          onBlur={() => focusHue && setFocusHue(false)}
        />
        <span
          role="presentation"
          className="pointer-events-none absolute top-1 right-0 bottom-1 left-0 z-0 rounded-md"
          style={{
            backgroundImage: `linear-gradient(to right, ${trackHueRed} 0%, ${trackHueYellow} 17%, ${trackHueGreen} 33%, ${trackHueCyan} 50%, ${trackHueBlue} 67%, ${trackHuePurple} 83%, ${trackHueRed} 100%)`,
          }}
        ></span>
      </div>
      <div role="none" className="relative inline-grid">
        <input
          aria-label="saturation"
          type="range"
          min={0}
          max={1}
          step={focusSaturation ? 0.01 : 0.0001}
          value={color.s}
          id="hsl-saturation"
          className="color-slider relative z-2 text-neutral-400"
          onChange={(e) => updateColor({ s: e.target.valueAsNumber })}
          onKeyDown={() => setFocusSaturation(true)}
          onBlur={() => focusSaturation && setFocusSaturation(false)}
        />
        <span
          role="presentation"
          className="pointer-events-none absolute top-1 right-0 bottom-1 left-0 z-0 rounded-md"
          style={{
            backgroundImage: `linear-gradient(to right, ${trackSaturationLeft}, ${trackSaturationRight})`,
          }}
        ></span>
      </div>
      <div role="none" className="relative inline-grid">
        <input
          aria-label="lightness"
          type="range"
          min={0}
          max={1}
          step={focusLightness ? 0.01 : 0.0001}
          value={color.l}
          id="hsl-lightness"
          className="color-slider relative z-2 text-neutral-400"
          onChange={(e) => updateColor({ l: e.target.valueAsNumber })}
          onKeyDown={() => setFocusLightness(true)}
          onBlur={() => focusLightness && setFocusLightness(false)}
        />
        <span
          role="presentation"
          className="pointer-events-none absolute top-1 right-0 bottom-1 left-0 z-0 rounded-md"
          style={{
            backgroundImage: `linear-gradient(to right, rgb(0,0,0), ${trackLightnessCenter}, rgb(255, 255, 255))`,
          }}
        ></span>
      </div>
    </>
  );
}

"use client";

import type { HwbColor, HwbColorMode } from "~/lib/types";
import { useState, useEffect, useCallback } from "react";
import { formatHwb } from "~/lib/color";
import { useColor } from "~/app/store";

export default function InputHwb({
  onChange,
}: {
  onChange?: (color: HwbColorMode) => void;
}) {
  const [{ hwb }] = useColor();
  const [color, setHwb] = useState<HwbColor>(hwb.color);
  const [focusHue, setFocusHue] = useState<boolean>(false);
  const [focusWhiteness, setFocusWhiteness] = useState<boolean>(false);
  const [focusBlackness, setFocusBlackness] = useState<boolean>(false);

  const updateColor = useCallback(
    (newColor: Partial<HwbColor>) => {
      setHwb({ ...color, ...newColor });

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

  const trackHueRed = previewColor({ h: 0 });
  const trackHueYellow = previewColor({ h: 60 });
  const trackHueGreen = previewColor({ h: 120 });
  const trackHueCyan = previewColor({ h: 180 });
  const trackHueBlue = previewColor({ h: 240 });
  const trackHuePurple = previewColor({ h: 300 });
  const trackWhitenessLeft = previewColor({ w: 0 });
  const trackWhitenessRight = previewColor({ w: 1 });
  const trackBlacknessLeft = previewColor({ b: 0 });
  const trackBlacknessRight = previewColor({ b: 1 });

  useEffect(() => {
    const currentColor = formatHwb(color);
    return () => {
      if (currentColor !== hwb.css) {
        setHwb(hwb.color);
      }
    };
  }, [color, hwb]);

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
          id="hwb-hue"
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
          aria-label="whiteness"
          type="range"
          min={0}
          max={1}
          step={focusWhiteness ? 0.01 : 0.0001}
          value={color.w}
          id="hwb-whiteness"
          className="color-slider relative z-2 text-neutral-400"
          onChange={(e) => updateColor({ w: e.target.valueAsNumber })}
          onKeyDown={() => setFocusWhiteness(true)}
          onBlur={() => focusWhiteness && setFocusWhiteness(false)}
        />
        <span
          role="presentation"
          className="pointer-events-none absolute top-1 right-0 bottom-1 left-0 z-0 rounded-md"
          style={{
            backgroundImage: `linear-gradient(to right, ${trackWhitenessLeft}, ${trackWhitenessRight})`,
          }}
        ></span>
      </div>
      <div role="none" className="relative inline-grid">
        <input
          aria-label="blackness"
          type="range"
          min={0}
          max={1}
          step={focusBlackness ? 0.01 : 0.0001}
          value={color.b}
          id="hwb-blackness"
          className="color-slider relative z-2 text-neutral-400"
          onChange={(e) => updateColor({ b: e.target.valueAsNumber })}
          onKeyDown={() => setFocusBlackness(true)}
          onBlur={() => focusBlackness && setFocusBlackness(false)}
        />
        <span
          role="presentation"
          className="pointer-events-none absolute top-1 right-0 bottom-1 left-0 z-0 rounded-md"
          style={{
            backgroundImage: `linear-gradient(to right, ${trackBlacknessLeft}, ${trackBlacknessRight})`,
          }}
        ></span>
      </div>
    </>
  );
}

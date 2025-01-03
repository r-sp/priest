"use client";

import type { HwbColor, HwbColorMode } from "~/lib/types";
import { useState, useEffect, useCallback } from "react";
import { formatHwb } from "~/lib/color";
import { useColor } from "~/app/store";

export default function InputHwb({
  onChange,
  dynamicPreview = true,
}: {
  onChange?: (color: HwbColorMode) => void;
  dynamicPreview?: boolean;
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
            backgroundImage: "var(--bg)",
          }}
        ></span>
      </div>
      <div
        role="none"
        className="relative inline-grid"
        style={{
          ["--bg" as string]: `linear-gradient(to right, ${trackWhitenessLeft}, ${trackWhitenessRight})`,
        }}
      >
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
            backgroundImage: "var(--bg)",
          }}
        ></span>
      </div>
      <div
        role="none"
        className="relative inline-grid"
        style={{
          ["--bg" as string]: `linear-gradient(to right, ${trackBlacknessLeft}, ${trackBlacknessRight})`,
        }}
      >
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
            backgroundImage: "var(--bg)",
          }}
        ></span>
      </div>
    </>
  );
}

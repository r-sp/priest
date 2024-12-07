"use client";

import { useState, useMemo } from "react";
import { useColorStore } from "./provider";
import { stringifyColor } from "~/lib/color";

export default function InputLch() {
  const { lch, setLch } = useColorStore((state) => state);
  const [color, setColor] = useState<typeof lch.color>(lch.color);

  const updateColor = (newColor: Partial<typeof lch.color>) => {
    setLch({ ...color, ...newColor });
    setColor({ ...color, ...newColor });
  };

  const previewColor = (newColor: Partial<typeof lch.color>) => {
    return stringifyColor({ mode: "lch", ...color, ...newColor });
  };

  const trackLightnessLeft = previewColor({ l: 0 });
  const trackLightnessRight = previewColor({ l: 100 });
  const trackChromaLeft = previewColor({ c: 0 });
  const trackChromaRight = previewColor({ c: 150 });
  const trackHueLeft = previewColor({ h: 0 });
  const trackHueRed = previewColor({ h: 60 });
  const trackHueGreen = previewColor({ h: 120 });
  const trackHueCenter = previewColor({ h: 180 });
  const trackHueBlue = previewColor({ h: 240 });
  const trackHuePurple = previewColor({ h: 300 });
  const trackHueRight = previewColor({ h: 360 });

  useMemo(() => {
    if (color !== lch.color) {
      setColor(lch.color);
    }
  }, [color, lch]);

  return (
    <div role="form" aria-label="lch color" className="grid gap-4">
      <div role="none" className="relative inline-grid">
        <input
          aria-label="lightness"
          type="range"
          min={0}
          max={100}
          step={0.01}
          value={color.l}
          id="lch-lightness"
          className="color-slider relative z-2 text-neutral-400"
          onChange={(e) => updateColor({ l: e.target.valueAsNumber })}
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
          max={150}
          step={0.01}
          value={color.c}
          id="lch-chroma"
          className="color-slider relative z-2 text-neutral-400"
          onChange={(e) => updateColor({ c: e.target.valueAsNumber })}
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
          step={0.01}
          value={color.h}
          id="lch-hue"
          className="color-slider relative z-2 text-neutral-400"
          onChange={(e) => updateColor({ h: e.target.valueAsNumber })}
        />
        <span
          role="presentation"
          className="pointer-events-none absolute top-1 right-0 bottom-1 left-0 z-0 rounded-md"
          style={{
            backgroundImage: `linear-gradient(to right, ${trackHueLeft}, ${trackHueRed}, ${trackHueGreen}, ${trackHueCenter}, ${trackHueBlue}, ${trackHuePurple}, ${trackHueRight})`,
          }}
        ></span>
      </div>
    </div>
  );
}

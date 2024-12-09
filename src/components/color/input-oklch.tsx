"use client";

import { type OklchColor, stringifyColor } from "~/lib/color";
import { useState, useMemo } from "react";
import { useColorStore } from "./provider";

export default function InputOklch(props: {
  onChange?: (color: OklchColor) => void;
}) {
  const { oklch, setOklch } = useColorStore((state) => state);
  const [color, setColor] = useState<OklchColor>(oklch.color);

  const updateColor = (newColor: Partial<OklchColor>) => {
    const _oklch = { ...color, ...newColor };
    setOklch(_oklch);
    setColor(_oklch);

    if (props.onChange) {
      props.onChange(_oklch);
    }
  };

  const previewColor = (newColor: Partial<OklchColor>) => {
    return stringifyColor({ mode: "oklch", ...color, ...newColor });
  };

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

  useMemo(() => {
    if (color !== oklch.color) {
      setColor(oklch.color);
    }
  }, [color, oklch]);

  return (
    <div role="form" aria-label="oklch color" className="grid gap-4">
      <div role="none" className="relative inline-grid">
        <input
          aria-label="lightness"
          type="range"
          min={0}
          max={1}
          step={0.001}
          value={color.l}
          id="oklch-lightness"
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
          max={0.4}
          step={0.001}
          value={color.c}
          id="oklch-chroma"
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
          id="oklch-hue"
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

"use client";

import { type LchColor, stringifyColor } from "~/lib/color";
import { useState, useMemo } from "react";
import { useColorStore } from "../provider";

export default function InputLch(props: {
  onChange?: (color: LchColor) => void;
  id?: string;
}) {
  const { lch, setLch } = useColorStore((state) => state);
  const [color, setColor] = useState<LchColor>(lch.color);

  const updateColor = (newColor: Partial<LchColor>) => {
    const _lch = { ...color, ...newColor };
    setLch(_lch);
    setColor(_lch);

    if (props.onChange) {
      props.onChange(_lch);
    }
  };

  const previewColor = (newColor: Partial<LchColor>) => {
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
    <div
      role="form"
      aria-label="lch color"
      className="grid gap-4"
      id={props.id ? props.id : undefined}
    >
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

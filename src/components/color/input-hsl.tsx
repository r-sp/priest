"use client";

import { useState, useMemo } from "react";
import { useColorStore } from "./provider";
import { stringifyColor } from "~/lib/color";

export default function InputHsl() {
  const { hsl, setHsl } = useColorStore((state) => state);
  const [color, setColor] = useState<typeof hsl.color>(hsl.color);

  const updateColor = (newColor: Partial<typeof hsl.color>) => {
    setHsl({ ...color, ...newColor });
    setColor({ ...color, ...newColor });
  };

  const previewColor = (newColor: Partial<typeof hsl.color>) => {
    return stringifyColor({ mode: "hsl", ...color, ...newColor });
  };

  const trackSaturationLeft = previewColor({ s: 0 });
  const trackSaturationRight = previewColor({ s: 1 });
  const trackLightnessCenter = previewColor({ s: 1, l: 0.5 });

  useMemo(() => {
    if (color !== hsl.color) {
      setColor(hsl.color);
    }
  }, [color, hsl]);

  return (
    <section
      aria-labelledby="color-hsl"
      className="mx-auto grid w-full max-w-3xl gap-4 border-t border-t-neutral-400 pt-8 dark:border-t-neutral-700"
    >
      <h2 id="color-hsl">
        <code className="text-neutral-700 dark:text-neutral-300">
          {hsl.css}
        </code>
      </h2>
      <span
        role="presentation"
        className="h-svh-1/2 inline-grid rounded-md"
        style={{ backgroundColor: hsl.css }}
      ></span>
      <div className="relative inline-grid">
        <input
          type="range"
          id="hsl-hue"
          min={0}
          max={360}
          step={0.01}
          value={color.h}
          className="color-slider relative z-2 text-neutral-400"
          onChange={(e) => updateColor({ h: e.target.valueAsNumber })}
        />
        <span
          role="presentation"
          className="pointer-events-none absolute top-1 right-0 bottom-1 left-0 z-0 rounded-md"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgb(255, 0, 0) 0%, rgb(255, 255, 0) 17%, rgb(0, 255, 0) 33%, rgb(0, 255, 255) 50%, rgb(0, 0, 255) 67%, rgb(255, 0, 255) 83%, rgb(255, 0, 0) 100%)",
          }}
        ></span>
      </div>
      <div className="relative inline-grid">
        <input
          type="range"
          id="hsl-saturation"
          min={0}
          max={1}
          step={0.0001}
          value={color.s}
          className="color-slider relative z-2 text-neutral-400"
          onChange={(e) => updateColor({ s: e.target.valueAsNumber })}
        />
        <span
          role="presentation"
          className="pointer-events-none absolute top-1 right-0 bottom-1 left-0 z-0 rounded-md"
          style={{
            backgroundImage: `linear-gradient(to right, ${trackSaturationLeft}, ${trackSaturationRight})`,
          }}
        ></span>
      </div>
      <div className="relative inline-grid">
        <input
          type="range"
          id="hsl-lightness"
          min={0}
          max={1}
          step={0.0001}
          value={color.l}
          className="color-slider relative z-2 text-neutral-400"
          onChange={(e) => updateColor({ l: e.target.valueAsNumber })}
        />
        <span
          role="presentation"
          className="pointer-events-none absolute top-1 right-0 bottom-1 left-0 z-0 rounded-md"
          style={{
            backgroundImage: `linear-gradient(to right, rgb(0,0,0), ${trackLightnessCenter}, rgb(255, 255, 255))`,
          }}
        ></span>
      </div>
    </section>
  );
}

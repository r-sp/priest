"use client";

import { useColorStore } from "./provider";
import { stringifyColor } from "~/lib/color";

export default function InputOklch() {
  const { oklch, setOklch } = useColorStore((state) => state);

  const updateColor = (newColor: Partial<typeof oklch.color>) => {
    return setOklch({ ...oklch.color, ...newColor });
  };

  const previewColor = (newColor: Partial<typeof oklch.color>) => {
    return stringifyColor({ mode: "oklch", ...oklch.color, ...newColor });
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

  return (
    <section
      aria-labelledby="color-oklch"
      className="mx-auto grid w-full max-w-3xl gap-4 border-t border-t-neutral-400 pt-8 dark:border-t-neutral-700"
    >
      <h2 id="color-oklch">
        <code className="text-neutral-700 dark:text-neutral-300">
          {oklch.css}
        </code>
      </h2>
      <span
        role="presentation"
        className="h-svh-1/2 inline-grid"
        style={{ backgroundColor: oklch.css }}
      ></span>
      <div className="relative inline-grid">
        <input
          type="range"
          id="oklch-lightness"
          min={0}
          max={1}
          step={0.001}
          value={oklch.color.l}
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
      <div className="relative inline-grid">
        <input
          type="range"
          id="oklch-chroma"
          min={0}
          max={0.4}
          step={0.001}
          value={oklch.color.c}
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
      <div className="relative inline-grid">
        <input
          type="range"
          id="oklch-hue"
          min={0}
          max={360}
          step={0.01}
          value={oklch.color.h}
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
    </section>
  );
}

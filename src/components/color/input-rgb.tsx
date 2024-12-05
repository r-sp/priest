"use client";

import { useState } from "react";
import { useColorStore } from "./provider";
import { stringifyColor } from "~/lib/color";

export default function InputRgb() {
  const { rgb, setRgb } = useColorStore((state) => state);
  const [color, setColor] = useState<typeof rgb.color>(rgb.color);

  const updateColor = (newColor: Partial<typeof rgb.color>) => {
    setRgb({ ...color, ...newColor });
    setColor({ ...color, ...newColor });
  };

  const previewColor = (newColor: Partial<typeof rgb.color>) => {
    return stringifyColor({ mode: "rgb", ...color, ...newColor });
  };

  const trackRedLeft = previewColor({ r: 0 });
  const trackRedRight = previewColor({ r: 1 });
  const trackGreenLeft = previewColor({ g: 0 });
  const trackGreenRight = previewColor({ g: 1 });
  const trackBlueLeft = previewColor({ b: 0 });
  const trackBlueRight = previewColor({ b: 1 });

  return (
    <section
      aria-labelledby="color-rgb"
      className="mx-auto grid w-full max-w-3xl gap-4 border-t border-t-neutral-400 pt-8 dark:border-t-neutral-700"
    >
      <h2 id="color-rgb">
        <code className="text-neutral-700 dark:text-neutral-300">
          {rgb.css}
        </code>
      </h2>
      <span
        role="presentation"
        className="h-svh-1/2 inline-grid"
        style={{ backgroundColor: rgb.css }}
      ></span>
      <div className="relative inline-grid">
        <input
          type="range"
          id="rgb-red"
          min={0}
          max={1}
          step={0.0045}
          value={color.r}
          className="color-slider relative z-2 text-neutral-400"
          onChange={(e) => updateColor({ r: e.target.valueAsNumber })}
        />
        <span
          role="presentation"
          className="pointer-events-none absolute top-1 right-0 bottom-1 left-0 z-0 rounded-md"
          style={{
            backgroundImage: `linear-gradient(to right, ${trackRedLeft}, ${trackRedRight})`,
          }}
        ></span>
      </div>
      <div className="relative inline-grid">
        <input
          type="range"
          id="rgb-green"
          min={0}
          max={1}
          step={0.0045}
          value={color.g}
          className="color-slider relative z-2 text-neutral-400"
          onChange={(e) => updateColor({ g: e.target.valueAsNumber })}
        />
        <span
          role="presentation"
          className="pointer-events-none absolute top-1 right-0 bottom-1 left-0 z-0 rounded-md"
          style={{
            backgroundImage: `linear-gradient(to right, ${trackGreenLeft}, ${trackGreenRight})`,
          }}
        ></span>
      </div>
      <div className="relative inline-grid">
        <input
          type="range"
          id="rgb-blue"
          min={0}
          max={1}
          step={0.0045}
          value={color.b}
          className="color-slider relative z-2 text-neutral-400"
          onChange={(e) => updateColor({ b: e.target.valueAsNumber })}
        />
        <span
          role="presentation"
          className="pointer-events-none absolute top-1 right-0 bottom-1 left-0 z-0 rounded-md"
          style={{
            backgroundImage: `linear-gradient(to right, ${trackBlueLeft}, ${trackBlueRight})`,
          }}
        ></span>
      </div>
    </section>
  );
}

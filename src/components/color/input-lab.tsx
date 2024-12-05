"use client";

import { useState } from "react";
import { useColorStore } from "./provider";
import { stringifyColor } from "~/lib/color";

export default function InputLab() {
  const { lab, setLab } = useColorStore((state) => state);
  const [color, setColor] = useState<typeof lab.color>(lab.color);

  const updateColor = (newColor: Partial<typeof lab.color>) => {
    setLab({ ...color, ...newColor });
    setColor({ ...color, ...newColor });
  };

  const previewColor = (newColor: Partial<typeof lab.color>) => {
    return stringifyColor({ mode: "lab", ...color, ...newColor });
  };

  const trackLightnessLeft = previewColor({ l: 0 });
  const trackLightnessRight = previewColor({ l: 100 });
  const trackGreenRedLeft = previewColor({ a: -100 });
  const trackGreenRedRight = previewColor({ a: 100 });
  const trackBlueYellowLeft = previewColor({ b: -100 });
  const trackBlueYellowRight = previewColor({ b: 100 });

  return (
    <section
      aria-labelledby="color-lab"
      className="mx-auto grid w-full max-w-3xl gap-4 border-t border-t-neutral-400 pt-8 dark:border-t-neutral-700"
    >
      <h2 id="color-lab">
        <code className="text-neutral-700 dark:text-neutral-300">
          {lab.css}
        </code>
      </h2>
      <span
        role="presentation"
        className="h-svh-1/2 inline-grid"
        style={{ backgroundColor: lab.css }}
      ></span>
      <div className="relative inline-grid">
        <input
          type="range"
          id="lab-lightness"
          min={0}
          max={100}
          step={0.01}
          value={color.l}
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
          id="lab-green-red"
          min={-100}
          max={100}
          step={0.01}
          value={color.a}
          className="color-slider relative z-2 text-neutral-400"
          onChange={(e) => updateColor({ a: e.target.valueAsNumber })}
        />
        <span
          role="presentation"
          className="pointer-events-none absolute top-1 right-0 bottom-1 left-0 z-0 rounded-md"
          style={{
            backgroundImage: `linear-gradient(to right, ${trackGreenRedLeft}, ${trackGreenRedRight})`,
          }}
        ></span>
      </div>
      <div className="relative inline-grid">
        <input
          type="range"
          id="lab-blue-yellow"
          min={-100}
          max={100}
          step={0.01}
          value={color.b}
          className="color-slider relative z-2 text-neutral-400"
          onChange={(e) => updateColor({ b: e.target.valueAsNumber })}
        />
        <span
          role="presentation"
          className="pointer-events-none absolute top-1 right-0 bottom-1 left-0 z-0 rounded-md"
          style={{
            backgroundImage: `linear-gradient(to right, ${trackBlueYellowLeft}, ${trackBlueYellowRight})`,
          }}
        ></span>
      </div>
    </section>
  );
}

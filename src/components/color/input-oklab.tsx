"use client";

import { useColorStore } from "./provider";
import { stringifyColor } from "~/lib/color";

export default function InputOklab() {
  const { oklab, setOklab } = useColorStore((state) => state);

  const updateColor = (newColor: Partial<typeof oklab.color>) => {
    return setOklab({ ...oklab.color, ...newColor });
  };

  const previewColor = (newColor: Partial<typeof oklab.color>) => {
    return stringifyColor({ mode: "oklab", ...oklab.color, ...newColor });
  };

  const trackLightnessLeft = previewColor({ l: 0 });
  const trackLightnessRight = previewColor({ l: 1 });
  const trackGreenRedLeft = previewColor({ a: -0.4 });
  const trackGreenRedRight = previewColor({ a: 0.4 });
  const trackBlueYellowLeft = previewColor({ b: -0.4 });
  const trackBlueYellowRight = previewColor({ b: 0.4 });

  return (
    <section
      aria-labelledby="color-oklab"
      className="mx-auto grid w-full max-w-3xl gap-4 border-t border-t-neutral-400 pt-8 dark:border-t-neutral-700"
    >
      <h2 id="color-oklab">
        <code className="text-neutral-700 dark:text-neutral-300">
          {oklab.css}
        </code>
      </h2>
      <span
        role="presentation"
        className="h-svh-1/2 inline-grid"
        style={{ backgroundColor: oklab.css }}
      ></span>
      <div className="relative inline-grid">
        <input
          type="range"
          id="oklab-lightness"
          min={0}
          max={1}
          step={0.001}
          value={oklab.color.l}
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
          id="oklab-green-red"
          min={-0.4}
          max={0.4}
          step={0.001}
          value={oklab.color.a}
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
          id="oklab-blue-yellow"
          min={-0.4}
          max={0.4}
          step={0.001}
          value={oklab.color.b}
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

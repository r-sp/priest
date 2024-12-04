"use client";

import { useState } from "react";
import { Oklab, Css, Hex } from "~/lib/color";

export default function InputOklab() {
  const [color, setColor] = useState({ l: 0.85, a: -0.15, b: 0.11 });

  const input = Oklab(color);
  const css = Css(input);
  const hex = Hex(css);

  const trackLightnessLeft = Css(Oklab({ ...color, l: 0 }));
  const trackLightnessRight = Css(Oklab({ ...color, l: 1 }));
  const trackGreenRedLeft = Css(Oklab({ ...color, a: -0.4 }));
  const trackGreenRedRight = Css(Oklab({ ...color, a: 0.4 }));
  const trackBlueYellowLeft = Css(Oklab({ ...color, b: -0.4 }));
  const trackBlueYellowRight = Css(Oklab({ ...color, b: 0.4 }));

  return (
    <section
      aria-labelledby="color-oklab"
      className="mx-auto grid w-full max-w-3xl gap-4 border-t border-t-neutral-400 pt-8 dark:border-t-neutral-700"
    >
      <h2 id="color-oklab">
        <code>
          <span className="text-neutral-700 dark:text-neutral-300">{css}</span>{" "}
          | <span>{hex}</span>
        </code>
      </h2>
      <span
        role="presentation"
        className="h-svh-1/2 inline-grid"
        style={{ backgroundColor: css }}
      ></span>
      <div className="relative inline-grid">
        <input
          type="range"
          id="oklab-lightness"
          min={0}
          max={1}
          step={0.001}
          value={color.l}
          className="color-slider relative z-2 text-neutral-400"
          onChange={(e) => setColor({ ...color, l: e.target.valueAsNumber })}
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
          value={color.a}
          className="color-slider relative z-2 text-neutral-400"
          onChange={(e) => setColor({ ...color, a: e.target.valueAsNumber })}
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
          value={color.b}
          className="color-slider relative z-2 text-neutral-400"
          onChange={(e) => setColor({ ...color, b: e.target.valueAsNumber })}
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

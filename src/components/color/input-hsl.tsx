"use client";

import { useState } from "react";
import { Hsl, Css, Hex } from "~/lib/color";

export default function InputHsl() {
  const [color, setColor] = useState({ h: 119.5, s: 0.7595, l: 0.6902 });

  const input = Hsl(color);
  const css = Css(input);
  const hex = Hex(css);

  const trackSaturationLeft = Css(Hsl({ ...color, s: 0 }));
  const trackSaturationRight = Css(Hsl({ ...color, s: 1 }));
  const trackLightnessCenter = Css(Hsl({ ...color, s: 1, l: 0.5 }));

  return (
    <section
      aria-labelledby="color-hsl"
      className="mx-auto grid w-full max-w-3xl gap-4 border-t border-t-neutral-400 pt-8 dark:border-t-neutral-700"
    >
      <h2 id="color-hsl">
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
          id="hsl-hue"
          min={0}
          max={360}
          step={0.01}
          value={color.h}
          className="color-slider relative z-2 text-neutral-400"
          onChange={(e) => setColor({ ...color, h: e.target.valueAsNumber })}
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
          onChange={(e) => setColor({ ...color, s: e.target.valueAsNumber })}
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
          onChange={(e) => setColor({ ...color, l: e.target.valueAsNumber })}
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

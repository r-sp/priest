"use client";

import { useState } from "react";
import { Rgb, Css, Hex } from "~/lib/color";

export default function InputRgb() {
  const [color, setColor] = useState({ r: 0.457, g: 0.927, b: 0.456 });

  const input = Rgb(color);
  const css = Css(input);
  const hex = Hex(css);

  const trackRedLeft = Css(Rgb({ ...color, r: 0 }));
  const trackRedRight = Css(Rgb({ ...color, r: 255 }));
  const trackGreenLeft = Css(Rgb({ ...color, g: 0 }));
  const trackGreenRight = Css(Rgb({ ...color, g: 255 }));
  const trackBlueLeft = Css(Rgb({ ...color, b: 0 }));
  const trackBlueRight = Css(Rgb({ ...color, b: 255 }));

  return (
    <section
      aria-labelledby="color-rgb"
      className="mx-auto grid w-full max-w-3xl gap-4 border-t border-t-neutral-400 pt-8 dark:border-t-neutral-700"
    >
      <h2 id="color-rgb">
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
          id="rgb-red"
          min={0}
          max={1}
          step={0.001}
          value={color.r}
          className="color-slider relative z-2 text-neutral-400"
          onChange={(e) => setColor({ ...color, r: e.target.valueAsNumber })}
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
          step={0.001}
          value={color.g}
          className="color-slider relative z-2 text-neutral-400"
          onChange={(e) => setColor({ ...color, g: e.target.valueAsNumber })}
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
          step={0.001}
          value={color.b}
          className="color-slider relative z-2 text-neutral-400"
          onChange={(e) => setColor({ ...color, b: e.target.valueAsNumber })}
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

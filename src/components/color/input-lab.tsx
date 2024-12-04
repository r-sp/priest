"use client";

import { useState } from "react";
import { Lab, Css, Hex } from "~/lib/color";

export default function InputLab() {
  const [color, setColor] = useState({ l: 85, a: -52.74, b: 46.91 });

  const input = Lab(color);
  const css = Css(input);
  const hex = Hex(css);

  const trackLightnessLeft = Css(Lab({ ...color, l: 0 }));
  const trackLightnessRight = Css(Lab({ ...color, l: 100 }));
  const trackGreenRedLeft = Css(Lab({ ...color, a: -100 }));
  const trackGreenRedRight = Css(Lab({ ...color, a: 100 }));
  const trackBlueYellowLeft = Css(Lab({ ...color, b: -100 }));
  const trackBlueYellowRight = Css(Lab({ ...color, b: 100 }));

  return (
    <section
      aria-labelledby="color-lab"
      className="mx-auto grid w-full max-w-3xl gap-4 border-t border-t-neutral-400 pt-8 dark:border-t-neutral-700"
    >
      <h2 id="color-lab">
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
          id="lab-lightness"
          min={0}
          max={100}
          step={0.01}
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
          id="lab-green-red"
          min={-100}
          max={100}
          step={0.01}
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
          id="lab-blue-yellow"
          min={-100}
          max={100}
          step={0.01}
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

"use client";

import { useState } from "react";
import { Oklch, Css, Hex } from "~/lib/color";

export default function InputOklch() {
  const [color, setColor] = useState({ l: 0.85, c: 0.19, h: 143.48 });

  const format = Oklch(color);
  const css = Css(format);
  const hex = Hex(css);

  const trackLightnessLeft = Css(Oklch({ ...color, l: 0 }));
  const trackLightnessRight = Css(Oklch({ ...color, l: 1 }));
  const trackChromaLeft = Css(Oklch({ ...color, c: 0 }));
  const trackChromaRight = Css(Oklch({ ...color, c: 0.4 }));
  const trackHueLeft = Css(Oklch({ ...color, h: 0 }));
  const trackHueRed = Css(Oklch({ ...color, h: 60 }));
  const trackHueGreen = Css(Oklch({ ...color, h: 120 }));
  const trackHueCenter = Css(Oklch({ ...color, h: 180 }));
  const trackHueBlue = Css(Oklch({ ...color, h: 240 }));
  const trackHuePurple = Css(Oklch({ ...color, h: 300 }));
  const trackHueRight = Css(Oklch({ ...color, h: 360 }));

  return (
    <section
      aria-labelledby="color-oklch"
      className="mx-auto grid w-full max-w-3xl gap-4 border-t border-t-neutral-400 pt-8 dark:border-t-neutral-700"
    >
      <h2 id="color-oklch">
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
          id="oklch-lightness"
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
          id="oklch-chroma"
          min={0}
          max={0.4}
          step={0.001}
          value={color.c}
          className="color-slider relative z-2 text-neutral-400"
          onChange={(e) => setColor({ ...color, c: e.target.valueAsNumber })}
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
          value={color.h}
          className="color-slider relative z-2 text-neutral-400"
          onChange={(e) => setColor({ ...color, h: e.target.valueAsNumber })}
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

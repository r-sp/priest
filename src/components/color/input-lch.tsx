"use client";

import { useState } from "react";
import { Lch, Css, Hex } from "~/lib/color";

export default function InputLch() {
  const [color, setColor] = useState({ l: 85, c: 69.47, h: 138.42 });

  const input = Lch(color);
  const css = Css(input);
  const hex = Hex(css);

  const trackLightnessLeft = Css(Lch({ ...color, l: 0 }));
  const trackLightnessRight = Css(Lch({ ...color, l: 100 }));
  const trackChromaLeft = Css(Lch({ ...color, c: 0 }));
  const trackChromaRight = Css(Lch({ ...color, c: 150 }));
  const trackHueLeft = Css(Lch({ ...color, h: 0 }));
  const trackHueRed = Css(Lch({ ...color, h: 60 }));
  const trackHueGreen = Css(Lch({ ...color, h: 120 }));
  const trackHueCenter = Css(Lch({ ...color, h: 180 }));
  const trackHueBlue = Css(Lch({ ...color, h: 240 }));
  const trackHuePurple = Css(Lch({ ...color, h: 300 }));
  const trackHueRight = Css(Lch({ ...color, h: 360 }));

  return (
    <section
      aria-labelledby="color-lch"
      className="mx-auto grid w-full max-w-3xl gap-4 border-t border-t-neutral-400 pt-8 dark:border-t-neutral-700"
    >
      <h2 id="color-lch">
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
          id="lch-lightness"
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
          id="lch-chroma"
          min={0}
          max={150}
          step={0.01}
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
          id="lch-hue"
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

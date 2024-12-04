"use client";

import { useState } from "react";
import { hsl, formatHsl, formatHex } from "culori";

export default function InputHsl() {
  const [color, setColor] = useState({ h: 119.5, s: 0.7595, l: 0.6902 });

  const input = hsl({ mode: "hsl", ...color });
  const css = formatHsl(input);
  const hex = formatHex(css);

  return (
    <section
      aria-labelledby="color-hsl"
      className="mx-auto grid w-full max-w-3xl gap-4 border-t border-t-neutral-400 pt-8"
    >
      <h2 id="color-hsl">
        <code>
          <span className="text-neutral-700">{css}</span> | <span>{hex}</span>
        </code>
      </h2>
      <div className="inline-grid h-64" style={{ backgroundColor: css }}></div>
      <div className="inline-grid">
        <input
          type="range"
          id="hsl-hue"
          min={0}
          max={360}
          step={0.01}
          value={color.h}
          onChange={(e) => setColor({ ...color, h: e.target.valueAsNumber })}
        />
      </div>
      <div className="inline-grid">
        <input
          type="range"
          id="hsl-saturation"
          min={0}
          max={1}
          step={0.0001}
          value={color.s}
          onChange={(e) => setColor({ ...color, s: e.target.valueAsNumber })}
        />
      </div>
      <div className="inline-grid">
        <input
          type="range"
          id="hsl-lightness"
          min={0}
          max={1}
          step={0.0001}
          value={color.l}
          onChange={(e) => setColor({ ...color, l: e.target.valueAsNumber })}
        />
      </div>
    </section>
  );
}

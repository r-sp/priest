"use client";

import { useState } from "react";
import { oklch, formatCss, formatHex } from "culori";

export default function InputOklch() {
  const [color, setColor] = useState({ l: 0.85, c: 0.19, h: 143.48 });

  const format = oklch({ mode: "oklch", ...color });
  const css = formatCss(format);
  const hex = formatHex(css);

  return (
    <section
      aria-labelledby="color-oklch"
      className="mx-auto grid w-full max-w-3xl gap-4 border-t border-t-neutral-400 pt-8"
    >
      <h2 id="color-oklch">
        <code>
          <span className="text-neutral-700">{css}</span> | <span>{hex}</span>
        </code>
      </h2>
      <div className="inline-grid h-64" style={{ backgroundColor: css }}></div>
      <div className="inline-grid">
        <input
          type="range"
          id="oklch-lightness"
          min={0}
          max={1}
          step={0.001}
          value={color.l}
          onChange={(e) => setColor({ ...color, l: e.target.valueAsNumber })}
        />
      </div>
      <div className="inline-grid">
        <input
          type="range"
          id="oklch-chroma"
          min={0}
          max={0.4}
          step={0.001}
          value={color.c}
          onChange={(e) => setColor({ ...color, c: e.target.valueAsNumber })}
        />
      </div>
      <div className="inline-grid">
        <input
          type="range"
          id="oklch-hue"
          min={0}
          max={360}
          step={0.01}
          value={color.h}
          onChange={(e) => setColor({ ...color, h: e.target.valueAsNumber })}
        />
      </div>
    </section>
  );
}

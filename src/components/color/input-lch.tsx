"use client";

import { useState } from "react";
import { lch, formatCss, formatHex } from "culori";

export default function InputLch() {
  const [color, setColor] = useState({ l: 85, c: 69.47, h: 138.42 });

  const format = lch({ mode: "lch", ...color });
  const css = formatCss(format);
  const hex = formatHex(css);

  return (
    <section
      aria-labelledby="color-lch"
      className="mx-auto grid w-full max-w-3xl gap-4 border-t border-t-neutral-400 pt-8"
    >
      <h2 id="color-lch">
        <code>
          <span className="text-neutral-700">{css}</span> | <span>{hex}</span>
        </code>
      </h2>
      <div className="inline-grid h-64" style={{ backgroundColor: css }}></div>
      <div className="inline-grid">
        <input
          type="range"
          id="lch-lightness"
          min={0}
          max={100}
          step={0.01}
          value={color.l}
          onChange={(e) => setColor({ ...color, l: e.target.valueAsNumber })}
        />
      </div>
      <div className="inline-grid">
        <input
          type="range"
          id="lch-chroma"
          min={0}
          max={150}
          step={0.01}
          value={color.c}
          onChange={(e) => setColor({ ...color, c: e.target.valueAsNumber })}
        />
      </div>
      <div className="inline-grid">
        <input
          type="range"
          id="lch-hue"
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

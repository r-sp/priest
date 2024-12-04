"use client";

import { useState } from "react";
import { oklab, formatCss, formatHex } from "culori";

export default function InputOklab() {
  const [color, setColor] = useState({ l: 0.85, a: -0.15, b: 0.11 });

  const input = oklab({ mode: "oklab", ...color });
  const css = formatCss(input);
  const hex = formatHex(css);

  return (
    <section
      aria-labelledby="color-oklab"
      className="mx-auto grid w-full max-w-3xl gap-4 border-t border-t-neutral-400 pt-8"
    >
      <h2 id="color-oklab">
        <code>
          <span className="text-neutral-700">{css}</span> | <span>{hex}</span>
        </code>
      </h2>
      <div className="inline-grid h-64" style={{ backgroundColor: css }}></div>
      <div className="inline-grid">
        <input
          type="range"
          id="oklab-lightness"
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
          id="oklab-green-red"
          min={-0.4}
          max={0.4}
          step={0.001}
          value={color.a}
          onChange={(e) => setColor({ ...color, a: e.target.valueAsNumber })}
        />
      </div>
      <div className="inline-grid">
        <input
          type="range"
          id="oklab-green-yellow"
          min={-0.4}
          max={0.4}
          step={0.001}
          value={color.b}
          onChange={(e) => setColor({ ...color, b: e.target.valueAsNumber })}
        />
      </div>
    </section>
  );
}

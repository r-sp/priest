"use client";

import { useState } from "react";
import { rgb, formatRgb, formatHex } from "culori";

export default function InputRgb() {
  const [color, setColor] = useState({ r: 0.457, g: 0.927, b: 0.456 });

  const input = rgb({ mode: "rgb", ...color });
  const css = formatRgb(input);
  const hex = formatHex(css);

  return (
    <section
      aria-labelledby="color-rgb"
      className="mx-auto grid w-full max-w-3xl gap-4 border-t border-t-neutral-400 pt-8"
    >
      <h2 id="color-rgb">
        <code>
          <span className="text-neutral-700">{css}</span> | <span>{hex}</span>
        </code>
      </h2>
      <div className="inline-grid h-64" style={{ backgroundColor: css }}></div>
      <div className="inline-grid">
        <input
          type="range"
          id="rgb-red"
          min={0}
          max={1}
          step={0.001}
          value={color.r}
          onChange={(e) => setColor({ ...color, r: e.target.valueAsNumber })}
        />
      </div>
      <div className="inline-grid">
        <input
          type="range"
          id="rgb-green"
          min={0}
          max={1}
          step={0.001}
          value={color.g}
          onChange={(e) => setColor({ ...color, g: e.target.valueAsNumber })}
        />
      </div>
      <div className="inline-grid">
        <input
          type="range"
          id="rgb-blue"
          min={0}
          max={1}
          step={0.001}
          value={color.b}
          onChange={(e) => setColor({ ...color, b: e.target.valueAsNumber })}
        />
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { lab, formatCss, formatHex } from "culori";

export default function InputLab() {
  const [color, setColor] = useState({ l: 85, a: -52.74, b: 46.91 });

  const input = lab({ mode: "lab", ...color });
  const css = formatCss(input);
  const hex = formatHex(css);

  return (
    <section
      aria-labelledby="color-lab"
      className="mx-auto grid w-full max-w-3xl gap-4 border-t border-t-neutral-400 pt-8"
    >
      <h2 id="color-lab">
        <code>
          <span className="text-neutral-700">{css}</span> | <span>{hex}</span>
        </code>
      </h2>
      <div className="inline-grid h-64" style={{ backgroundColor: css }}></div>
      <div className="inline-grid">
        <input
          type="range"
          id="lab-lightness"
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
          id="lab-green-red"
          min={-100}
          max={100}
          step={0.01}
          value={color.a}
          onChange={(e) => setColor({ ...color, a: e.target.valueAsNumber })}
        />
      </div>
      <div className="inline-grid">
        <input
          type="range"
          id="lab-green-yellow"
          min={-100}
          max={100}
          step={0.01}
          value={color.b}
          onChange={(e) => setColor({ ...color, b: e.target.valueAsNumber })}
        />
      </div>
    </section>
  );
}

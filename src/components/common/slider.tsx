"use client";

import type { ComponentPropsWithoutRef } from "react";
import { useState } from "react";

export default function Slider({
  prefix,
  label,
  gradient,
  stepMin,
  stepMax,
  ...props
}: {
  prefix: string;
  label: string;
  gradient: string;
  stepMin: number;
  stepMax?: number;
} & ComponentPropsWithoutRef<"input">) {
  const [focus, setFocus] = useState<boolean>(false);

  return (
    <div
      role="none"
      style={{ ["--bg" as string]: `linear-gradient(135deg,${gradient})` }}
      className="relative inline-grid"
    >
      <input
        aria-label={label}
        type="range"
        id={`${prefix}-${label}`}
        className="slider relative z-2 text-gray-400"
        step={stepMax ? (focus ? stepMin : stepMax) : stepMin}
        onKeyDown={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        {...props}
      />
      <span
        role="presentation"
        className="bg-gradient-ref pointer-events-none absolute top-1 right-0 bottom-1 left-0 z-0 rounded-md"
      ></span>
    </div>
  );
}

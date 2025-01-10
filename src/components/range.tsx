"use client";

import type { ComponentPropsWithoutRef } from "react";
import { useState } from "react";
import Inline from "./inline";

export default function Range({
  prefix,
  label,
  color,
  stepMin,
  stepMax,
  ...props
}: {
  prefix: string;
  label: string;
  color: string;
  stepMin: number;
  stepMax?: number;
} & ComponentPropsWithoutRef<"input">) {
  const [focus, setFocus] = useState<boolean>(false);

  return (
    <Inline
      rel="none"
      className="relative inline-grid"
      bg={`linear-gradient(to right, ${color})`}
    >
      <input
        aria-label={label}
        type="range"
        id={`${prefix}-${label}`}
        className="slider relative z-2 text-neutral-400"
        step={stepMax ? (focus ? stepMin : stepMax) : stepMin}
        onKeyDown={() => setFocus(true)}
        onBlur={() => focus && setFocus(false)}
        {...props}
      />
      <span
        role="presentation"
        className="bg-gradient-ref pointer-events-none absolute top-1 right-0 bottom-1 left-0 z-0 rounded-md"
      ></span>
    </Inline>
  );
}

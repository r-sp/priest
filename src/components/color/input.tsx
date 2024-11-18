"use client";

import { useState, useRef } from "react";
import { type ColorInputProps } from "./types";

export default function Input({ value, update, focus, leave, ...rest }: ColorInputProps) {
  const [color, setColor] = useState<typeof value>(value);
  const ref = useRef<boolean>(false);

  if (color !== value && ref.current === false) {
    setColor(value);
  }

  return (
    <input
      value={color}
      onChange={(e) => {
        setColor(e.target.value);
        if (update) {
          update(e);
        }
      }}
      onFocus={(e) => {
        ref.current = true;
        if (focus) {
          focus(e);
        }
      }}
      onBlur={(e) => {
        ref.current = false;
        if (leave) {
          leave(e);
        }
      }}
      {...rest}
    />
  );
}

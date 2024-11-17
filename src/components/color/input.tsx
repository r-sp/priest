"use client";

import { useState, useRef } from "react";
import type { ChangeEventHandler, ComponentPropsWithoutRef } from "react";

export default function ColorInput({
  value,
  update,
  focus,
  leave,
  ...rest
}: {
  update?: ChangeEventHandler<HTMLInputElement>;
  focus?: ChangeEventHandler<HTMLInputElement>;
  leave?: ChangeEventHandler<HTMLInputElement>;
} & ComponentPropsWithoutRef<"input">) {
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

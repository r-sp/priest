"use client";

import { useState, useRef } from "react";
import type { ChangeEventHandler, ComponentPropsWithoutRef } from "react";

export default function Input({
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
  const [currentValue, setCurrentValue] = useState<typeof value>(value);
  const ref = useRef<boolean>(false);

  if (currentValue !== value && ref.current === false) {
    setCurrentValue(value);
  }

  return (
    <input
      value={currentValue}
      onChange={(e) => {
        setCurrentValue(e.target.value);
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

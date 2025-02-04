"use client";

import type { ComponentPropsWithoutRef } from "react";
import type { SessionHue } from "~/types/session";
import { useSession } from "~/hooks";
import { useMemo } from "react";
import clsx from "clsx";

export default function ColorHue() {
  const session: SessionHue = useSession((state) => [state.hue, state.setHue]);
  const [hue, setHue] = useMemo(() => session, [session]);

  const { base, min, max } = hue;

  const fixupHue = (value: number): number => {
    return isNaN(value) ? 0 : value;
  };

  return (
    <div
      role="group"
      aria-label="color hue"
      id="color-hue"
      className="flex justify-between gap-4 border-t border-t-gray-200 pt-6 max-[20rem]:flex-col dark:border-t-gray-800"
    >
      <ColorValue
        label="Hue Base"
        id="color-hue-base"
        value={base}
        onChange={(e) =>
          setHue({ ...hue, base: fixupHue(e.target.valueAsNumber) })
        }
      />
      <ColorValue
        label="Min"
        id="color-hue-min"
        value={min}
        onChange={(e) =>
          setHue({ ...hue, min: fixupHue(e.target.valueAsNumber) })
        }
      />
      <ColorValue
        label="Max"
        id="color-hue-max"
        value={max}
        onChange={(e) =>
          setHue({ ...hue, max: fixupHue(e.target.valueAsNumber) })
        }
      />
    </div>
  );
}

interface ColorInput extends ComponentPropsWithoutRef<"input"> {
  label: string;
}

function ColorValue({ label, id, value, ...props }: ColorInput) {
  return (
    <div role="none" className="inline-flex w-full flex-col gap-y-2">
      <label
        aria-hidden="true"
        role="presentation"
        className="text-sm text-gray-700 dark:text-gray-300"
        htmlFor={id}
      >
        {label}
      </label>
      <div role="none" className="relative z-0 inline-grid h-10">
        <input
          type="number"
          aria-label={label.toLowerCase()}
          value={value}
          min={0}
          max={360}
          id={id}
          className={clsx(
            "absolute top-0 right-0 bottom-0 left-0 inline-grid rounded-md py-2 pr-2 pl-4 font-mono ring outline-0",
            "cursor-pointer bg-gray-100 text-gray-600 ring-gray-200 dark:bg-gray-900 dark:text-gray-400 dark:ring-gray-800",
            "focus:cursor-text focus:text-gray-700 focus:ring-gray-300 dark:focus:text-gray-300 dark:focus:ring-gray-700",
          )}
          {...props}
        />
      </div>
    </div>
  );
}

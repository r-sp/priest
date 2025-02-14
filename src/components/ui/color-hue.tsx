"use client";

import type { ComponentPropsWithoutRef } from "react";
import type { SessionHue } from "~/types/session";
import { useMemo, useCallback } from "react";
import { useSession } from "~/hooks";
import { Icon } from "../common";
import clsx from "clsx";

export default function ColorHue() {
  const session: SessionHue = useSession((state) => [state.hue, state.setHue]);
  const [hue, setHue] = useMemo(() => session, [session]);

  const { base, min, max } = hue;

  const fixupHue = (value: number): number => {
    return isNaN(value) ? 0 : value;
  };

  const getBase = fixupHue(base);
  const getMin = fixupHue(min);
  const getMax = fixupHue(max);

  const updateHue = useCallback(
    (color: Partial<typeof hue>) => {
      setHue({ ...hue, ...color });
    },
    [hue, setHue],
  );

  return (
    <div
      role="group"
      aria-label="color hue"
      id="color-hue"
      className="mx-auto flex w-full max-w-128 justify-between gap-4 max-[20rem]:flex-col"
    >
      <AdjustHue
        label="Hue Base"
        id="base"
        value={getBase}
        min={15}
        max={getMax / 5}
        increase={(e) => updateHue({ base: e })}
        decrease={(e) => updateHue({ base: e })}
        onChange={(e) => updateHue({ base: e.target.valueAsNumber })}
      />
      <AdjustHue
        label="Min"
        id="min"
        value={getMin}
        min={0}
        max={getBase * 5}
        step={getBase}
        increase={(e) => updateHue({ min: e })}
        decrease={(e) => updateHue({ min: e })}
        onChange={(e) => updateHue({ min: e.target.valueAsNumber })}
      />
      <AdjustHue
        label="Max"
        id="max"
        value={getMax}
        min={getMin}
        max={360}
        step={getBase}
        increase={(e) => updateHue({ max: e })}
        decrease={(e) => updateHue({ max: e })}
        onChange={(e) => updateHue({ max: e.target.valueAsNumber })}
      />
    </div>
  );
}

interface Props extends ComponentPropsWithoutRef<"input"> {
  label: string;
  value: number;
  step?: number;
  increase: (hue: number) => void;
  decrease: (hue: number) => void;
}

function AdjustHue({
  label,
  id,
  value,
  step,
  increase,
  decrease,
  ...props
}: Props) {
  const maxHue = 360;
  const minHue = 0;
  const multiplier = step ? value + step : value + 1;
  const reducer = step ? value - step : value - 1;

  return (
    <div role="none" className="inline-flex w-full flex-col gap-y-2">
      <label
        aria-hidden="true"
        role="presentation"
        className="text-sm text-gray-700 dark:text-gray-300"
        htmlFor={`color-hue-${id}`}
      >
        {label}
      </label>
      <div role="none" className="relative z-0 inline-grid h-10">
        <input
          type="number"
          aria-label={`hue ${id}`}
          value={value}
          id={`color-hue-${id}`}
          className={clsx(
            "spinner absolute top-0 right-0 bottom-0 left-0 inline-grid rounded-md py-2 pr-2 pl-4 font-mono ring outline-0",
            "cursor-pointer bg-gray-100 text-gray-600 ring-gray-200 dark:bg-gray-900 dark:text-gray-400 dark:ring-gray-800",
            "focus:cursor-text focus:text-gray-700 focus:ring-gray-300 dark:focus:text-gray-300 dark:focus:ring-gray-700",
          )}
          {...props}
        />
        <div
          role="none"
          className="pointer-events-none absolute top-0 right-0 bottom-0 z-1 flex flex-col rounded-r-md bg-gradient-to-r from-gray-950/0 to-gray-100 dark:to-gray-900"
        >
          <button
            aria-label={`increase ${id} hue`}
            className={clsx(
              "inline-flex h-5 w-8 cursor-pointer items-end justify-center text-gray-600 dark:text-gray-400",
              value === maxHue || value > maxHue
                ? "pointer-events-none opacity-50"
                : "pointer-events-auto",
            )}
            tabIndex={-1}
            onClick={() => {
              if (value < maxHue) {
                increase(multiplier > maxHue ? maxHue : multiplier);
              }
            }}
          >
            <Icon
              size="12"
              type="arrow-up"
              className="pointer-events-none size-3"
            />
          </button>
          <button
            aria-label={`decrease ${id} hue`}
            className={clsx(
              "inline-flex h-5 w-8 cursor-pointer items-start justify-center text-gray-600 dark:text-gray-400",
              value === minHue || value < minHue
                ? "pointer-events-none opacity-50"
                : "pointer-events-auto",
            )}
            tabIndex={-1}
            onClick={() => {
              if (value > minHue) {
                decrease(reducer < minHue ? minHue : reducer);
              }
            }}
          >
            <Icon
              size="12"
              type="arrow-down"
              className="pointer-events-none size-3"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

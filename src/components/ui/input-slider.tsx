"use client";

import type { ComponentPropsWithoutRef } from "react";
import type { SessionSlider } from "~/types/session";
import type { ColorFormat, ColorLabel } from "~/types/color";
import { useState, useMemo } from "react";
import { useSession } from "~/hooks";
import { createRange, createTracks } from "~/utils";

interface Props {
  dynamic?: boolean;
}

export default function InputSlider({ dynamic = true }: Props) {
  const session: SessionSlider = useSession((state) => [
    state.color,
    state.setColor,
  ]);
  const [color, setColor] = useMemo(() => session, [session]);

  const [focusStart, setFocusStart] = useState<boolean>(false);
  const [focusMiddle, setFocusMiddle] = useState<boolean>(false);
  const [focusEnd, setFocusEnd] = useState<boolean>(false);

  const [startRange, middleRange, endRange] = createRange(color);
  const [startTrack, middleTrack, endTrack] = createTracks(color, dynamic);

  const mode = color.mode;
  const values = Object.values(color) as [typeof mode, number, number, number];

  return (
    <div
      role="group"
      aria-label={`${mode} slider`}
      id={`${mode}-slider`}
      className="grid gap-y-3"
    >
      <Slider
        mode={mode}
        label={startRange.label}
        gradient={startTrack}
        value={values[1]}
        min={startRange.min}
        max={startRange.max}
        step={
          startRange.decimal
            ? focusStart
              ? startRange.base
              : startRange.decimal
            : startRange.base
        }
        onChange={(e) =>
          startRange.update(e.target.valueAsNumber, color, setColor)
        }
        onKeyDown={() => setFocusStart(true)}
        onBlur={() => setFocusStart(false)}
      />
      <Slider
        mode={mode}
        label={middleRange.label}
        gradient={middleTrack}
        value={values[2]}
        min={middleRange.min}
        max={middleRange.max}
        step={
          middleRange.decimal
            ? focusMiddle
              ? middleRange.base
              : middleRange.decimal
            : middleRange.base
        }
        onChange={(e) =>
          middleRange.update(e.target.valueAsNumber, color, setColor)
        }
        onKeyDown={() => setFocusMiddle(true)}
        onBlur={() => setFocusMiddle(false)}
      />
      <Slider
        mode={mode}
        label={endRange.label}
        gradient={endTrack}
        value={values[3]}
        min={endRange.min}
        max={endRange.max}
        step={
          endRange.decimal
            ? focusEnd
              ? endRange.base
              : endRange.decimal
            : endRange.base
        }
        onChange={(e) =>
          endRange.update(e.target.valueAsNumber, color, setColor)
        }
        onKeyDown={() => setFocusEnd(true)}
        onBlur={() => setFocusEnd(false)}
      />
    </div>
  );
}

interface ColorSlider extends ComponentPropsWithoutRef<"input"> {
  mode: ColorFormat;
  label: ColorLabel;
  gradient: string;
}

function Slider({ mode, label, gradient, ...props }: ColorSlider) {
  return (
    <div
      role="none"
      className="relative z-0 inline-grid"
      style={{ ["--bg" as string]: `linear-gradient(135deg, ${gradient})` }}
    >
      <input
        type="range"
        aria-label={label}
        id={`${mode}-${label}`}
        className="slider relative z-2 h-5 rounded-xl text-gray-300 dark:text-gray-200"
        {...props}
      />
      <span
        role="presentation"
        className="bg-gradient-ref pointer-events-none absolute top-0.75 right-0 bottom-0.75 left-0 z-0 rounded-lg"
      ></span>
    </div>
  );
}

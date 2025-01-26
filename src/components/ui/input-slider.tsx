"use client";

import type { AnyColorMode } from "~/lib/color";
import { useState, useMemo } from "react";
import { createRange, createTracks } from "~/lib/tracks";

export default function InputSlider({
  color,
  action,
  dynamic,
}: {
  color: AnyColorMode;
  action: (store: AnyColorMode) => void;
  dynamic: boolean;
}) {
  const [focusStart, setFocusStart] = useState<boolean>(false);
  const [focusMiddle, setFocusMiddle] = useState<boolean>(false);
  const [focusEnd, setFocusEnd] = useState<boolean>(false);

  const colorRange = useMemo(() => createRange(color), [color]);
  const [startRange, middleRange, endRange] = colorRange;

  const colorTrack = useMemo(
    () => createTracks(color, dynamic),
    [color, dynamic],
  );
  const [startTrack, middleTrack, endTrack] = colorTrack;

  return (
    <div
      role="group"
      aria-label={`${color.mode} slider`}
      id={`${color.mode}-slider`}
      className="grid gap-y-3"
    >
      <div
        role="none"
        className="relative z-0 inline-grid"
        style={{ ["--bg" as string]: `linear-gradient(135deg, ${startTrack})` }}
      >
        <input
          type="range"
          aria-label={startRange.label}
          id={`${color.mode}-${startRange.label}`}
          className="slider relative z-2 text-gray-400"
          value={Object.values(color)[1]}
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
            startRange.update(e.target.valueAsNumber, color, action)
          }
          onKeyDown={() => setFocusStart(true)}
          onBlur={() => setFocusStart(true)}
        />
        <span
          role="presentation"
          className="bg-gradient-ref pointer-events-none absolute top-1 right-0 bottom-1 left-0 z-0 rounded-md"
        ></span>
      </div>
      <div
        role="none"
        className="relative z-0 inline-grid"
        style={{
          ["--bg" as string]: `linear-gradient(135deg, ${middleTrack})`,
        }}
      >
        <input
          type="range"
          aria-label={middleRange.label}
          id={`${color.mode}-${middleRange.label}`}
          className="slider relative z-2 text-gray-400"
          value={Object.values(color)[2]}
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
            middleRange.update(e.target.valueAsNumber, color, action)
          }
          onKeyDown={() => setFocusMiddle(true)}
          onBlur={() => setFocusMiddle(true)}
        />
        <span
          role="presentation"
          className="bg-gradient-ref pointer-events-none absolute top-1 right-0 bottom-1 left-0 z-0 rounded-md"
        ></span>
      </div>
      <div
        role="none"
        className="relative z-0 inline-grid"
        style={{ ["--bg" as string]: `linear-gradient(135deg, ${endTrack})` }}
      >
        <input
          type="range"
          aria-label={endRange.label}
          id={`${color.mode}-${endRange.label}`}
          className="slider relative z-2 text-gray-400"
          value={Object.values(color)[3]}
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
            endRange.update(e.target.valueAsNumber, color, action)
          }
          onKeyDown={() => setFocusEnd(true)}
          onBlur={() => setFocusEnd(true)}
        />
        <span
          role="presentation"
          className="bg-gradient-ref pointer-events-none absolute top-1 right-0 bottom-1 left-0 z-0 rounded-md"
        ></span>
      </div>
    </div>
  );
}

"use client";

import { SessionSlider } from "~/types/session";
import { useState, useMemo, useCallback } from "react";
import { useSession } from "~/hooks";
import { createColor, createHue, createRange, createTracks } from "~/utils";

interface Props {
  dynamic?: boolean;
}

export default function InputSlider({ dynamic = true }: Props) {
  const session: SessionSlider = useSession((state) => [
    state.color,
    state.mode,
    state.setColor,
    state.setHue,
  ]);
  const [color, mode, setColor, setHue] = useMemo(() => session, [session]);

  const [focusStart, setFocusStart] = useState<boolean>(false);
  const [focusMiddle, setFocusMiddle] = useState<boolean>(false);
  const [focusEnd, setFocusEnd] = useState<boolean>(false);

  const [startRange, middleRange, endRange] = useMemo(
    () => createRange(color),
    [color],
  );
  const [startTrack, middleTrack, endTrack] = useMemo(
    () => createTracks(color, dynamic),
    [color, dynamic],
  );

  const action = useCallback(
    (input: typeof color) => {
      const shared = createColor(input);
      const hue = createHue(shared, mode);
      setColor(input);
      setHue({ color: hue, value: hue.h });
    },
    [mode, setColor, setHue],
  );

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
          onBlur={() => setFocusStart(false)}
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
          onBlur={() => setFocusMiddle(false)}
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
          onBlur={() => setFocusEnd(false)}
        />
        <span
          role="presentation"
          className="bg-gradient-ref pointer-events-none absolute top-1 right-0 bottom-1 left-0 z-0 rounded-md"
        ></span>
      </div>
    </div>
  );
}

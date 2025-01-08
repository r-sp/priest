"use client";

import type { LabColor, LabColorMode } from "~/lib/types";
import { useState, useCallback } from "react";
import { useColor } from "~/hooks";
import { formatLab } from "~/lib/color";
import { Inline } from "~/components";

export default function InputLab({
  onChange,
  dynamicPreview = true,
}: {
  onChange?: (color: LabColorMode) => void;
  dynamicPreview?: boolean;
}) {
  const [{ lab }] = useColor();
  const [color, setLab] = useState<LabColor>(lab.color);
  const [focusLightness, setFocusLightness] = useState<boolean>(false);
  const [focusGreenRed, setFocusGreenRed] = useState<boolean>(false);
  const [focusBlueYellow, setFocusBlueYellow] = useState<boolean>(false);

  const updateColor = useCallback(
    (newColor: Partial<LabColor>) => {
      setLab({ ...color, ...newColor });

      if (onChange) {
        onChange({ mode: "lab", ...color, ...newColor });
      }
    },
    [color, onChange],
  );

  const previewColor = useCallback(
    (newColor: Partial<LabColor>) => {
      return formatLab({ ...color, ...newColor });
    },
    [color],
  );

  const trackLightnessLeft = previewColor({ l: 0 });
  const trackLightnessRight = previewColor({ l: 100 });
  const trackGreenRedLeft = previewColor(
    dynamicPreview ? { a: -100 } : { a: -100, b: 50 },
  );
  const trackGreenRedRight = previewColor(
    dynamicPreview ? { a: 100 } : { a: 100, b: 50 },
  );
  const trackBlueYellowLeft = previewColor(
    dynamicPreview ? { b: -100 } : { a: 0, b: -100 },
  );
  const trackBlueYellowRight = previewColor(
    dynamicPreview ? { b: 100 } : { a: 0, b: 100 },
  );

  return (
    <>
      <Inline
        role="none"
        className="relative inline-grid"
        bg={`linear-gradient(to right, ${trackLightnessLeft}, ${trackLightnessRight})`}
      >
        <input
          aria-label="lightness"
          type="range"
          min={0}
          max={100}
          step={focusLightness ? 1 : 0.01}
          value={color.l}
          id="lab-lightness"
          className="slider relative z-2 text-neutral-400"
          onChange={(e) => updateColor({ l: e.target.valueAsNumber })}
          onKeyDown={() => setFocusLightness(true)}
          onBlur={() => focusLightness && setFocusLightness(false)}
        />
        <span
          role="presentation"
          className="bg-gradient-ref pointer-events-none absolute top-1 right-0 bottom-1 left-0 z-0 rounded-md"
        ></span>
      </Inline>
      <Inline
        role="none"
        className="relative inline-grid"
        bg={`linear-gradient(to right, ${trackGreenRedLeft}, ${trackGreenRedRight})`}
      >
        <input
          aria-label="green red"
          type="range"
          min={-100}
          max={100}
          step={focusGreenRed ? 1 : 0.01}
          value={color.a}
          id="lab-green-red"
          className="slider relative z-2 text-neutral-400"
          onChange={(e) => updateColor({ a: e.target.valueAsNumber })}
          onKeyDown={() => setFocusGreenRed(true)}
          onBlur={() => focusGreenRed && setFocusGreenRed(false)}
        />
        <span
          role="presentation"
          className="bg-gradient-ref pointer-events-none absolute top-1 right-0 bottom-1 left-0 z-0 rounded-md"
        ></span>
      </Inline>
      <Inline
        role="none"
        className="relative inline-grid"
        bg={`linear-gradient(to right, ${trackBlueYellowLeft}, ${trackBlueYellowRight})`}
      >
        <input
          aria-label="blue yellow"
          type="range"
          min={-100}
          max={100}
          step={focusGreenRed ? 1 : 0.01}
          value={color.b}
          id="lab-blue-yellow"
          className="slider relative z-2 text-neutral-400"
          onChange={(e) => updateColor({ b: e.target.valueAsNumber })}
          onKeyDown={() => setFocusBlueYellow(true)}
          onBlur={() => focusBlueYellow && setFocusBlueYellow(false)}
        />
        <span
          role="presentation"
          className="bg-gradient-ref pointer-events-none absolute top-1 right-0 bottom-1 left-0 z-0 rounded-md"
        ></span>
      </Inline>
    </>
  );
}

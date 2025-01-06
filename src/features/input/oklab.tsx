"use client";

import type { OklabColor, OklabColorMode } from "~/lib/types";
import { useState, useEffect, useCallback } from "react";
import { formatOklab } from "~/lib/color";
import { useColor } from "~/hooks";

export default function InputOklab({
  onChange,
  dynamicPreview = true,
}: {
  onChange?: (color: OklabColorMode) => void;
  dynamicPreview?: boolean;
}) {
  const [{ oklab }] = useColor();
  const [color, setOklab] = useState<OklabColor>(oklab.color);
  const [focusLightness, setFocusLightness] = useState<boolean>(false);
  const [focusGreenRed, setFocusGreenRed] = useState<boolean>(false);
  const [focusBlueYellow, setFocusBlueYellow] = useState<boolean>(false);

  const updateColor = useCallback(
    (newColor: Partial<OklabColor>) => {
      setOklab({ ...color, ...newColor });

      if (onChange) {
        onChange({ mode: "oklab", ...color, ...newColor });
      }
    },
    [color, onChange],
  );

  const previewColor = useCallback(
    (newColor: Partial<OklabColor>) => {
      return formatOklab({ ...color, ...newColor });
    },
    [color],
  );

  const trackLightnessLeft = previewColor({ l: 0 });
  const trackLightnessRight = previewColor({ l: 1 });
  const trackGreenRedLeft = previewColor(
    dynamicPreview ? { a: -0.4 } : { a: -0.4, b: 0.4 },
  );
  const trackGreenRedRight = previewColor(
    dynamicPreview ? { a: 0.4 } : { a: 0.4, b: 0.4 },
  );
  const trackBlueYellowLeft = previewColor(
    dynamicPreview ? { b: -0.4 } : { a: 0, b: -0.4 },
  );
  const trackBlueYellowRight = previewColor(
    dynamicPreview ? { b: 0.4 } : { a: 0, b: 0.4 },
  );

  useEffect(() => {
    const currentColor = formatOklab(color);
    return () => {
      if (currentColor !== oklab.css) {
        setOklab(oklab.color);
      }
    };
  }, [color, oklab]);

  return (
    <>
      <div
        role="none"
        className="relative inline-grid"
        style={{
          ["--bg" as string]: `linear-gradient(to right, ${trackLightnessLeft}, ${trackLightnessRight})`,
        }}
      >
        <input
          aria-label="lightness"
          type="range"
          min={0}
          max={1}
          step={focusLightness ? 0.01 : 0.001}
          value={color.l}
          id="oklab-lightness"
          className="slider relative z-2 text-neutral-400"
          onChange={(e) => updateColor({ l: e.target.valueAsNumber })}
          onKeyDown={() => setFocusLightness(true)}
          onBlur={() => focusLightness && setFocusLightness(false)}
        />
        <span
          role="presentation"
          className="pointer-events-none absolute top-1 right-0 bottom-1 left-0 z-0 rounded-md"
          style={{
            backgroundImage: "var(--bg)",
          }}
        ></span>
      </div>
      <div
        role="none"
        className="relative inline-grid"
        style={{
          ["--bg" as string]: `linear-gradient(to right, ${trackGreenRedLeft}, ${trackGreenRedRight})`,
        }}
      >
        <input
          aria-label="green red"
          type="range"
          min={-0.4}
          max={0.4}
          step={focusGreenRed ? 0.01 : 0.001}
          value={color.a}
          id="oklab-green-red"
          className="slider relative z-2 text-neutral-400"
          onChange={(e) => updateColor({ a: e.target.valueAsNumber })}
          onKeyDown={() => setFocusGreenRed(true)}
          onBlur={() => focusGreenRed && setFocusGreenRed(false)}
        />
        <span
          role="presentation"
          className="pointer-events-none absolute top-1 right-0 bottom-1 left-0 z-0 rounded-md"
          style={{
            backgroundImage: "var(--bg)",
          }}
        ></span>
      </div>
      <div
        role="none"
        className="relative inline-grid"
        style={{
          ["--bg" as string]: `linear-gradient(to right, ${trackBlueYellowLeft}, ${trackBlueYellowRight})`,
        }}
      >
        <input
          aria-label="blue yellow"
          type="range"
          min={-0.4}
          max={0.4}
          step={focusBlueYellow ? 0.01 : 0.001}
          value={color.b}
          id="oklab-blue-yellow"
          className="slider relative z-2 text-neutral-400"
          onChange={(e) => updateColor({ b: e.target.valueAsNumber })}
          onKeyDown={() => setFocusBlueYellow(true)}
          onBlur={() => focusBlueYellow && setFocusBlueYellow(false)}
        />
        <span
          role="presentation"
          className="pointer-events-none absolute top-1 right-0 bottom-1 left-0 z-0 rounded-md"
          style={{
            backgroundImage: "var(--bg)",
          }}
        ></span>
      </div>
    </>
  );
}

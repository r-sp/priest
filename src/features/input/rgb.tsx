"use client";

import type { RgbColor, RgbColorMode } from "~/lib/types";
import { useState, useEffect, useCallback } from "react";
import { formatRgb } from "~/lib/color";
import { useColor } from "~/hooks";

export default function InputRgb({
  onChange,
  dynamicPreview = true,
}: {
  onChange?: (color: RgbColorMode) => void;
  dynamicPreview?: boolean;
}) {
  const [{ rgb }] = useColor();
  const [color, setRgb] = useState<RgbColor>(rgb.color);

  const updateColor = useCallback(
    (newColor: Partial<RgbColor>) => {
      setRgb({ ...color, ...newColor });

      if (onChange) {
        onChange({ mode: "rgb", ...color, ...newColor });
      }
    },
    [color, onChange],
  );

  const previewColor = useCallback(
    (newColor: Partial<RgbColor>) => {
      return formatRgb({ ...color, ...newColor });
    },
    [color],
  );

  const trackRedLeft = previewColor({ r: 0 });
  const trackRedRight = previewColor(
    dynamicPreview ? { r: 1 } : { r: 1, g: 0, b: 0 },
  );
  const trackGreenLeft = previewColor({ g: 0 });
  const trackGreenRight = previewColor(
    dynamicPreview ? { g: 1 } : { r: 0, g: 1, b: 0 },
  );
  const trackBlueLeft = previewColor({ b: 0 });
  const trackBlueRight = previewColor(
    dynamicPreview ? { b: 1 } : { r: 0, g: 0, b: 1 },
  );

  useEffect(() => {
    const currentColor = formatRgb(color);
    return () => {
      if (currentColor !== rgb.css) {
        setRgb(rgb.color);
      }
    };
  }, [color, rgb]);

  return (
    <>
      <div
        role="none"
        className="relative inline-grid"
        style={{
          ["--bg" as string]: `linear-gradient(to right, ${trackRedLeft}, ${trackRedRight})`,
        }}
      >
        <input
          aria-label="red"
          type="range"
          min={0}
          max={1}
          step={0.0045}
          value={color.r}
          id="rgb-red"
          className="slider relative z-2 text-neutral-400"
          onChange={(e) => updateColor({ r: e.target.valueAsNumber })}
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
          ["--bg" as string]: `linear-gradient(to right, ${trackGreenLeft}, ${trackGreenRight})`,
        }}
      >
        <input
          aria-label="green"
          type="range"
          min={0}
          max={1}
          step={0.0045}
          value={color.g}
          id="rgb-green"
          className="slider relative z-2 text-neutral-400"
          onChange={(e) => updateColor({ g: e.target.valueAsNumber })}
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
          ["--bg" as string]: `linear-gradient(to right, ${trackBlueLeft}, ${trackBlueRight})`,
        }}
      >
        <input
          aria-label="blue"
          type="range"
          min={0}
          max={1}
          step={0.0045}
          value={color.b}
          id="rgb-blue"
          className="slider relative z-2 text-neutral-400"
          onChange={(e) => updateColor({ b: e.target.valueAsNumber })}
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

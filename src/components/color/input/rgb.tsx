"use client";

import { type RgbColor, stringifyColor } from "~/lib/color";
import { useState, useMemo } from "react";
import { useColorStore } from "../provider";

export default function InputRgb(props: {
  onChange?: (color: RgbColor) => void;
  id?: string;
}) {
  const { rgb, setRgb } = useColorStore((state) => state);
  const [color, setColor] = useState<RgbColor>(rgb.color);

  const updateColor = (newColor: Partial<RgbColor>) => {
    const _rgb = { ...color, ...newColor };
    setRgb(_rgb);
    setColor(_rgb);

    if (props.onChange) {
      props.onChange(_rgb);
    }
  };

  const previewColor = (newColor: Partial<RgbColor>) => {
    return stringifyColor({ mode: "rgb", ...color, ...newColor });
  };

  const trackRedLeft = previewColor({ r: 0 });
  const trackRedRight = previewColor({ r: 1 });
  const trackGreenLeft = previewColor({ g: 0 });
  const trackGreenRight = previewColor({ g: 1 });
  const trackBlueLeft = previewColor({ b: 0 });
  const trackBlueRight = previewColor({ b: 1 });

  useMemo(() => {
    if (color !== rgb.color) {
      setColor(rgb.color);
    }
  }, [color, rgb]);

  return (
    <div
      role="form"
      aria-label="rgb color"
      className="grid gap-4"
      id={props.id ? props.id : undefined}
    >
      <div role="none" className="relative inline-grid">
        <input
          aria-label="red"
          type="range"
          min={0}
          max={1}
          step={0.0045}
          value={color.r}
          id="rgb-red"
          className="color-slider relative z-2 text-neutral-400"
          onChange={(e) => updateColor({ r: e.target.valueAsNumber })}
        />
        <span
          role="presentation"
          className="pointer-events-none absolute top-1 right-0 bottom-1 left-0 z-0 rounded-md"
          style={{
            backgroundImage: `linear-gradient(to right, ${trackRedLeft}, ${trackRedRight})`,
          }}
        ></span>
      </div>
      <div role="none" className="relative inline-grid">
        <input
          aria-label="green"
          type="range"
          min={0}
          max={1}
          step={0.0045}
          value={color.g}
          id="rgb-green"
          className="color-slider relative z-2 text-neutral-400"
          onChange={(e) => updateColor({ g: e.target.valueAsNumber })}
        />
        <span
          role="presentation"
          className="pointer-events-none absolute top-1 right-0 bottom-1 left-0 z-0 rounded-md"
          style={{
            backgroundImage: `linear-gradient(to right, ${trackGreenLeft}, ${trackGreenRight})`,
          }}
        ></span>
      </div>
      <div role="none" className="relative inline-grid">
        <input
          aria-label="blue"
          type="range"
          min={0}
          max={1}
          step={0.0045}
          value={color.b}
          id="rgb-blue"
          className="color-slider relative z-2 text-neutral-400"
          onChange={(e) => updateColor({ b: e.target.valueAsNumber })}
        />
        <span
          role="presentation"
          className="pointer-events-none absolute top-1 right-0 bottom-1 left-0 z-0 rounded-md"
          style={{
            backgroundImage: `linear-gradient(to right, ${trackBlueLeft}, ${trackBlueRight})`,
          }}
        ></span>
      </div>
    </div>
  );
}

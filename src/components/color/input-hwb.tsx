"use client";

import { useState, useMemo } from "react";
import { useColorStore } from "./provider";
import { stringifyColor } from "~/lib/color";

export default function InputHwb() {
  const { hwb, setHwb } = useColorStore((state) => state);
  const [color, setColor] = useState<typeof hwb.color>(hwb.color);

  const updateColor = (newColor: Partial<typeof hwb.color>) => {
    setHwb({ ...color, ...newColor });
    setColor({ ...color, ...newColor });
  };

  const previewColor = (newColor: Partial<typeof hwb.color>) => {
    return stringifyColor({ mode: "hwb", ...color, ...newColor });
  };

  const trackWhitenessLeft = previewColor({ w: 0 });
  const trackWhitenessRight = previewColor({ w: 1 });
  const trackBlacknessLeft = previewColor({ b: 0 });
  const trackBlacknessRight = previewColor({ b: 1 });

  useMemo(() => {
    if (color !== hwb.color) {
      setColor(hwb.color);
    }
  }, [color, hwb]);

  return (
    <div role="form" aria-label="hwb color" className="grid gap-4">
      <div role="none" className="relative inline-grid">
        <input
          aria-label="hue"
          type="range"
          min={0}
          max={360}
          step={0.01}
          value={color.h}
          id="hwb-hue"
          className="color-slider relative z-2 text-neutral-400"
          onChange={(e) => updateColor({ h: e.target.valueAsNumber })}
        />
        <span
          role="presentation"
          className="pointer-events-none absolute top-1 right-0 bottom-1 left-0 z-0 rounded-md"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgb(255, 0, 0) 0%, rgb(255, 255, 0) 17%, rgb(0, 255, 0) 33%, rgb(0, 255, 255) 50%, rgb(0, 0, 255) 67%, rgb(255, 0, 255) 83%, rgb(255, 0, 0) 100%)",
          }}
        ></span>
      </div>
      <div role="none" className="relative inline-grid">
        <input
          aria-label="whiteness"
          type="range"
          min={0}
          max={1}
          step={0.0001}
          value={color.w}
          id="hwb-whiteness"
          className="color-slider relative z-2 text-neutral-400"
          onChange={(e) => updateColor({ w: e.target.valueAsNumber })}
        />
        <span
          role="presentation"
          className="pointer-events-none absolute top-1 right-0 bottom-1 left-0 z-0 rounded-md"
          style={{
            backgroundImage: `linear-gradient(to right, ${trackWhitenessLeft}, ${trackWhitenessRight})`,
          }}
        ></span>
      </div>
      <div role="none" className="relative inline-grid">
        <input
          aria-label="blackness"
          type="range"
          min={0}
          max={1}
          step={0.0001}
          value={color.b}
          id="hwb-blackness"
          className="color-slider relative z-2 text-neutral-400"
          onChange={(e) => updateColor({ b: e.target.valueAsNumber })}
        />
        <span
          role="presentation"
          className="pointer-events-none absolute top-1 right-0 bottom-1 left-0 z-0 rounded-md"
          style={{
            backgroundImage: `linear-gradient(to right, ${trackBlacknessLeft}, ${trackBlacknessRight})`,
          }}
        ></span>
      </div>
    </div>
  );
}

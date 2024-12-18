"use client";

import { type OklabColor } from "~/lib/color";
import { formatOklab } from "~/lib/format";
import { useState, useEffect } from "react";
import { useColorStore } from "~/app/provider";

export default function InputOklab(props: {
  onChange?: (color: OklabColor) => void;
  id?: string;
}) {
  const { oklab, setOklab } = useColorStore((state) => state);
  const [color, setColor] = useState<OklabColor>(oklab.color);
  const [focusLightness, setFocusLightness] = useState<boolean>(false);
  const [focusGreenRed, setFocusGreenRed] = useState<boolean>(false);
  const [focusBlueYellow, setFocusBlueYellow] = useState<boolean>(false);

  const updateColor = (newColor: Partial<OklabColor>) => {
    const _oklab = { ...color, ...newColor };
    setOklab(_oklab);
    setColor(_oklab);

    if (props.onChange) {
      props.onChange(_oklab);
    }
  };

  const previewColor = (newColor: Partial<OklabColor>) => {
    return formatOklab({ ...color, ...newColor });
  };

  const trackLightnessLeft = previewColor({ l: 0 });
  const trackLightnessRight = previewColor({ l: 1 });
  const trackGreenRedLeft = previewColor({ a: -0.4 });
  const trackGreenRedRight = previewColor({ a: 0.4 });
  const trackBlueYellowLeft = previewColor({ b: -0.4 });
  const trackBlueYellowRight = previewColor({ b: 0.4 });

  useEffect(() => {
    const currentColor = formatOklab(color);
    return () => {
      if (currentColor !== oklab.css) {
        setColor(oklab.color);
      }
    };
  }, [color, oklab]);

  return (
    <div
      role="form"
      aria-label="oklab color"
      className="grid gap-4"
      id={props.id ? props.id : undefined}
    >
      <div role="none" className="relative inline-grid">
        <input
          aria-label="lightness"
          type="range"
          min={0}
          max={1}
          step={focusLightness ? 0.01 : 0.001}
          value={color.l}
          id="oklab-lightness"
          className="color-slider relative z-2 text-neutral-400"
          onChange={(e) => updateColor({ l: e.target.valueAsNumber })}
          onKeyDown={() => setFocusLightness(true)}
          onBlur={() => focusLightness && setFocusLightness(false)}
        />
        <span
          role="presentation"
          className="pointer-events-none absolute top-1 right-0 bottom-1 left-0 z-0 rounded-md"
          style={{
            backgroundImage: `linear-gradient(to right, ${trackLightnessLeft}, ${trackLightnessRight})`,
          }}
        ></span>
      </div>
      <div role="none" className="relative inline-grid">
        <input
          aria-label="green red"
          type="range"
          min={-0.4}
          max={0.4}
          step={focusGreenRed ? 0.01 : 0.001}
          value={color.a}
          id="oklab-green-red"
          className="color-slider relative z-2 text-neutral-400"
          onChange={(e) => updateColor({ a: e.target.valueAsNumber })}
          onKeyDown={() => setFocusGreenRed(true)}
          onBlur={() => focusGreenRed && setFocusGreenRed(false)}
        />
        <span
          role="presentation"
          className="pointer-events-none absolute top-1 right-0 bottom-1 left-0 z-0 rounded-md"
          style={{
            backgroundImage: `linear-gradient(to right, ${trackGreenRedLeft}, ${trackGreenRedRight})`,
          }}
        ></span>
      </div>
      <div role="none" className="relative inline-grid">
        <input
          aria-label="blue yellow"
          type="range"
          min={-0.4}
          max={0.4}
          step={focusBlueYellow ? 0.01 : 0.001}
          value={color.b}
          id="oklab-blue-yellow"
          className="color-slider relative z-2 text-neutral-400"
          onChange={(e) => updateColor({ b: e.target.valueAsNumber })}
          onKeyDown={() => setFocusBlueYellow(true)}
          onBlur={() => focusBlueYellow && setFocusBlueYellow(false)}
        />
        <span
          role="presentation"
          className="pointer-events-none absolute top-1 right-0 bottom-1 left-0 z-0 rounded-md"
          style={{
            backgroundImage: `linear-gradient(to right, ${trackBlueYellowLeft}, ${trackBlueYellowRight})`,
          }}
        ></span>
      </div>
    </div>
  );
}

"use client";

import { type LabColor } from "~/lib/color";
import { formatLab } from "~/lib/format";
import { useState, useEffect } from "react";
import { useColorStore } from "~/app/provider";

export default function InputLab(props: {
  onChange?: (color: LabColor) => void;
  id?: string;
}) {
  const { lab, setLab } = useColorStore((state) => state);
  const [color, setColor] = useState<LabColor>(lab.color);
  const [focusLightness, setFocusLightness] = useState<boolean>(false);
  const [focusGreenRed, setFocusGreenRed] = useState<boolean>(false);
  const [focusBlueYellow, setFocusBlueYellow] = useState<boolean>(false);

  const updateColor = (newColor: Partial<LabColor>) => {
    const _lab = { ...color, ...newColor };
    setLab(_lab);
    setColor(_lab);

    if (props.onChange) {
      props.onChange(_lab);
    }
  };

  const previewColor = (newColor: Partial<LabColor>) => {
    return formatLab({ ...color, ...newColor });
  };

  const trackLightnessLeft = previewColor({ l: 0 });
  const trackLightnessRight = previewColor({ l: 100 });
  const trackGreenRedLeft = previewColor({ a: -100 });
  const trackGreenRedRight = previewColor({ a: 100 });
  const trackBlueYellowLeft = previewColor({ b: -100 });
  const trackBlueYellowRight = previewColor({ b: 100 });

  useEffect(() => {
    const currentColor = formatLab(color);
    return () => {
      if (currentColor !== lab.css) {
        setColor(lab.color);
      }
    };
  }, [color, lab]);

  return (
    <div
      role="form"
      aria-label="lab color"
      className="grid gap-4"
      id={props.id ? props.id : undefined}
    >
      <div role="none" className="relative inline-grid">
        <input
          aria-label="lightness"
          type="range"
          min={0}
          max={100}
          step={focusLightness ? 1 : 0.01}
          value={color.l}
          id="lab-lightness"
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
          min={-100}
          max={100}
          step={focusGreenRed ? 1 : 0.01}
          value={color.a}
          id="lab-green-red"
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
          min={-100}
          max={100}
          step={focusGreenRed ? 1 : 0.01}
          value={color.b}
          id="lab-blue-yellow"
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

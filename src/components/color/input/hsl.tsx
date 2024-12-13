"use client";

import { type HslColor, stringifyColor } from "~/lib/color";
import { useState, useMemo } from "react";
import { useColorStore } from "../provider";

export default function InputHsl(props: {
  onChange?: (color: HslColor) => void;
  id?: string;
}) {
  const { hsl, setHsl } = useColorStore((state) => state);
  const [color, setColor] = useState<HslColor>(hsl.color);
  const [focusHue, setFocusHue] = useState<boolean>(false);
  const [focusSaturation, setFocusSaturation] = useState<boolean>(false);
  const [focusLightness, setFocusLightness] = useState<boolean>(false);

  const updateColor = (newColor: Partial<HslColor>) => {
    const _hsl = { ...color, ...newColor };
    setHsl(_hsl);
    setColor(_hsl);

    if (props.onChange) {
      props.onChange(_hsl);
    }
  };

  const previewColor = (newColor: Partial<HslColor>) => {
    return stringifyColor({ mode: "hsl", ...color, ...newColor });
  };

  const trackSaturationLeft = previewColor({ s: 0 });
  const trackSaturationRight = previewColor({ s: 1 });
  const trackLightnessCenter = previewColor({ s: 1, l: 0.5 });

  useMemo(() => {
    if (color !== hsl.color) {
      setColor(hsl.color);
    }
  }, [color, hsl]);

  return (
    <div
      role="form"
      aria-label="hsl color"
      className="grid gap-4"
      id={props.id ? props.id : undefined}
    >
      <div role="none" className="relative inline-grid">
        <input
          aria-label="hue"
          type="range"
          min={0}
          max={360}
          step={focusHue ? 1 : 0.01}
          value={color.h}
          id="hsl-hue"
          className="color-slider relative z-2 text-neutral-400"
          onChange={(e) => updateColor({ h: e.target.valueAsNumber })}
          onKeyDown={() => setFocusHue(true)}
          onBlur={() => focusHue && setFocusHue(false)}
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
          aria-label="saturation"
          type="range"
          min={0}
          max={1}
          step={focusSaturation ? 0.01 : 0.0001}
          value={color.s}
          id="hsl-saturation"
          className="color-slider relative z-2 text-neutral-400"
          onChange={(e) => updateColor({ s: e.target.valueAsNumber })}
          onKeyDown={() => setFocusSaturation(true)}
          onBlur={() => focusSaturation && setFocusSaturation(false)}
        />
        <span
          role="presentation"
          className="pointer-events-none absolute top-1 right-0 bottom-1 left-0 z-0 rounded-md"
          style={{
            backgroundImage: `linear-gradient(to right, ${trackSaturationLeft}, ${trackSaturationRight})`,
          }}
        ></span>
      </div>
      <div role="none" className="relative inline-grid">
        <input
          aria-label="lightness"
          type="range"
          min={0}
          max={1}
          step={focusLightness ? 0.01 : 0.0001}
          value={color.l}
          id="hsl-lightness"
          className="color-slider relative z-2 text-neutral-400"
          onChange={(e) => updateColor({ l: e.target.valueAsNumber })}
          onKeyDown={() => setFocusLightness(true)}
          onBlur={() => focusLightness && setFocusLightness(false)}
        />
        <span
          role="presentation"
          className="pointer-events-none absolute top-1 right-0 bottom-1 left-0 z-0 rounded-md"
          style={{
            backgroundImage: `linear-gradient(to right, rgb(0,0,0), ${trackLightnessCenter}, rgb(255, 255, 255))`,
          }}
        ></span>
      </div>
    </div>
  );
}

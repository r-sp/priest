"use client";

import { useColorProvider } from "./provider";
import { stringifyRgb } from "~/lib/utils";

export default function ColorSlider() {
  const { hsl, setHsl, convert } = useColorProvider();

  const updateHsl = (newColor: Partial<typeof hsl>) => setHsl({ ...hsl, ...newColor });

  const previewColor = convert({ h: hsl.h, s: 100, l: 50 }).toRgb();
  const previewSaturationLeft = convert({ h: hsl.h, s: 0, l: hsl.l }).toRgb();
  const previewSaturationRight = convert({ h: hsl.h, s: 100, l: hsl.l }).toRgb();

  return (
    <div role="toolbar" aria-label="color hue, saturation and lightness" className="grid gap-3">
      <div className="relative z-0 inline-grid h-6" role="none">
        <input
          type="range"
          aria-label="hue"
          name="color-hue"
          min={0}
          max={359}
          value={hsl.h}
          className="input-slider absolute bottom-0 left-0 right-0 top-0 z-2 h-6 rounded-2xl"
          onChange={(e) => updateHsl({ h: e.target.valueAsNumber })}
        />
        <div
          role="presentation"
          className="pointer-events-none absolute bottom-1 left-0 right-0 top-1 z-0 rounded-lg"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgb(255, 0, 0) 0%, rgb(255, 255, 0) 17%, rgb(0, 255, 0) 33%, rgb(0, 255, 255) 50%, rgb(0, 0, 255) 67%, rgb(255, 0, 255) 83%, rgb(255, 0, 0) 100%)",
          }}
        ></div>
      </div>
      <div className="relative z-0 inline-grid h-6" role="none">
        <input
          type="range"
          aria-label="saturation"
          name="color-saturation"
          min={1}
          max={100}
          value={hsl.s}
          className="input-slider absolute bottom-0 left-0 right-0 top-0 z-2 h-6 rounded-2xl"
          onChange={(e) => updateHsl({ s: e.target.valueAsNumber })}
        />
        <div
          role="presentation"
          className="pointer-events-none absolute bottom-1 left-0 right-0 top-1 z-0 rounded-lg"
          style={{
            backgroundImage: `linear-gradient(to right , ${stringifyRgb(previewSaturationLeft)}, ${stringifyRgb(previewSaturationRight)})`,
          }}
        ></div>
      </div>
      <div className="relative z-0 inline-grid h-6" role="none">
        <input
          type="range"
          aria-label="lightness"
          name="color-lightness"
          min={1}
          max={99}
          value={hsl.l}
          className="input-slider absolute bottom-0 left-0 right-0 top-0 z-2 h-6 rounded-2xl"
          onChange={(e) => updateHsl({ l: e.target.valueAsNumber })}
        />
        <div
          role="presentation"
          className="pointer-events-none absolute bottom-1 left-0 right-0 top-1 z-0 rounded-lg"
          style={{
            backgroundImage: `linear-gradient(to right , rgb(0, 0, 0), ${stringifyRgb(previewColor)}, rgb(255, 255, 255))`,
          }}
        ></div>
      </div>
    </div>
  );
}

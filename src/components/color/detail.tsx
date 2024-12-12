"use client";

import { useParams } from "next/navigation";
import { useColorStore } from "./provider";
import { createColor, isValidHex } from "~/lib/color";
import { ColorContrast, ColorSlider } from "~/components/color";
import clsx from "clsx";

export default function ColorDetail() {
  const colorBy = useParams<{ hex: string }>();
  const store = useColorStore((state) => state);

  const { hex, rgb, hsl, hwb, lab, lch, oklab, oklch } = colorBy.hex
    ? createColor(isValidHex(colorBy.hex), store.mode)
    : store;

  const colorHex = hex;
  const colorRgb = rgb.css;
  const colorHsl = hsl.css;
  const colorHwb = hwb.css;
  const colorLab = lab.css;
  const colorLch = lch.css;
  const colorOklab = oklab.css;
  const colorOklch = oklch.css;

  return (
    <article
      className={clsx(
        "grid gap-x-4 gap-y-8 max-xl:px-3",
        !colorBy.hex && "mx-auto max-w-7xl md:grid-cols-2",
      )}
    >
      <header
        className={clsx(
          "mx-auto w-full max-w-3xl",
          !colorBy.hex && "md:relative",
        )}
      >
        <div role="none" className={clsx(!colorBy.hex && "md:sticky md:top-4")}>
          <div role="presentation" className="frame rounded-lg">
            <span style={{ backgroundColor: colorRgb }}></span>
          </div>
          <h1 className="mt-4">
            <code>{colorHex}</code>
          </h1>
          <p>
            <code>{colorRgb}</code>
          </p>
          <p>
            <code>{colorHsl}</code>
          </p>
          <p>
            <code>{colorHwb}</code>
          </p>
          <p className="mt-4">
            <code>{colorLch}</code>
          </p>
          <p>
            <code>{colorOklch}</code>
          </p>
          <p>
            <code>{colorLab}</code>
          </p>
          <p>
            <code>{colorOklab}</code>
          </p>
          <ColorContrast rgb={rgb.color} />
        </div>
      </header>
      {!colorBy.hex && <ColorSlider state={store} />}
    </article>
  );
}

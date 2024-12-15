"use client";

import { useParams } from "next/navigation";
import { useColorStore } from "./provider";
import { createColor, isValidHex } from "~/lib/color";
import { ColorContrast, ColorSlider } from "~/components/color";
import clsx from "clsx";

export default function ColorDetail() {
  const colorBy = useParams<{ hex: string }>();
  const store = useColorStore((state) => state);

  const { hex, rgb, hsl, hwb, lab, lch, oklab, oklch, mode } = colorBy.hex
    ? createColor(isValidHex(colorBy.hex))
    : store;

  const colorHex = hex;
  const colorRgb = rgb.css;
  const colorHsl = hsl.css;
  const colorHwb = hwb.css;
  const colorLab = lab.css;
  const colorLch = lch.css;
  const colorOklab = oklab.css;
  const colorOklch = oklch.css;

  const modeRgb = mode === "rgb";
  const modeHsl = mode === "hsl";
  const modeHwb = mode === "hwb";
  const modeLab = mode === "lab";
  const modeLch = mode === "lch";
  const modeOklab = mode === "oklab";
  const modeOklch = mode === "oklch";

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
          <h1 className="mt-4 font-mono">
            <code>{colorHex}</code>
          </h1>
          <p
            className={clsx(
              modeRgb && "text-neutral-800 dark:text-neutral-200",
              "font-mono",
            )}
          >
            <code>{colorRgb}</code>
          </p>
          <p
            className={clsx(
              modeHsl && "text-neutral-800 dark:text-neutral-200",
              "font-mono",
            )}
          >
            <code>{colorHsl}</code>
          </p>
          <p
            className={clsx(
              modeHwb && "text-neutral-800 dark:text-neutral-200",
              "font-mono",
            )}
          >
            <code>{colorHwb}</code>
          </p>
          <p
            className={clsx(
              modeLch && "text-neutral-800 dark:text-neutral-200",
              "mt-4 font-mono",
            )}
          >
            <code>{colorLch}</code>
          </p>
          <p
            className={clsx(
              modeOklch && "text-neutral-800 dark:text-neutral-200",
            )}
          >
            <code>{colorOklch}</code>
          </p>
          <p
            className={clsx(
              modeLab && "text-neutral-800 dark:text-neutral-200",
              "font-mono",
            )}
          >
            <code>{colorLab}</code>
          </p>
          <p
            className={clsx(
              modeOklab && "text-neutral-800 dark:text-neutral-200",
              "font-mono",
            )}
          >
            <code>{colorOklab}</code>
          </p>
          <ColorContrast rgb={rgb.color} />
        </div>
      </header>
      {!colorBy.hex && <ColorSlider state={store} />}
    </article>
  );
}

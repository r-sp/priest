import type { AnyColorMode, OklchColorMode } from "~/types/color";
import {
  convertRgb,
  convertOklch,
  convertColor,
  formatCss,
  round,
} from "~/utils";
import clsx from "clsx";

interface Props {
  color: AnyColorMode;
}

type Readable = "Pass" | "Fail";

export default function ColorContrast({ color }: Props) {
  const { mode } = color;
  const currentColor = convertRgb(color);
  const { r, g, b } = currentColor;

  const luma = (r * 299 + g * 587 + b * 114) / 1000 / 255;
  const brightness = round(luma, 2);

  const relativeLuminance = (value: number): number => {
    const ratio = value / 255;
    return ratio <= 0.03928 ? ratio / 12.92 : ((ratio + 0.055) / 1.055) ** 2.4;
  };
  const calculateLuminance = (
    red: number,
    green: number,
    blue: number,
  ): number => {
    return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
  };

  const red = relativeLuminance(r);
  const green = relativeLuminance(g);
  const blue = relativeLuminance(b);
  const luminance = round(calculateLuminance(red, green, blue), 2);

  const bg = relativeLuminance(255);
  const background = round(calculateLuminance(bg, bg, bg), 2);

  const front = Math.max(luminance, background);
  const back = Math.min(background, luminance);

  const check = (current: number, threshold: number): Readable => {
    return current >= threshold ? "Pass" : "Fail";
  };
  const ratio = round((front + 0.05) / (back + 0.05), 2);

  const normalAA = check(ratio, 4.5);
  const normalAAA = check(ratio, 7.0);
  const largeAA = check(ratio, 3.0);
  const largeAAA = check(ratio, 4.5);

  const trackColor = convertOklch(color);
  const previewColor = (newColor: Partial<OklchColorMode>): string => {
    return formatCss(convertColor({ ...trackColor, ...newColor }, mode));
  };

  const trackBrightnessLeft = previewColor({ l: 0.2, c: 0 });
  const trackBrightnessRight = previewColor({ l: 1, c: 0 });

  const trackLuminanceBlue = previewColor({ h: 250 });
  const trackLuminanceGreen = previewColor({ h: 180 });
  const trackLuminanceYellow = previewColor({ h: 90 });
  const trackLuminanceWhite = previewColor({ c: 0 });

  return (
    <section aria-label="color contrast" className="grid gap-y-6">
      <Contrast
        ratio={ratio}
        normal={[normalAA, normalAAA]}
        large={[largeAA, largeAAA]}
      />
      <div className="grid gap-x-4 gap-y-4 border-t border-t-gray-200 pt-4 md:grid-cols-2 dark:border-t-gray-800">
        <div
          role="group"
          aria-describedby="color-brightness"
          className="inline-grid gap-y-3"
        >
          <p id="color-brightness" className="text-gray-800 dark:text-gray-200">
            Brightness
          </p>
          <Progress
            value={brightness}
            min={0}
            max={1}
            style={`linear-gradient(to right, ${trackBrightnessLeft}, ${trackBrightnessRight})`}
          />
        </div>
        <div
          role="group"
          aria-describedby="color-luminance"
          className="inline-grid gap-y-3"
        >
          <p id="color-luminance" className="text-gray-800 dark:text-gray-200">
            Luminance
          </p>
          <Progress
            value={luminance}
            min={0}
            max={1}
            style={`linear-gradient(to right, ${trackLuminanceBlue}, ${trackLuminanceGreen} 25%, ${trackLuminanceYellow} 50%, ${trackLuminanceWhite} 80%)`}
          />
        </div>
      </div>
    </section>
  );
}

interface ProgressBar {
  value: number;
  min: number;
  max: number;
  style: string;
}

function Progress({ value, min, max, style }: ProgressBar) {
  const current = Math.max(min, Math.min(100, (value / max) * 100));
  const progress = `${round(current, 2)}%`;

  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={min}
      aria-valuemax={max}
      className="relative z-0 flex flex-nowrap overflow-hidden rounded-2xl text-gray-600 select-none dark:text-gray-400"
      style={{
        ["--bg" as string]: style,
      }}
      tabIndex={0}
    >
      <div
        role="presentation"
        className="bg-gradient-ref inline-flex h-6 w-full rounded-2xl border-r border-r-gray-200 dark:border-r-gray-800"
      ></div>
      <span
        className="absolute right-0 z-1 inline-flex h-6 items-center rounded-e-2xl border border-l-0 border-gray-200 bg-gray-100 px-3 text-sm whitespace-nowrap dark:border-gray-800 dark:bg-gray-900"
        style={{ left: progress }}
      >
        {progress}
      </span>
    </div>
  );
}

interface ContrastChecker {
  ratio: number;
  normal: [Readable, Readable];
  large: [Readable, Readable];
}

function Contrast({ ratio, normal, large }: ContrastChecker) {
  const [normalAA, normalAAA] = normal;
  const [largeAA, largeAAA] = large;

  const status = (contrast: Readable): string => {
    return clsx(
      contrast === "Pass"
        ? "text-green-700 dark:text-green-400"
        : "text-red-700 dark:text-red-400",
    );
  };

  return (
    <div className="flex">
      <h2 className="inline-flex grow-0 flex-col text-gray-800 dark:text-gray-200">
        Contrast{" "}
        <span
          className={clsx(
            "text-xl",
            ratio === 4.5 ||
              (ratio > 4.5 && "text-green-700 dark:text-green-400"),
            ratio < 4.5 && "text-red-700 dark:text-red-400",
          )}
        >
          {`${ratio}:1`}
        </span>
      </h2>
      <div className="ml-4 grow border-l border-l-gray-200 pl-4 dark:border-l-gray-800">
        <div className="flex flex-nowrap justify-between text-sm text-gray-600 dark:text-gray-400">
          <p>WCAG Normal</p>
          <p>
            AA: <span className={status(normalAA)}>{normalAA}</span>
          </p>
          <p>
            AAA: <span className={status(normalAAA)}>{normalAAA}</span>
          </p>
        </div>
        <div className="mt-2 flex flex-nowrap justify-between border-t border-t-gray-200 pt-2 text-sm text-gray-600 dark:border-t-gray-800 dark:text-gray-400">
          <p>WCAG Large</p>
          <p>
            AA: <span className={status(largeAA)}>{largeAA}</span>
          </p>
          <p>
            AAA: <span className={status(largeAAA)}>{largeAAA}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

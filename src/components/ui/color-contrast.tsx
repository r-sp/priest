import type { AnyColorMode, OklchColorMode } from "~/types/color";
import {
  createRgb,
  convertOklch,
  convertColor,
  formatCss,
  round,
} from "~/utils";
import clsx from "clsx";
import Editable from "./editable";

interface Props {
  color: AnyColorMode;
}

type Readable = "Pass" | "Fail";

export default function ColorContrast({ color }: Props) {
  const { mode } = color;
  const currentColor = createRgb(color);
  const { r, g, b } = currentColor;

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
  const luminance = calculateLuminance(red, green, blue);

  return (
    <section aria-label="color contrast" className="grid gap-y-12">
      <h2 className="sr-only">Color Contrast</h2>
      <div className="grid gap-y-4 md:grid-cols-2 md:gap-x-6 lg:gap-x-8">
        <div
          role="group"
          aria-label="color brightness"
          className="inline-grid gap-y-3"
        >
          <p className="text-gray-800 dark:text-gray-200">Brightness</p>
          <Progress
            value={brightness}
            min={0}
            max={1}
            style={`linear-gradient(to right, ${trackBrightnessLeft}, ${trackBrightnessRight})`}
          />
        </div>
        <div
          role="group"
          aria-label="color luminance"
          className="inline-grid gap-y-3"
        >
          <p className="text-gray-800 dark:text-gray-200">Luminance</p>
          <Progress
            value={luminance}
            min={0}
            max={1}
            style={`linear-gradient(to right, ${trackLuminanceBlue}, ${trackLuminanceGreen} 25%, ${trackLuminanceYellow} 50%, ${trackLuminanceWhite} 80%)`}
          />
        </div>
      </div>
      <div className="grid gap-y-6 md:grid-cols-2 md:gap-x-6 lg:gap-x-8">
        <Contrast color="white" foreground={luminance} background={1} />
        <Contrast color="black" foreground={luminance} background={0} />
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
  color: "black" | "white";
  foreground: number;
  background: number;
}

function Contrast({ color, foreground, background }: ContrastChecker) {
  const fg = Math.max(foreground, background);
  const bg = Math.min(foreground, background);
  const ratio = (fg + 0.05) / (bg + 0.05);
  const contrast = round(ratio, 2);

  const check = (current: number, threshold: number): Readable => {
    return current >= threshold ? "Pass" : "Fail";
  };

  const normalAA = check(ratio, 4.5);
  const normalAAA = check(ratio, 7.0);
  const largeAA = check(ratio, 3.0);
  const largeAAA = check(ratio, 4.5);

  const isLight = color === "white";

  const normalText = isLight
    ? "Perfect for bright, welcoming spaces"
    : "Ideal for bold statements and drama";
  const largeText = isLight
    ? "Soft hues evoke peace, tranquility, and fresh starts"
    : "Rich shades exude sophistication, power, and mystery";

  const status = (contrast: Readable): string => {
    return clsx(
      contrast === "Pass"
        ? "text-green-700 dark:text-green-400"
        : "text-red-700 dark:text-red-400",
    );
  };

  const currentCss = color === "black" ? "rgb(0 0 0)" : "rgb(255 255 255)";

  return (
    <div
      role="group"
      aria-label={`color contrast with ${color} color`}
      className="grid gap-y-3"
      style={{ ["--contrastColor" as string]: currentCss }}
    >
      <Editable normal={normalText} large={largeText} />
      <div className="max-xs:flex-col flex flex-row">
        <h3 className="inline-flex min-w-16 grow-0 flex-col text-gray-800 dark:text-gray-200">
          Contrast{" "}
          <span
            className={clsx(
              "text-xl",
              ratio >= 4.5 && "text-green-700 dark:text-green-400",
              ratio < 4.5 && "text-red-700 dark:text-red-400",
            )}
          >
            {`${contrast}:1`}
          </span>
        </h3>
        <div className="max-xs:ml-0 max-xs:pl-0 max-xs:border-l-0 ml-4 grow border-l border-gray-200 pl-4 dark:border-gray-800">
          <div className="max-xs:mt-2 max-xs:pt-2 max-xs:border-t flex flex-wrap justify-between gap-x-4 border-gray-200 text-sm text-gray-600 max-[24rem]:flex-col dark:border-gray-800 dark:text-gray-400">
            <p className="min-w-24">WCAG Normal</p>
            <div className="contents flex-wrap justify-between gap-x-4 max-sm:inline-flex max-[15rem]:flex-col">
              <p className="min-w-17">
                AA:{" "}
                <span className={status(normalAA)} title={`${contrast} >= 4.5`}>
                  {normalAA}
                </span>
              </p>
              <p className="min-w-17">
                AAA:{" "}
                <span
                  className={status(normalAAA)}
                  title={`${contrast} >= 7.0`}
                >
                  {normalAAA}
                </span>
              </p>
            </div>
          </div>
          <div className="mt-2 flex flex-wrap justify-between gap-x-4 border-t border-gray-200 pt-2 text-sm text-gray-600 max-[24rem]:flex-col dark:border-gray-800 dark:text-gray-400">
            <p className="min-w-24">WCAG Large</p>
            <div className="contents flex-wrap justify-between gap-x-4 max-sm:inline-flex max-[15rem]:flex-col">
              <p className="min-w-17">
                AA:{" "}
                <span className={status(largeAA)} title={`${contrast} >= 3.0`}>
                  {largeAA}
                </span>
              </p>
              <p className="min-w-17">
                AAA:{" "}
                <span className={status(largeAAA)} title={`${contrast} >= 4.5`}>
                  {largeAAA}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

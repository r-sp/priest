import type { AnyColorMode } from "~/lib/types";
import clsx from "clsx";

export default function Notice({
  color,
  error,
}: {
  color: AnyColorMode;
  error: string;
}) {
  const getKeys = (index: number) => Object.keys(color)[index];
  const getValues = (index: number) => Object.values(color)[index];

  const modeRgb = color.mode === "rgb";
  const modeHsl = color.mode === "hsl";
  const modeHwb = color.mode === "hwb";
  const modeLab = color.mode === "lab";
  const modeLch = color.mode === "lch";
  const modeOklab = color.mode === "oklab";
  const modeOklch = color.mode === "oklch";

  const description = error
    .replaceAll("--", "-||")
    .replaceAll("green-red", "green||red")
    .replaceAll("blue-yellow", "blue||yellow")
    .replaceAll("-", " ")
    .replaceAll("||", "-");

  const startProps: boolean =
    error.includes("lightness") ||
    (modeRgb && error.includes("red")) ||
    ((modeHsl || modeHsl) && error.includes("hue"));

  const middleProps: boolean =
    error.includes("saturation") ||
    error.includes("whiteness") ||
    error.includes("green-red") ||
    error.includes("chroma") ||
    (modeRgb && error.includes("green"));

  const endProps: boolean =
    error.includes("blackness") ||
    error.includes("blue-yellow") ||
    (modeRgb && error.includes("blue")) ||
    (modeHsl && error.includes("lightness")) ||
    ((modeLch || modeOklch) && error.includes("hue"));

  const range = (label: string, min: number, max: number): string => {
    return `${label} [${min}, ${max}]`;
  };

  const startRange = modeRgb
    ? range("red", 0, 255)
    : modeHsl || modeHwb
      ? range("hue", 0, 360)
      : modeLab || modeLch
        ? range("lightness", 0, 100)
        : modeOklab || modeOklch
          ? range("lightness", 0, 1)
          : "";

  const middleRange = modeRgb
    ? range("green", 0, 255)
    : modeHsl
      ? range("saturation", 0, 100)
      : modeHwb
        ? range("whiteness", 0, 100)
        : modeLab
          ? range("green-red", -100, 100)
          : modeLch
            ? range("chroma", 0, 150)
            : modeOklab
              ? range("green-red", -0.4, 0.4)
              : modeOklch
                ? range("chroma", 0, 0.4)
                : "";

  const endRange = modeRgb
    ? range("blue", 0, 255)
    : modeHsl
      ? range("lightness", 0, 100)
      : modeHwb
        ? range("blackness", 0, 100)
        : modeLab
          ? range("blue-yellow", -100, 100)
          : modeOklab
            ? range("blue-yellow", -0.4, 0.4)
            : modeLch || modeOklch
              ? range("hue", 0, 360)
              : "";

  const modeKey = getKeys(0);
  const modeValue = getValues(0);
  const startKey = getKeys(1);
  const startValue = getValues(1);
  const middleKey = getKeys(2);
  const middleValue = getValues(2);
  const endKey = getKeys(3);
  const endValue = getValues(3);

  const background = (invalid: boolean): string => {
    return clsx(
      "absolute right-0 left-0 z-0 h-6",
      invalid ? "bg-red-100 dark:bg-red-950" : "bg-inherit",
    );
  };

  const foreground = (invalid: boolean, italic?: boolean): string => {
    return clsx(
      invalid ? "text-red-700 dark:text-red-400" : "text-gray-500",
      italic ? "not-italic" : "",
    );
  };

  return (
    <section aria-labelledby="color-notice">
      <h2
        id="color-notice"
        className="text-lg font-semibold text-gray-800 dark:text-gray-200"
      >
        {`Color offset from ${color.mode}`}
      </h2>
      <p
        role="term"
        aria-details="color offset"
        className="text-gray-600 dark:text-gray-400"
      >
        {description}
      </p>
      <div
        role="presentation"
        className="relative z-0 mt-4 grid overflow-hidden rounded-md bg-gray-100 text-gray-700 ring ring-gray-200 dark:bg-gray-900 dark:text-gray-300 dark:ring-gray-800"
      >
        <pre
          role="definition"
          className="flex flex-col overflow-x-auto px-3 py-2"
        >
          <code aria-hidden="true">{`{`}</code>
          <code aria-hidden="true">
            <span>{`  ${modeKey}`}</span>
            <span>{`: `}</span>
            <span>{`"${modeValue}",`}</span>
          </code>
          <code aria-describedby="start-props" className="flex items-center">
            <span className="relative z-1">
              <span>{`  ${startKey}: ${startValue}, `}</span>
              <span className={foreground(startProps)}>{"// "}</span>
              <em
                id="start-props"
                className={foreground(startProps, true)}
              >{`${startRange}`}</em>
            </span>
            <span className={background(startProps)}></span>
          </code>
          <code aria-describedby="middle-props" className="flex items-center">
            <span className="relative z-1">
              <span>{`  ${middleKey} : ${middleValue}, `}</span>
              <span className={foreground(middleProps)}>{"// "}</span>
              <em
                id="middle-props"
                className={foreground(middleProps, true)}
              >{`${middleRange}`}</em>
            </span>
            <span className={background(middleProps)}></span>
          </code>
          <code aria-describedby="end-props" className="flex items-center">
            <span className="relative z-1 inline-flex">
              <span>{`  ${endKey} : ${endValue}, `}</span>
              <span className={foreground(endProps)}>{"// "}</span>
              <em
                id="end-props"
                className={foreground(endProps, true)}
              >{`${endRange}`}</em>
            </span>
            <span className={background(endProps)}></span>
          </code>
          <code aria-hidden="true">{`}`}</code>
        </pre>
      </div>
    </section>
  );
}

"use client";

import type { ColorState, ColorFormat, OklchColor } from "~/lib/types";
import { useState, useMemo, useCallback } from "react";
import {
  measureColor,
  contrastColor,
  createColor,
  switchColorCss,
} from "~/lib/color";
import clsx from "clsx";

export default function ColorAnalysis({
  color,
  mode,
}: {
  color: ColorState;
  mode: ColorFormat;
}) {
  const { rgb, oklch } = color;

  const { brightness, luminance } = useMemo(
    () => measureColor(rgb.color),
    [rgb],
  );

  const { white, black } = useMemo(
    () => ({
      white: contrastColor(rgb.color, { r: 1, g: 1, b: 1 }),
      black: contrastColor(rgb.color, { r: 0, g: 0, b: 0 }),
    }),
    [rgb],
  );

  const previewColor = useCallback(
    (newColor: Partial<OklchColor>) =>
      switchColorCss(
        mode,
        createColor({ mode: "oklch", ...oklch.color, ...newColor }),
      ),
    [mode, oklch],
  );

  const trackBrightnessLeft = previewColor({ l: 0 });
  const trackBrightnessRight = previewColor({ l: 1 });
  const trackLuminanceBlue = previewColor({ h: 250 });
  const trackLuminanceGreen = previewColor({ h: 180 });
  const trackLuminanceYellow = previewColor({ h: 90 });
  const trackLuminanceWhite = previewColor({ c: 0 });

  return (
    <section aria-label="analysis" className="flex flex-col gap-y-8">
      <div className="mx-auto grid w-full max-w-3xl gap-y-3">
        <div className="inline-grid gap-y-3">
          <p>Brightness</p>
          <Progress
            value={brightness}
            style={`linear-gradient(to right, ${trackBrightnessLeft}, ${trackBrightnessRight})`}
          />
        </div>
        <div className="inline-grid gap-y-3">
          <p>Luminance</p>
          <Progress
            value={luminance}
            style={`linear-gradient(to right, ${trackLuminanceBlue}, ${trackLuminanceGreen} 25%, ${trackLuminanceYellow} 50%, ${trackLuminanceWhite} 80%)`}
          />
        </div>
      </div>
      <div className="mt-4 grid gap-8 md:grid-cols-2">
        <ColorCard reflect={true} color={white} />
        <ColorCard reflect={false} color={black} />
      </div>
    </section>
  );
}

function Progress({ value, style }: { value: number; style: string }) {
  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      className="relative z-0 flex flex-nowrap overflow-hidden select-none"
      style={{
        ["--bg" as string]: style,
      }}
      tabIndex={0}
    >
      <div
        role="presentation"
        className="inline-flex h-6 w-full rounded-2xl border-r border-r-neutral-400 dark:border-r-neutral-700"
        style={{ backgroundImage: "var(--bg)" }}
      ></div>
      <span
        className="absolute right-0 z-1 inline-flex h-6 items-center rounded-e-2xl border border-l-0 border-neutral-400 bg-neutral-50 px-3 text-sm whitespace-nowrap dark:border-neutral-700 dark:bg-neutral-900"
        style={{ left: `${value}%` }}
      >
        {`${value}%`}
      </span>
    </div>
  );
}

function ColorCard({
  reflect,
  color,
}: {
  reflect: boolean;
  color: ReturnType<typeof contrastColor>;
}) {
  const { ratio, normal, large } = color;
  const [invert, setInvert] = useState<boolean>(false);

  const [normalText, setNormalText] = useState<string>(
    "Designed with you in mind",
  );

  const [largeText, setLargeText] = useState<string>(
    "Experience superior text clarity and comfortable viewing",
  );

  const [focusNormal, setFocusNormal] = useState<boolean>(false);
  const [focusLarge, setFocusLarge] = useState<boolean>(false);

  return (
    <section
      aria-label={
        invert
          ? `current color with ${reflect ? "white" : "black"} foreground`
          : `current color on ${reflect ? "white" : "black"} background`
      }
      className="grid gap-y-3"
    >
      <header
        className={clsx(
          reflect ? "bg-white" : "bg-black",
          "grid grid-flow-col rounded-lg border",
          invert && reflect ? "text-white" : "text-black",
          invert && "border-transparent",
          !invert && reflect && "border-neutral-400 dark:border-transparent",
          !invert && !reflect && "border-transparent dark:border-neutral-700",
        )}
        style={
          invert
            ? { backgroundColor: "var(--currentColor)" }
            : { color: "var(--currentColor)" }
        }
      >
        <div className="inline-grid p-3 text-left">
          {focusNormal ? (
            <p
              role="textbox"
              className="text-sm"
              contentEditable
              tabIndex={-1}
              dangerouslySetInnerHTML={{ __html: normalText }}
              onBlur={(t) => {
                setNormalText(t.currentTarget.innerHTML);
                setFocusNormal(false);
              }}
              onPointerLeave={() => setFocusNormal(false)}
            />
          ) : (
            <p
              role="textbox"
              className="text-sm"
              tabIndex={-1}
              onClick={() => setFocusNormal(true)}
              onPointerEnter={() => setFocusNormal(true)}
            >
              {normalText}
            </p>
          )}
          {focusLarge ? (
            <p
              role="textbox"
              className="text-xl font-semibold md:text-2xl"
              contentEditable
              tabIndex={-1}
              dangerouslySetInnerHTML={{ __html: largeText }}
              onBlur={(t) => {
                setLargeText(t.currentTarget.innerHTML);
                setFocusLarge(false);
              }}
              onPointerLeave={() => setFocusLarge(false)}
            />
          ) : (
            <p
              role="textbox"
              className="text-xl font-semibold md:text-2xl"
              tabIndex={-1}
              onClick={() => setFocusLarge(true)}
              onPointerEnter={() => setFocusLarge(true)}
            >
              {largeText}
            </p>
          )}
        </div>
        <button
          aria-label={
            invert
              ? "set current color as foreground"
              : "set current color as background"
          }
          className="mt-2 mr-2 inline-flex size-8 items-center justify-center rounded-2xl"
          onClick={() => setInvert(!invert)}
        >
          <svg
            role="presentation"
            className="size-6"
            width={24}
            height={24}
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M10.5 22.6152V20.5H5.30775C4.80258 20.5 4.375 20.325 4.025 19.975C3.675 19.625 3.5 19.1974 3.5 18.6922V5.30773C3.5 4.80257 3.675 4.37498 4.025 4.02498C4.375 3.67498 4.80258 3.49998 5.30775 3.49998H10.5V1.38474H12V22.6152H10.5ZM5 18H10.5V11.4037L5 18ZM14 20.5V12L19 18V5.30773C19 5.23073 18.9679 5.16023 18.9038 5.09623C18.8398 5.03207 18.7693 4.99998 18.6923 4.99998H14V3.49998H18.6923C19.1974 3.49998 19.625 3.67498 19.975 4.02498C20.325 4.37498 20.5 4.80257 20.5 5.30773V18.6922C20.5 19.1974 20.325 19.625 19.975 19.975C19.625 20.325 19.1974 20.5 18.6923 20.5H14Z"
            />
          </svg>
        </button>
      </header>
      <div className="flex">
        <h2 className="inline-flex grow-0 flex-col">
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
        <div className="ml-4 grow border-l border-l-neutral-400 pl-4 dark:border-l-neutral-700">
          <div className="flex flex-nowrap justify-between">
            <p className="text-sm">WCAG Normal</p>
            <p className="text-sm">
              AA:{" "}
              <span
                className={clsx(
                  normal.aa === "Pass" && "text-green-700 dark:text-green-400",
                  normal.aa === "Fail" && "text-red-700 dark:text-red-400",
                )}
              >
                {normal.aa}
              </span>
            </p>
            <p className="text-sm">
              AAA:{" "}
              <span
                className={clsx(
                  normal.aaa === "Pass" && "text-green-700 dark:text-green-400",
                  normal.aaa === "Fail" && "text-red-700 dark:text-red-400",
                )}
              >
                {normal.aaa}
              </span>
            </p>
          </div>
          <div className="mt-2 flex flex-nowrap justify-between border-t border-t-neutral-400 pt-2 dark:border-t-neutral-700">
            <p className="text-sm">WCAG Large</p>
            <p className="text-sm">
              AA:{" "}
              <span
                className={clsx(
                  large.aa === "Pass" && "text-green-700 dark:text-green-400",
                  large.aa === "Fail" && "text-red-700 dark:text-red-400",
                )}
              >
                {large.aa}
              </span>
            </p>
            <p className="text-sm">
              AAA:{" "}
              <span
                className={clsx(
                  large.aaa === "Pass" && "text-green-700 dark:text-green-400",
                  large.aaa === "Fail" && "text-red-700 dark:text-red-400",
                )}
              >
                {large.aaa}
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

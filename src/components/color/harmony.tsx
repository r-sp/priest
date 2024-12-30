"use client";

import type { HarmonyVariant, ColorFormat, ColorSpace } from "~/lib/types";
import { useCallback, useRef } from "react";
import { useColor, useMode, useGamut, useHarmony } from "~/app/store";
import { limiter } from "~/lib/utils";
import {
  convertRgb,
  convertLab,
  convertOklab,
  formatPathMode,
  formatColorMode,
  formatCssMode,
} from "~/lib/color";
import Link from "next/link";
import clsx from "clsx";

export default function ColorHarmony() {
  const [{ hsl, hwb, lch, oklch }] = useColor();
  const [mode] = useMode();
  const [gamut] = useGamut();
  const [harmony] = useHarmony();

  const hueBase = gamut
    ? mode === "lch"
      ? lch.color.h
      : oklch.color.h
    : mode === "hwb"
      ? hwb.color.h
      : hsl.color.h;

  const hueShift = useCallback(
    (angle: number[]) =>
      angle.map((deg) => {
        const colorHsl = { ...hsl.color, h: deg };
        const colorHwb = { ...hwb.color, h: deg };
        const colorLch = { ...lch.color, h: deg };
        const colorOklch = { ...oklch.color, h: deg };

        const rgb = convertRgb({ mode: "hsl", ...colorHsl });
        const colorRgb = { r: rgb.r, g: rgb.g, b: rgb.b };

        const lab = convertLab({ mode: "lch", ...colorLch });
        const colorLab = { l: lab.l, a: lab.a, b: lab.b };

        const oklab = convertOklab({ mode: "oklch", ...colorOklch });
        const colorOklab = { l: oklab.l, a: oklab.a, b: oklab.b };

        return {
          rgb: colorRgb,
          hsl: colorHsl,
          hwb: colorHwb,
          lab: colorLab,
          lch: colorLch,
          oklab: colorOklab,
          oklch: colorOklch,
        };
      }),
    [hsl, hwb, lch, oklch],
  );

  const hue = useCallback(
    (deg: number[]) =>
      hueShift(
        deg.map((angle) => limiter(hueBase ? hueBase + angle : angle, 0, 360)),
      ),
    [hueBase, hueShift],
  );

  return (
    <div role="none" className="mx-auto inline-grid w-full max-w-7xl gap-y-8">
      <Navigation>
        <Button select="complementary" text="Complementary" />
        <Button select="analogous" text="Analogous" />
        <Button select="triadic" text="Triadic" />
        <Button select="split" text="Split Complementary" />
        <Button select="tetradic" text="Tetradic" />
        <Button select="rectangle" text="Rectangle" />
        <Button select="double" text="Double Split Complementary" />
      </Navigation>
      {harmony === "complementary" ? (
        <Section color={hue([0, 180])} />
      ) : harmony === "analogous" ? (
        <Section color={hue([-30, 0, 30])} />
      ) : harmony === "triadic" ? (
        <Section color={hue([0, 120, 240])} />
      ) : harmony === "split" ? (
        <Section color={hue([0, 150, 210])} />
      ) : harmony === "tetradic" ? (
        <Section color={hue([0, 90, 180, 270])} />
      ) : harmony === "rectangle" ? (
        <Section color={hue([0, 60, 180, 240])} />
      ) : harmony === "double" ? (
        <Section color={hue([-30, 0, 30, 150, 210])} />
      ) : null}
    </div>
  );
}

function Navigation({ children }: { children: React.ReactNode }) {
  const refList = useRef<HTMLDivElement>(null);

  const handleKeyboard = useCallback((e: React.KeyboardEvent) => {
    const list = refList.current;
    if (!list) return;

    const tabs = Array.from<HTMLDivElement>(
      list.querySelectorAll("button:not([disabled])"),
    );

    const index = tabs.indexOf(document.activeElement as HTMLDivElement);
    if (index < 0) return;

    switch (e.key) {
      case "ArrowUp":
      case "ArrowLeft": {
        const next = (index - 1 + tabs.length) % tabs.length;
        tabs[next]?.focus();
        e.preventDefault();
        break;
      }
      case "ArrowDown":
      case "ArrowRight": {
        const next = (index + 1 + tabs.length) % tabs.length;
        tabs[next]?.focus();
        e.preventDefault();
        break;
      }
    }
  }, []);

  return (
    <div
      ref={refList}
      role="menu"
      aria-label="color combinations"
      className="flex flex-wrap justify-center gap-2"
      onKeyDown={handleKeyboard}
    >
      {children}
    </div>
  );
}

function Button({ select, text }: { select: HarmonyVariant; text: string }) {
  const [harmony, setHarmony] = useHarmony();
  const active = select === harmony;

  return (
    <button
      role="menuitemradio"
      aria-checked={active}
      className={clsx(
        "btn inline-flex items-center justify-center rounded-sm border px-2 py-1 text-sm transition-colors select-none",
        active
          ? "border-neutral-400 text-neutral-700 dark:border-neutral-700 dark:text-neutral-300"
          : "border-transparent",
      )}
      tabIndex={active ? 0 : -1}
      onClick={() => setHarmony(select)}
    >
      <span>{text}</span>
    </button>
  );
}

function Section({ color }: { color: ColorSpace[] }) {
  const [mode] = useMode();
  const [harmony] = useHarmony();

  const shades: string[] = [];

  color.map((shade) => {
    shades.push(formatCssMode(mode, shade));
  });

  const gradients = `linear-gradient(to right, ${shades.join(", ")})`;

  return (
    <div role="none" className="grid gap-y-3">
      <ol
        className={clsx(
          "grid w-full gap-3",
          harmony === "complementary" && "sm:grid-cols-2",
          harmony === "analogous" && "sm:grid-cols-2 md:grid-cols-3",
          harmony === "triadic" && "sm:grid-cols-2 md:grid-cols-3",
          harmony === "split" && "sm:grid-cols-2 md:grid-cols-3",
          harmony === "tetradic" &&
            "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
          harmony === "rectangle" &&
            "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
          harmony === "double" &&
            "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
        )}
      >
        {color.map((shade, index) => (
          <li key={index} className="inline-grid">
            <ColorCard color={shade} type={mode} />
          </li>
        ))}
      </ol>
      <div role="presentation" className="frame rounded-lg">
        <span style={{ backgroundImage: gradients }}></span>
      </div>
    </div>
  );
}

function ColorCard({ type, color }: { type: ColorFormat; color: ColorSpace }) {
  const path = formatPathMode(formatColorMode(type, color));
  const style = formatCssMode(type, color);

  return (
    <Link
      href={path}
      className="rounded-lg"
      aria-label={style}
      prefetch={false}
    >
      <div role="presentation" className="frame rounded-lg">
        <span style={{ backgroundColor: style }}></span>
      </div>
    </Link>
  );
}

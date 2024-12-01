"use client";

import { useState, useCallback, useMemo } from "react";
import { type ColorConverter, stringifyHsl, stringifyRgb } from "~/lib/utils";
import type { AnyColor, HarmonyColor } from "~/lib/types";
import { useColorProvider, useColorStore } from "./provider";
import { Tabs, TabList, Tab, TabPanel } from "../ui/tabs";
import Link from "next/link";
import clsx from "clsx";

export default function ColorDetail(props: { hex?: string | undefined }) {
  const { hex, rgb, convert } = useColorProvider();

  const colorHex = props.hex ? `#${props.hex}` : hex;
  const colorRgb = props.hex ? convert(`#${props.hex}`).toRgb() : rgb;

  const colorDisplay = convert(colorRgb);

  return (
    <div className="grid gap-8 px-2 py-4 xl:mx-auto xl:max-w-screen-xl" role="none">
      <ColorConversion hex={colorHex} color={colorDisplay} />
      <ColorAnalysis rgb={stringifyRgb(colorRgb)} color={colorDisplay} />
      <ColorHarmony color={colorDisplay} convert={convert} />
    </div>
  );
}

function ColorConversion({ hex, color }: { hex: string; color: ColorConverter }) {
  const hsl = stringifyHsl(color.toHsl());
  const rgb = stringifyRgb(color.toRgb());
  const brightness = `${Math.round(color.brightness() * 100)}% (${color.isDark() ? "Dark" : "Light"})`;
  const luminance = `${Math.round(color.luminance() * 100)}%`;

  return (
    <section aria-label="color detail" className="grid gap-4">
      <div
        role="presentation"
        className="flex h-36 rounded-lg px-4 py-2 text-center text-lg md:h-48 lg:h-60 xl:h-80 max-sm:h-48"
        style={{ backgroundColor: rgb }}
      ></div>
      <p className="inline-grid" tabIndex={0}>
        <span className="text-sm font-medium text-holy-400">HEX</span>
        <code className="font-mono text-base text-holy-100">{hex}</code>
      </p>
      <p className="inline-grid" tabIndex={0}>
        <span className="text-sm font-medium text-holy-400">HSL</span>
        <code className="font-mono text-base text-holy-100">{hsl}</code>
      </p>
      <p className="inline-grid" tabIndex={0}>
        <span className="text-sm font-medium text-holy-400">RGB</span>
        <code className="font-mono text-base text-holy-100">{rgb}</code>
      </p>
      <p className="inline-grid" tabIndex={0}>
        <span className="text-sm font-medium text-holy-400">Brightness</span>
        <code className="font-mono text-base text-holy-100">{brightness}</code>
      </p>
      <p className="inline-grid" tabIndex={0}>
        <span className="text-sm font-medium text-holy-400">Luminance</span>
        <code className="font-mono text-base text-holy-100">{luminance}</code>
      </p>
    </section>
  );
}

function ColorAnalysis({ rgb, color }: { rgb: string; color: ColorConverter }) {
  const [preview, setPreview] = useState<"light" | "dark">("dark");

  const textPreview = "What's your favorite color and why?";
  const colorWhite = "rgb(255, 255, 255)";
  const colorBlack = "rgb(0, 0, 0)";

  const whiteContrast = `${color.contrast(colorWhite)}:1`;
  const blackContrast = `${color.contrast(colorBlack)}:1`;

  const whiteNormalAA = color.isReadable(colorWhite, { level: "AA", size: "normal" });
  const whiteNormalAAA = color.isReadable(colorWhite, { level: "AAA", size: "normal" });
  const whiteLargeAA = color.isReadable(colorWhite, { level: "AA", size: "large" });
  const whiteLargeAAA = color.isReadable(colorWhite, { level: "AAA", size: "large" });

  const blackNormalAA = color.isReadable(colorBlack, { level: "AA", size: "normal" });
  const blackNormalAAA = color.isReadable(colorBlack, { level: "AAA", size: "normal" });
  const blackLargeAA = color.isReadable(colorBlack, { level: "AA", size: "large" });
  const blackLargeAAA = color.isReadable(colorBlack, { level: "AAA", size: "large" });

  return (
    <Tabs label="color analysis" initValue={{ section: "dark" }}>
      <TabList label="color scheme">
        <Tab select="light" callback={() => setPreview("light")}>
          Light
        </Tab>
        <Tab select="dark" callback={() => setPreview("dark")}>
          Dark
        </Tab>
      </TabList>
      <TabPanel>
        <div className="grid gap-4">
          <p
            className="flex h-36 items-center justify-center rounded-lg px-4 py-2 text-center text-lg md:h-48 lg:h-60 xl:h-80 max-sm:h-48"
            style={
              preview === "light"
                ? { backgroundColor: colorWhite, color: rgb, border: "1px solid currentColor" }
                : { backgroundColor: colorBlack, color: rgb, border: "1px solid currentColor" }
            }
            tabIndex={0}
          >
            {textPreview}
          </p>
          <p className="inline-grid" tabIndex={0}>
            <span className="text-sm font-medium text-holy-400">Contrast Ratio</span>
            <code className="font-mono text-base text-holy-100">{preview === "light" ? whiteContrast : blackContrast}</code>
          </p>
          <p className="inline-grid" tabIndex={0}>
            <span className="text-sm font-medium text-holy-400">{`WCAG AA (Normal)`}</span>
            <code className="font-mono text-base text-holy-100">
              {(preview === "light" ? whiteNormalAA : blackNormalAA) ? "Pass" : "Fail"}
            </code>
          </p>
          <p className="inline-grid" tabIndex={0}>
            <span className="text-sm font-medium text-holy-400">{`WCAG AAA (Normal)`}</span>
            <code className="font-mono text-base text-holy-100">
              {(preview === "light" ? whiteNormalAAA : blackNormalAAA) ? "Pass" : "Fail"}
            </code>
          </p>
          <p className="inline-grid" tabIndex={0}>
            <span className="text-sm font-medium text-holy-400">{`WCAG AA (Large)`}</span>
            <code className="font-mono text-base text-holy-100">
              {(preview === "light" ? whiteLargeAA : blackLargeAA) ? "Pass" : "Fail"}
            </code>
          </p>
          <p className="inline-grid" tabIndex={0}>
            <span className="text-sm font-medium text-holy-400">{`WCAG AAA (Large)`}</span>
            <code className="font-mono text-base text-holy-100">
              {(preview === "light" ? whiteLargeAAA : blackLargeAAA) ? "Pass" : "Fail"}
            </code>
          </p>
        </div>
      </TabPanel>
    </Tabs>
  );
}

function ColorHarmony({ color, convert }: { color: ColorConverter; convert: (newColor: AnyColor) => ColorConverter }) {
  const store = useColorStore((state) => state);

  const hsl = color.toHsl();

  const [harmonyType, setHarmonyType] = useState<HarmonyColor>(store.harmony);

  const harmony = useCallback(() => {
    const baseHue = hsl.h;

    const hue = (deg: number) => {
      const angle = Math.round(deg + baseHue);

      return ((angle % 360) + 360) % 360;
    };

    const hueShift = (harmonies: number[]) =>
      harmonies.map((c) => {
        const newColor = convert({ ...hsl, h: c });

        return { hex: newColor.toHex(), rgb: newColor.toRgb() };
      });

    switch (harmonyType) {
      case "complementary":
        return hueShift([baseHue, hue(180)]);
        break;
      case "analogous":
        return hueShift([hue(-30), baseHue, hue(30)]);
        break;
      case "triadic":
        return hueShift([baseHue, hue(120), hue(240)]);
        break;
      case "split-complementary":
        return hueShift([baseHue, hue(150), hue(210)]);
        break;
      case "tetradic":
        return hueShift([baseHue, hue(90), hue(180), hue(270)]);
        break;
      case "rectangle":
        return hueShift([baseHue, hue(60), hue(180), hue(240)]);
        break;
      case "double-split-complementary":
        return hueShift([hue(-30), baseHue, hue(30), hue(150), hue(210)]);
        break;
    }
  }, [harmonyType, convert, hsl]);

  const harmonies = useMemo(() => harmony(), [harmony]);

  const updateSection = (type: HarmonyColor) => {
    setHarmonyType(type);
    store.setHarmony(type);
  };

  return (
    <Tabs label="color harmony" initValue={{ section: harmonyType }}>
      <TabList label="color combinations">
        <Tab select="complementary" callback={() => updateSection("complementary")}>
          Complementarty
        </Tab>
        <Tab select="analogous" callback={() => updateSection("analogous")}>
          Analogous
        </Tab>
        <Tab select="triadic" callback={() => updateSection("triadic")}>
          Triadic
        </Tab>
        <Tab select="split-complementary" callback={() => updateSection("split-complementary")}>
          Split Complementary
        </Tab>
        <Tab select="tetradic" callback={() => updateSection("tetradic")}>
          Tetradic
        </Tab>
        <Tab select="rectangle" callback={() => updateSection("rectangle")}>
          Rectangle
        </Tab>
        <Tab select="double-split-complementary" callback={() => updateSection("double-split-complementary")}>
          Double Split Complementary
        </Tab>
      </TabList>
      <TabPanel>
        <ul
          aria-label={`${harmonies.length} colors`}
          className={clsx(
            "grid gap-4",
            harmonyType === "complementary" && "sm:grid-cols-2",
            harmonyType === "analogous" && "sm:grid-cols-3",
            harmonyType === "triadic" && "sm:grid-cols-3",
            harmonyType === "split-complementary" && "sm:grid-cols-3",
            harmonyType === "tetradic" && "sm:grid-cols-4",
            harmonyType === "rectangle" && "sm:grid-cols-4",
            harmonyType === "double-split-complementary" && "sm:grid-cols-5",
          )}
        >
          {harmonies.map((c, i) => (
            <li key={i} aria-label={c.hex} className="inline-grid">
              <Link aria-label={`Color: ${c.hex}`} href={`/color/${c.hex.replace("#", "")}`} className="flex rounded-lg">
                <span
                  role="presentation"
                  className="inline-flex h-36 w-full rounded-lg md:h-48 lg:h-60 xl:h-80 max-sm:h-48"
                  style={{ backgroundColor: stringifyRgb(c.rgb) }}
                ></span>
              </Link>
            </li>
          ))}
        </ul>
      </TabPanel>
    </Tabs>
  );
}

"use client";

import { useState, useMemo } from "react";
import { useColorProvider, useColorStore } from "../provider";
import { type HarmonyColor } from "~/lib/types";
import ColorCard from "./color-card";
import clsx from "clsx";

export default function ColorHarmony() {
  const store = useColorStore((state) => state);
  const [section, setSection] = useState<HarmonyColor>(store.harmony);
  const { rgb, convert } = useColorProvider();

  const color = convert(rgb);
  const harmony = useMemo(() => {
    const variety = color.harmonies(section).map((c) => {
      return { hex: c.toHex(), rgb: c.toRgb() };
    });

    return variety;
  }, [section, color]);

  const updateSection = (type: HarmonyColor) => {
    setSection(type);
    store.setHarmony(type);
  };

  return (
    <div className="py-6" role="none">
      <h2 className="text-3xl font-semibold text-holy-100">Color Harmony</h2>
      <nav aria-label="color combinations" className="mt-4 flex flex-wrap gap-2">
        <button
          className={clsx(
            section === "complementary" ? "text-holy-100" : "text-holy-300",
            "rounded-md border-holy-700 px-2 py-1 text-sm font-normal hover:bg-holy-800 focus:bg-holy-800 active:border-holy-600 active:bg-holy-700",
          )}
          onClick={() => updateSection("complementary")}
        >
          <span>Complementary</span>
        </button>
        <button
          className={clsx(
            section === "analogous" ? "text-holy-100" : "text-holy-300",
            "rounded-md border-holy-700 px-2 py-1 text-sm font-normal hover:bg-holy-800 focus:bg-holy-800 active:border-holy-600 active:bg-holy-700",
          )}
          onClick={() => updateSection("analogous")}
        >
          <span>Analogous</span>
        </button>
        <button
          className={clsx(
            section === "triadic" ? "text-holy-100" : "text-holy-300",
            "rounded-md border-holy-700 px-2 py-1 text-sm font-normal hover:bg-holy-800 focus:bg-holy-800 active:border-holy-600 active:bg-holy-700",
          )}
          onClick={() => updateSection("triadic")}
        >
          <span>Triadic</span>
        </button>
        <button
          className={clsx(
            section === "split-complementary" ? "text-holy-100" : "text-holy-300",
            "rounded-md border-holy-700 px-2 py-1 text-sm font-normal hover:bg-holy-800 focus:bg-holy-800 active:border-holy-600 active:bg-holy-700",
          )}
          onClick={() => updateSection("split-complementary")}
        >
          Split Complementary<span></span>
        </button>
        <button
          className={clsx(
            section === "tetradic" ? "text-holy-100" : "text-holy-300",
            "rounded-md border-holy-700 px-2 py-1 text-sm font-normal hover:bg-holy-800 focus:bg-holy-800 active:border-holy-600 active:bg-holy-700",
          )}
          onClick={() => updateSection("tetradic")}
        >
          <span>Tetradic</span>
        </button>
        <button
          className={clsx(
            section === "rectangle" ? "text-holy-100" : "text-holy-300",
            "rounded-md border-holy-700 px-2 py-1 text-sm font-normal hover:bg-holy-800 focus:bg-holy-800 active:border-holy-600 active:bg-holy-700",
          )}
          onClick={() => updateSection("rectangle")}
        >
          <span>Rectangle</span>
        </button>
        <button
          className={clsx(
            section === "double-split-complementary" ? "text-holy-100" : "text-holy-300",
            "rounded-md border-holy-700 px-2 py-1 text-sm font-normal hover:bg-holy-800 focus:bg-holy-800 active:border-holy-600 active:bg-holy-700",
          )}
          onClick={() => updateSection("double-split-complementary")}
        >
          <span>Double Split Complementary</span>
        </button>
      </nav>
      <section
        aria-label={section.replaceAll("-", " ")}
        className={clsx(
          "mt-6 grid gap-4",
          section === "complementary" && "sm:grid-cols-2",
          section === "analogous" && "sm:grid-cols-3",
          section === "triadic" && "sm:grid-cols-3",
          section === "split-complementary" && "sm:grid-cols-3",
          section === "tetradic" && "sm:grid-cols-4",
          section === "rectangle" && "sm:grid-cols-4",
          section === "double-split-complementary" && "sm:grid-cols-5",
        )}
      >
        {harmony.map((c, i) => (
          <ColorCard color={c} key={i} options={{ copyColor: false, colorName: true }} />
        ))}
      </section>
    </div>
  );
}

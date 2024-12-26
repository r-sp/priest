"use client";

import dynamic from "next/dynamic";
import ThemeScript from "./script";

const ThemeSwitcher = dynamic(() => import("./switcher"), {
  ssr: false,
  loading: () => (
    <div className="h-8 w-24 rounded-2xl bg-neutral-200 dark:bg-neutral-900"></div>
  ),
});

export { ThemeScript, ThemeSwitcher };

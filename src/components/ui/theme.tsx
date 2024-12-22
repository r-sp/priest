"use client";

import dynamic from "next/dynamic";

const ThemeSwitcher = dynamic(() => import("../theme/switcher"), {
  ssr: false,
  loading: () => (
    <div className="h-8 w-24 rounded-2xl bg-neutral-200 dark:bg-neutral-900"></div>
  ),
});

export default function Theme() {
  return <ThemeSwitcher />;
}

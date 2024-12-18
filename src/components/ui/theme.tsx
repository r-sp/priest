"use client";

import dynamic from "next/dynamic";

const ThemeSwitcher = dynamic(() => import("../theme/switcher"), {
  ssr: false,
});

export default function Theme() {
  return <ThemeSwitcher />;
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import InputRgb from "../color/input-rgb";
import InputHsl from "../color/input-hsl";
import InputLab from "../color/input-lab";
import InputOklab from "../color/input-oklab";
import InputLch from "../color/input-lch";
import InputOklch from "../color/input-oklch";

export default function Playground() {
  const [themeDark, setThemeDark] = useState<boolean>(true);

  useEffect(() => {
    const html = document.documentElement;
    if (themeDark) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  });

  return (
    <article className="grid gap-8 px-4 py-8">
      <header className="mx-auto w-full max-w-3xl">
        <h1 className="inline-block text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
          <Link
            href="/"
            className="text-inherit"
            onContextMenu={(e) => {
              e.preventDefault();
              setThemeDark(!themeDark);
            }}
          >
            Color Space
          </Link>
        </h1>
      </header>
      <InputRgb />
      <InputHsl />
      <InputLab />
      <InputOklab />
      <InputLch />
      <InputOklch />
    </article>
  );
}

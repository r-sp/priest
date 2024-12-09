"use client";

import { useState, useEffect } from "react";
import { useColorStore } from "../color/provider";
import { parseHex } from "~/lib/color";
import { ColorInput } from "../color";
import Link from "next/link";

export default function Playground() {
  const [themeDark, setThemeDark] = useState<boolean>(true);
  const lib = useColorStore((state) => state);

  const colorHex = lib.hex;
  const colorRgb = lib.rgb.css;
  const colorHsl = lib.hsl.css;
  const colorHwb = lib.hwb.css;
  const colorLch = lib.lch.css;
  const colorLab = lib.lab.css;
  const colorOklch = lib.oklch.css;
  const colorOklab = lib.oklab.css;

  const rgb2hex = parseHex({ mode: "rgb", ...lib.rgb.color });
  const hsl2hex = parseHex({ mode: "hsl", ...lib.hsl.color });
  const hwb2hex = parseHex({ mode: "hwb", ...lib.hwb.color });
  const lch2hex = parseHex({ mode: "lch", ...lib.lch.color });
  const lab2hex = parseHex({ mode: "lab", ...lib.lab.color });
  const oklab2hex = parseHex({ mode: "oklab", ...lib.oklab.color });
  const oklch2hex = parseHex({ mode: "oklch", ...lib.oklch.color });

  useEffect(() => {
    const html = document.documentElement;
    if (themeDark) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  });

  return (
    <article className="grid gap-8 px-4 pt-8 pb-24">
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
        <div className="mt-4 flex items-center gap-2">
          <span
            role="presentation"
            className="block size-10 rounded-lg"
            style={{ backgroundColor: colorHex }}
          ></span>
          <Link href={`/color/${colorHex.replace("#", "")}`}>
            <code className="text-lg">{colorHex}</code>
          </Link>
        </div>
      </header>
      <section
        aria-labelledby="color-rgb"
        className="mx-auto grid w-full max-w-3xl gap-4 border-t border-t-neutral-400 pt-8 dark:border-t-neutral-700"
      >
        <Link
          aria-label={rgb2hex}
          href={`/color/${rgb2hex.replace("#", "")}`}
          className="frame rounded-lg"
        >
          <span style={{ backgroundColor: colorRgb }}></span>
        </Link>
        <h2 id="color-rgb">
          <code className="text-neutral-700 dark:text-neutral-300">
            {colorRgb}
          </code>
        </h2>
        <ColorInput.Rgb />
      </section>
      <section
        aria-labelledby="color-hsl"
        className="mx-auto grid w-full max-w-3xl gap-4 border-t border-t-neutral-400 pt-8 dark:border-t-neutral-700"
      >
        <Link
          aria-label={hsl2hex}
          href={`/color/${hsl2hex.replace("#", "")}`}
          className="frame rounded-lg"
        >
          <span style={{ backgroundColor: colorHsl }}></span>
        </Link>
        <h2 id="color-hsl">
          <code className="text-neutral-700 dark:text-neutral-300">
            {colorHsl}
          </code>
        </h2>
        <ColorInput.Hsl />
      </section>
      <section
        aria-labelledby="color-hwb"
        className="mx-auto grid w-full max-w-3xl gap-4 border-t border-t-neutral-400 pt-8 dark:border-t-neutral-700"
      >
        <Link
          aria-label={hwb2hex}
          href={`/color/${hwb2hex.replace("#", "")}`}
          className="frame rounded-lg"
        >
          <span style={{ backgroundColor: colorHwb }}></span>
        </Link>
        <h2 id="color-hwb">
          <code className="text-neutral-700 dark:text-neutral-300">
            {colorHwb}
          </code>
        </h2>
        <ColorInput.Hwb />
      </section>
      <section
        aria-labelledby="color-lch"
        className="mx-auto grid w-full max-w-3xl gap-4 border-t border-t-neutral-400 pt-8 dark:border-t-neutral-700"
      >
        <Link
          aria-label={lch2hex}
          href={`/color/${lch2hex.replace("#", "")}`}
          className="frame rounded-lg"
        >
          <span style={{ backgroundColor: colorLch }}></span>
        </Link>
        <h2 id="color-lch">
          <code className="text-neutral-700 dark:text-neutral-300">
            {colorLch}
          </code>
        </h2>
        <ColorInput.Lch />
      </section>
      <section
        aria-labelledby="color-oklch"
        className="mx-auto grid w-full max-w-3xl gap-4 border-t border-t-neutral-400 pt-8 dark:border-t-neutral-700"
      >
        <Link
          aria-label={oklch2hex}
          href={`/color/${oklch2hex.replace("#", "")}`}
          className="frame rounded-lg"
        >
          <span style={{ backgroundColor: colorOklch }}></span>
        </Link>
        <h2 id="color-oklch">
          <code className="text-neutral-700 dark:text-neutral-300">
            {colorOklch}
          </code>
        </h2>
        <ColorInput.Oklch />
      </section>
      <section
        aria-labelledby="color-lab"
        className="mx-auto grid w-full max-w-3xl gap-4 border-t border-t-neutral-400 pt-8 dark:border-t-neutral-700"
      >
        <Link
          aria-label={lab2hex}
          href={`/color/${lab2hex.replace("#", "")}`}
          className="frame rounded-lg"
        >
          <span style={{ backgroundColor: colorLab }}></span>
        </Link>
        <h2 id="color-lab">
          <code className="text-neutral-700 dark:text-neutral-300">
            {colorLab}
          </code>
        </h2>
        <ColorInput.Lab />
      </section>
      <section
        aria-labelledby="color-oklab"
        className="mx-auto grid w-full max-w-3xl gap-4 border-t border-t-neutral-400 pt-8 dark:border-t-neutral-700"
      >
        <Link
          aria-label={oklab2hex}
          href={`/color/${oklab2hex.replace("#", "")}`}
          className="frame rounded-lg"
        >
          <span style={{ backgroundColor: colorOklab }}></span>
        </Link>
        <h2 id="color-oklab">
          <code className="text-neutral-700 dark:text-neutral-300">
            {colorOklab}
          </code>
        </h2>
        <ColorInput.Oklab />
      </section>
    </article>
  );
}

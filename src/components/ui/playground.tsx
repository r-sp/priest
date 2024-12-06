"use client";

import { useState, useEffect } from "react";
import { useColorStore } from "../color/provider";
import { initColorStore } from "~/lib/color";
import clsx from "clsx";
import Link from "next/link";
import InputRgb from "../color/input-rgb";
import InputHsl from "../color/input-hsl";
import InputLab from "../color/input-lab";
import InputOklab from "../color/input-oklab";
import InputLch from "../color/input-lch";
import InputOklch from "../color/input-oklch";

export default function Playground() {
  const [themeDark, setThemeDark] = useState<boolean>(true);
  const store = useColorStore((state) => state);

  useEffect(() => {
    const html = document.documentElement;
    if (themeDark) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  });

  const randomColor = () => {
    const random = initColorStore();

    store.setRgb(random.rgb.color);
    store.setHsl(random.hsl.color);
    store.setLab(random.lab.color);
    store.setLch(random.lch.color);
    store.setOklab(random.oklab.color);
    store.setOklch(random.oklch.color);
  };

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
      </header>
      <InputRgb />
      <InputHsl />
      <InputLab />
      <InputOklab />
      <InputLch />
      <InputOklch />
      <aside className="pointer-events-none fixed inset-0 z-2 mx-auto flex w-full max-w-4xl items-end justify-end px-4 pb-8">
        <button
          aria-label="generate random color"
          className={clsx(
            "pointer-events-auto inline-flex size-10 cursor-pointer items-center justify-center rounded-full",
            themeDark
              ? "bg-neutral-100 text-neutral-900 hover:bg-neutral-300 focus:bg-neutral-200 active:bg-neutral-400"
              : "bg-neutral-900 text-neutral-100 hover:bg-neutral-700 focus:bg-neutral-800 active:bg-neutral-600",
          )}
          onClick={randomColor}
        >
          <svg
            role="presentation"
            className="size-6"
            height={24}
            width={24}
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M5.16725 15.627C4.86475 15.0642 4.63625 14.4831 4.48175 13.8838C4.32725 13.2843 4.25 12.673 4.25 12.05C4.25 9.88717 5.00258 8.0465 6.50775 6.528C8.01292 5.00933 9.84367 4.25 12 4.25H12.7808L10.9308 2.4L11.9845 1.34625L15.6385 5L11.9845 8.65375L10.9308 7.6L12.7808 5.75H12C10.2628 5.75 8.78683 6.3615 7.572 7.5845C6.35733 8.80767 5.75 10.2962 5.75 12.05C5.75 12.4642 5.79517 12.8779 5.8855 13.2912C5.976 13.7047 6.11158 14.1083 6.29225 14.502L5.16725 15.627ZM12.0155 22.6538L8.3615 19L12.0155 15.3462L13.0693 16.4L11.2192 18.25H12C13.7372 18.25 15.2132 17.6385 16.428 16.4155C17.6427 15.1923 18.25 13.7038 18.25 11.95C18.25 11.5358 18.2048 11.1221 18.1145 10.7087C18.024 10.2952 17.8884 9.89167 17.7078 9.498L18.8328 8.373C19.1353 8.93583 19.3637 9.51692 19.5182 10.1163C19.6727 10.7158 19.75 11.327 19.75 11.95C19.75 14.1128 18.9974 15.9535 17.4923 17.472C15.9871 18.9907 14.1563 19.75 12 19.75H11.2192L13.0693 21.6L12.0155 22.6538Z"
            />
          </svg>
        </button>
      </aside>
    </article>
  );
}

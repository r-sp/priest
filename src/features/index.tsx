"use client";

import dynamic from "next/dynamic";

export { default as ThemeScript } from "./theme/script";

export const ThemeSwitcher = dynamic(() => import("./theme/switcher"), {
  ssr: false,
  loading: () => (
    <div className="h-8 w-24 rounded-2xl bg-neutral-200 dark:bg-neutral-900"></div>
  ),
});

export const Slider = dynamic(() => import("./input/slider"), {
  loading: () => (
    <div className="grid gap-4">
      <div className="inline-grid h-5 rounded-2xl bg-neutral-200 dark:bg-neutral-900"></div>
      <div className="inline-grid h-5 rounded-2xl bg-neutral-200 dark:bg-neutral-900"></div>
      <div className="inline-grid h-5 rounded-2xl bg-neutral-200 dark:bg-neutral-900"></div>
    </div>
  ),
});

export const Textbox = dynamic(() => import("./input/textbox"), {
  loading: () => (
    <div className="h-10 w-full rounded-md bg-neutral-200 dark:bg-neutral-900"></div>
  ),
});

export const Shades = dynamic(() => import("../app/playground/shades"), {
  loading: () => (
    <div className="mx-auto flex w-full flex-col gap-2 sm:flex-row sm:flex-wrap">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((list) => (
        <ol
          key={list}
          className="flex grow-1 basis-auto flex-col gap-2 max-sm:flex-row max-sm:flex-wrap"
        >
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
            <li
              key={item}
              className="relative aspect-square max-sm:grow-1 max-sm:basis-auto"
            >
              <div className="absolute inset-0 rounded-md bg-neutral-200 max-sm:rounded-sm dark:bg-neutral-900"></div>
            </li>
          ))}
        </ol>
      ))}
    </div>
  ),
});

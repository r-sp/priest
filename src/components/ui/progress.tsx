"use client";

import { round, percentage } from "~/lib/utils";

export default function Progress({
  value,
  style,
  min = 0,
  max = 100,
  percent = true,
  gradient = true,
}: {
  value: number;
  style: string;
  min?: number;
  max?: number;
  percent?: boolean;
  gradient?: boolean;
}) {
  const progress = percentage(value, min, max);

  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={min}
      aria-valuemax={max}
      className="relative z-0 flex flex-nowrap overflow-hidden rounded-2xl text-neutral-700 select-none dark:text-neutral-300"
      style={{
        ["--bg" as string]: style,
      }}
      tabIndex={0}
    >
      <div
        role="presentation"
        className="inline-flex h-6 w-full rounded-2xl border-r border-r-neutral-400 dark:border-r-neutral-700"
        style={
          gradient
            ? { backgroundImage: "var(--bg)" }
            : { backgroundColor: "var(--bg)" }
        }
      ></div>
      <span
        className="absolute right-0 z-1 inline-flex h-6 items-center rounded-e-2xl border border-l-0 border-neutral-400 bg-neutral-100 px-3 text-sm whitespace-nowrap dark:border-neutral-700 dark:bg-neutral-900"
        style={{ left: `${progress}%` }}
      >
        {percent ? `${progress}%` : round(value, 2)}
      </span>
    </div>
  );
}

"use client";

import { round, percentage } from "~/utils/number";
import Inline from "./inline";
import clsx from "clsx";

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
    <Inline
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={min}
      aria-valuemax={max}
      className="relative z-0 flex flex-nowrap overflow-hidden rounded-2xl text-gray-700 select-none dark:text-gray-300"
      bg={style}
      tabIndex={0}
    >
      <div
        role="presentation"
        className={clsx(
          gradient ? "bg-gradient-ref" : "bg-ref",
          "inline-flex h-6 w-full rounded-2xl border-r border-r-gray-300 dark:border-r-gray-700",
        )}
      ></div>
      <span
        className="absolute right-0 z-1 inline-flex h-6 items-center rounded-e-2xl border border-l-0 border-gray-300 bg-gray-100 px-3 text-sm whitespace-nowrap dark:border-gray-700 dark:bg-gray-900"
        style={{ left: `${progress}%` }}
      >
        {percent ? `${progress}%` : round(value, 2)}
      </span>
    </Inline>
  );
}

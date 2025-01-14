"use client";

import type { ComponentPropsWithoutRef } from "react";
import { Fragment } from "react";
import clsx from "clsx";

export default function Chip({
  prefix,
  label,
  group,
  isActive,
  ...props
}: {
  prefix: string;
  label: string;
  group: string;
  isActive: boolean;
} & ComponentPropsWithoutRef<"input">) {
  return (
    <Fragment>
      <input
        type="radio"
        id={`${group}-${prefix}`}
        name={group}
        value={prefix}
        checked={isActive}
        className="sr-only"
        {...props}
      />
      <label
        htmlFor={`${group}-${prefix}`}
        className={clsx(
          "cursor-pointer rounded-md px-2 py-1 ring",
          isActive
            ? "bg-gray-900 text-gray-200 ring-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:ring-gray-200"
            : "bg-gray-100 text-gray-600 ring-gray-200 hover:bg-gray-200 hover:ring-gray-300 dark:bg-gray-900 dark:text-gray-400 dark:ring-gray-800 dark:hover:bg-gray-800 dark:hover:ring-gray-700",
        )}
      >
        {label}
      </label>
    </Fragment>
  );
}

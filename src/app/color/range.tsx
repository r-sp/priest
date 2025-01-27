import type { AnyColorMode } from "~/lib/color";
import { switchColorPath } from "~/lib/query";
import { createRange } from "~/lib/tracks";
import { checkGamut } from "~/lib/gamut";
import clsx from "clsx";
import Link from "next/link";

export default function Range({
  color,
  offset,
}: {
  color: AnyColorMode;
  offset: boolean;
}) {
  const range = checkGamut(color);
  const link = switchColorPath("/color", color);
  const path = range ? `${link}&error=${range}` : link;
  const [start, middle, end] = createRange(color);

  const startValue = Object.values(color)[1] as number;
  const middleValue = Object.values(color)[2] as number;
  const endValue = Object.values(color)[3] as number;

  return (
    <li className="inline-grid justify-items-start">
      <Link
        href={path}
        role="option"
        aria-selected={offset}
        aria-current={offset ? "page" : undefined}
        rel="alternate"
        className={clsx(
          "font-mono",
          offset
            ? "font-medium text-gray-800 dark:text-gray-200"
            : "text-gray-600 dark:text-gray-400",
        )}
        prefetch={false}
      >
        <code>
          <span>{`${color.mode}(`}</span>
          <span
            role="none"
            title={start.label}
            className={
              startValue < start.min || startValue > start.max
                ? "text-red-700 dark:text-red-400"
                : undefined
            }
          >
            {startValue}
          </span>
          {` `}
          <span
            role="none"
            title={middle.label}
            className={
              middleValue < middle.min || middleValue > middle.max
                ? "text-red-700 dark:text-red-400"
                : undefined
            }
          >
            {middleValue}
          </span>
          {` `}
          <span
            role="none"
            title={end.label}
            className={
              endValue < end.min || endValue > end.max
                ? "text-red-700 dark:text-red-400"
                : undefined
            }
          >
            {endValue}
          </span>
          <span>{`)`}</span>
        </code>
      </Link>
    </li>
  );
}

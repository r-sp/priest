import type { ColorLabel, AnyColorMode } from "~/lib/color";
import { switchColorPath } from "~/lib/query";
import { checkGamut } from "~/lib/gamut";
import clsx from "clsx";
import Link from "next/link";

export default function ColorRange({
  color,
  label,
  offset,
  isActive,
}: {
  color: AnyColorMode;
  label: [ColorLabel, ColorLabel, ColorLabel];
  offset: [
    { min: number; max: number },
    { min: number; max: number },
    { min: number; max: number },
  ];
  isActive: boolean;
}) {
  const range = checkGamut(color);
  const link = switchColorPath("/color", color);
  const path = range ? `${link}&error=${range}` : link;

  const [startLabel, middleLabel, endLabel] = label;
  const [startOffset, middleOffset, endOffset] = offset;
  const startValue = Object.values(color)[1] as number;
  const middleValue = Object.values(color)[2] as number;
  const endValue = Object.values(color)[3] as number;

  return (
    <li className="inline-grid justify-items-start">
      <Link
        href={path}
        role="option"
        aria-selected={isActive}
        aria-current={isActive ? "page" : undefined}
        rel="alternate"
        className={clsx(
          "font-mono",
          isActive
            ? "font-medium text-gray-800 dark:text-gray-200"
            : "text-gray-600 dark:text-gray-400",
        )}
        prefetch={false}
      >
        <code>
          <span>{`${color.mode}(`}</span>
          <span
            role="none"
            title={startLabel}
            className={
              startValue < startOffset.min || startValue > startOffset.max
                ? "text-red-700 dark:text-red-400"
                : undefined
            }
          >
            {startValue}
          </span>
          {` `}
          <span
            role="none"
            title={middleLabel}
            className={
              middleValue < middleOffset.min || middleValue > middleOffset.max
                ? "text-red-700 dark:text-red-400"
                : undefined
            }
          >
            {middleValue}
          </span>
          {` `}
          <span
            role="none"
            title={endLabel}
            className={
              endValue < endOffset.min || endValue > endOffset.max
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

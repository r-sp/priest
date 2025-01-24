import type { ReactNode } from "react";
import type { AnyColorMode } from "~/lib/color";
import { switchColorPath } from "~/lib/query";
import { checkGamut } from "~/lib/gamut";
import clsx from "clsx";
import Link from "next/link";

export default function Option({
  children,
  color,
  isActive,
}: {
  children: ReactNode;
  color: AnyColorMode;
  isActive: boolean;
}) {
  const link = switchColorPath("/color", color);
  const offset = checkGamut(color);
  const path = offset ? `${link}&error=${offset}` : link;

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
        {children}
      </Link>
    </li>
  );
}

import type { ReactNode } from "react";
import type { AnyColorMode } from "~/lib/types";
import { createColor, switchCss, switchPath } from "~/lib";
import {
  CheckRgb,
  CheckHsl,
  CheckHwb,
  CheckLab,
  CheckLch,
  CheckOklab,
  CheckOklch,
} from "~/features";
import clsx from "clsx";
import Link from "next/link";

export default function Preview({ color }: { color: AnyColorMode }) {
  const currentCss = switchCss(color);
  const { hex, rgb, hsl, hwb, lab, lch, oklab, oklch } = createColor(color);
  const mode = color.mode;

  return (
    <div className="px-4">
      <article className="mx-auto grid max-w-3xl gap-y-8">
        <header
          className="flex flex-col gap-y-4"
          style={{ ["--bg" as string]: currentCss }}
        >
          <div className="bg-ref aspect-cinema inline-flex w-full rounded-md"></div>
          <h1 className="text-xl text-gray-800 dark:text-gray-200">
            <code>{hex}</code>
          </h1>
        </header>
        <ul
          role="listbox"
          aria-label="color space"
          className="grid gap-y-2 break-words"
        >
          <Css color={{ mode: "rgb", ...rgb.color }} isActive={mode === "rgb"}>
            <CheckRgb color={rgb.color} />
          </Css>
          <Css color={{ mode: "hsl", ...hsl.color }} isActive={mode === "hsl"}>
            <CheckHsl color={hsl.color} />
          </Css>
          <Css color={{ mode: "hwb", ...hwb.color }} isActive={mode === "hwb"}>
            <CheckHwb color={hwb.color} />
          </Css>
          <Css color={{ mode: "lch", ...lch.color }} isActive={mode === "lch"}>
            <CheckLch color={lch.color} />
          </Css>
          <Css
            color={{ mode: "oklch", ...oklch.color }}
            isActive={mode === "oklch"}
          >
            <CheckOklch color={oklch.color} />
          </Css>
          <Css color={{ mode: "lab", ...lab.color }} isActive={mode === "lab"}>
            <CheckLab color={lab.color} />
          </Css>
          <Css
            color={{ mode: "oklab", ...oklab.color }}
            isActive={mode === "oklab"}
          >
            <CheckOklab color={oklab.color} />
          </Css>
        </ul>
      </article>
    </div>
  );
}

function Css({
  children,
  color,
  isActive,
}: {
  children: ReactNode;
  color: AnyColorMode;
  isActive: boolean;
}) {
  return (
    <li className="inline-grid justify-items-start">
      <Link
        href={switchPath("/color", color)}
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

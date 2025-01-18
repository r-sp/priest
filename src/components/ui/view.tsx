"use client";

import { useColor, useMode } from "~/hooks";
import { switchColor, switchCss, switchPath } from "~/lib";
import Link from "next/link";

export default function ColorView() {
  const [color] = useColor();
  const [mode] = useMode();

  const currentPath = switchPath("/color", switchColor(mode, color));
  const currentCss = switchCss(mode, color);

  return (
    <div className="flex" style={{ ["--bg" as string]: currentCss }}>
      <Link
        aria-label="view color"
        href={currentPath}
        className="bg-ref aspect-cinema inline-flex w-full rounded-md"
        prefetch={false}
      >
        <code className="sr-only">{currentCss}</code>
      </Link>
    </div>
  );
}

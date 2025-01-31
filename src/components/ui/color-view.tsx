"use client";

import { useSession } from "~/hooks";
import { switchColorPath, formatCss } from "~/utils";
import Link from "next/link";

export default function ColorView() {
  const color = useSession((state) => state.color);
  const currentPath = switchColorPath("/color", color);
  const currentCss = formatCss(color);

  return (
    <div className="flex" style={{ ["--bg" as string]: currentCss }}>
      <Link
        aria-label="view color"
        href={currentPath}
        className="bg-ref aspect-cinema inline-flex w-full rounded-md"
        prefetch={false}
        scroll={false}
      >
        <code className="sr-only">{currentCss}</code>
      </Link>
    </div>
  );
}

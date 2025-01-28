import type { AnyColorMode } from "~/lib/color";
import { switchColorPath } from "~/lib/query";
import { parseCss } from "~/lib/color";
import Link from "next/link";

export default function ColorView({ color }: { color: AnyColorMode }) {
  const currentPath = switchColorPath("/color", color);
  const currentCss = parseCss(color);

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

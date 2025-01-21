import type { AnyColorMode } from "~/lib/types";
import { switchCss, switchPath } from "~/lib";
import Link from "next/link";

export default function ColorView({ color }: { color: AnyColorMode }) {
  const currentPath = switchPath("/color", color);
  const currentCss = switchCss(color);

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

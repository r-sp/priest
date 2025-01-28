"use client";

import type { AnyColor } from "~/lib/color";
import { useSession } from "~/hooks";

export default function DebugMode() {
  const { hex, rgb, hsl, hwb, lab, lch, oklab, oklch } = useSession(
    (state) => state.shared,
  );
  const color = useSession((state) => state.color);
  const hue = useSession((state) => state.hue);

  return (
    <ul className="max-w-8xl mx-auto grid w-full gap-y-4 break-words">
      <li className="inline-grid">
        <code className="text-gray-700 dark:text-gray-300">
          {`source: ${JSON.stringify(color)}`}
        </code>
      </li>
      <li className="inline-grid">
        <code className="text-gray-700 dark:text-gray-300">{`hue: ${JSON.stringify(hue)}`}</code>
      </li>
      <li className="inline-grid">
        <code className="text-gray-700 dark:text-gray-300">{`hex: ${hex}`}</code>
      </li>
      <DebugColor item={rgb} />
      <DebugColor item={hsl} />
      <DebugColor item={hwb} />
      <DebugColor item={lab} />
      <DebugColor item={lch} />
      <DebugColor item={oklab} />
      <DebugColor item={oklch} />
    </ul>
  );
}

function DebugColor({ item }: { item: { color: AnyColor; css: string } }) {
  const { color, css } = item;
  const raw = JSON.stringify(color);

  return (
    <li className="inline-grid">
      <code className="text-gray-700 dark:text-gray-300">{css}</code>
      <code className="text-gray-700 dark:text-gray-300">{raw}</code>
    </li>
  );
}

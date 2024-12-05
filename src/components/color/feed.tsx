"use client";

import { useMemo, useCallback } from "react";
import { useColorStore } from "./provider";
import { limiterAngle } from "~/lib/utils";
import { colorOklch, formatCss } from "~/lib/color";

export default function ColorFeed() {
  const { oklch } = useColorStore((state) => state);

  const related = useMemo(() => {
    const hue = (deg: number) => {
      return limiterAngle(deg + oklch.color.h!, 0, 360);
    };

    // prettier-ignore
    return [
        hue(15), hue(30), hue(45), hue(60),
        hue(75), hue(90), hue(105), hue(120),
        hue(135), hue(150), hue(165), hue(180),
        hue(195), hue(210), hue(225), hue(240),
        hue(255), hue(270), hue(285), hue(300),
        hue(315), hue(330), hue(345),hue(360),
      ];
  }, [oklch]);

  const generate = useCallback(
    (hue: number) => {
      const color = colorOklch({ ...oklch.color, h: hue });

      return {
        color: { l: color.l, c: color.c, h: color.c },
        css: formatCss(color),
      };
    },
    [oklch],
  );

  const color = useMemo(
    () => related.map((c) => generate(c)),
    [generate, related],
  );

  return (
    <div
      role="presentation"
      className="mx-auto grid w-full max-w-3xl border-t border-t-neutral-400 pt-8 dark:border-t-neutral-700"
    >
      {color.map((c, i) => (
        <div key={i} style={{ backgroundColor: c.css }}>
          <code className="px-4 py-2 text-sm text-neutral-400">{c.css}</code>
        </div>
      ))}
    </div>
  );
}

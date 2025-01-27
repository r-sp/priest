import type { AnyColorMode } from "~/lib/color";
import { createColor, parseCss } from "~/lib/color";
import Range from "./range";
import Notice from "./notice";

export default function Preview({
  color,
  error,
}: {
  color: AnyColorMode;
  error?: string;
}) {
  const currentCss = parseCss(color);
  const { hex, rgb, hsl, hwb, lab, lch, oklab, oklch } = createColor(color);
  const { mode } = color;

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
          <Range
            color={{ mode: "rgb", ...rgb.color }}
            offset={mode === "rgb"}
          />
          <Range
            color={{ mode: "hsl", ...hsl.color }}
            offset={mode === "hsl"}
          />
          <Range
            color={{ mode: "hwb", ...hwb.color }}
            offset={mode === "hwb"}
          />
          <Range
            color={{ mode: "lab", ...lab.color }}
            offset={mode === "lab"}
          />
          <Range
            color={{ mode: "lch", ...lch.color }}
            offset={mode === "lch"}
          />
          <Range
            color={{ mode: "oklab", ...oklab.color }}
            offset={mode === "oklab"}
          />
          <Range
            color={{ mode: "oklch", ...oklch.color }}
            offset={mode === "oklch"}
          />
        </ul>
        {error && <Notice color={color} error={error} />}
      </article>
    </div>
  );
}

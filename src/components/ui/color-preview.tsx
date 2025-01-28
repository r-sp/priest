import type { AnyColorMode } from "~/lib/color";
import { createColor, parseCss } from "~/lib/color";
import { ColorRange, ColorNotice } from "~/components/ui";

export default function ColorPreview({
  color,
  error,
}: {
  color: AnyColorMode;
  error?: string;
}) {
  const currentCss = parseCss(color);
  const { hex, rgb, hsl, hwb, lab, lch, oklab, oklch } = createColor(color);

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
          <ColorRange
            color={{ mode: "rgb", ...rgb.color }}
            label={["red", "green", "blue"]}
            offset={[
              { min: 0, max: 255 },
              { min: 0, max: 255 },
              { min: 0, max: 255 },
            ]}
            isActive={color.mode === "rgb"}
          />
          <ColorRange
            color={{ mode: "hsl", ...hsl.color }}
            label={["hue", "saturation", "lightness"]}
            offset={[
              { min: 0, max: 360 },
              { min: 0, max: 100 },
              { min: 0, max: 100 },
            ]}
            isActive={color.mode === "hsl"}
          />
          <ColorRange
            color={{ mode: "hwb", ...hwb.color }}
            label={["hue", "whiteness", "blackness"]}
            offset={[
              { min: 0, max: 360 },
              { min: 0, max: 100 },
              { min: 0, max: 100 },
            ]}
            isActive={color.mode === "hwb"}
          />
          <ColorRange
            color={{ mode: "lab", ...lab.color }}
            label={["lightness", "green-red", "blue-yellow"]}
            offset={[
              { min: 0, max: 100 },
              { min: -100, max: 100 },
              { min: -100, max: 100 },
            ]}
            isActive={color.mode === "lab"}
          />
          <ColorRange
            color={{ mode: "lch", ...lch.color }}
            label={["lightness", "chroma", "hue"]}
            offset={[
              { min: 0, max: 100 },
              { min: 0, max: 150 },
              { min: 0, max: 360 },
            ]}
            isActive={color.mode === "lch"}
          />
          <ColorRange
            color={{ mode: "oklab", ...oklab.color }}
            label={["lightness", "green-red", "blue-yellow"]}
            offset={[
              { min: 0, max: 1 },
              { min: -0.4, max: 0.4 },
              { min: -0.4, max: 0.4 },
            ]}
            isActive={color.mode === "oklab"}
          />
          <ColorRange
            color={{ mode: "oklch", ...oklch.color }}
            label={["lightness", "chroma", "hue"]}
            offset={[
              { min: 0, max: 1 },
              { min: 0, max: 0.4 },
              { min: 0, max: 360 },
            ]}
            isActive={color.mode === "oklch"}
          />
        </ul>
        {error && <ColorNotice color={color} error={error} />}
      </article>
    </div>
  );
}

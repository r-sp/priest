import type { AnyColorMode } from "~/lib/color";
import { createColor, parseCss } from "~/lib/color";
import {
  CheckRgb,
  CheckHsl,
  CheckHwb,
  CheckLab,
  CheckLch,
  CheckOklab,
  CheckOklch,
} from "~/features";
import Option from "./option";
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
          <Option
            color={{ mode: "rgb", ...rgb.color }}
            isActive={mode === "rgb"}
          >
            <CheckRgb color={rgb.color} />
          </Option>
          <Option
            color={{ mode: "hsl", ...hsl.color }}
            isActive={mode === "hsl"}
          >
            <CheckHsl color={hsl.color} />
          </Option>
          <Option
            color={{ mode: "hwb", ...hwb.color }}
            isActive={mode === "hwb"}
          >
            <CheckHwb color={hwb.color} />
          </Option>
          <Option
            color={{ mode: "lch", ...lch.color }}
            isActive={mode === "lch"}
          >
            <CheckLch color={lch.color} />
          </Option>
          <Option
            color={{ mode: "oklch", ...oklch.color }}
            isActive={mode === "oklch"}
          >
            <CheckOklch color={oklch.color} />
          </Option>
          <Option
            color={{ mode: "lab", ...lab.color }}
            isActive={mode === "lab"}
          >
            <CheckLab color={lab.color} />
          </Option>
          <Option
            color={{ mode: "oklab", ...oklab.color }}
            isActive={mode === "oklab"}
          >
            <CheckOklab color={oklab.color} />
          </Option>
        </ul>
        {error && <Notice color={color} error={error} />}
      </article>
    </div>
  );
}

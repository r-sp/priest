import type { AnyColorMode, ColorFormat, ColorMode } from "~/types/color";
import { samples, interpolate } from "culori/fn";
import { convertColor, setGamut, formatCss, switchColorPath } from "~/utils";
import { Porter } from "../common";

interface Props {
  color: string;
  mode: ColorFormat;
  modal: boolean;
}

export default function ColorScales({ color, mode, modal }: Props) {
  const shades = samples(13)
    .map(interpolate(["#ffffff", color, "#000000"]))
    .filter((_, index, arr) => index > 0 && index < arr.length - 1)
    .map((src: ColorMode<"rgb">) => {
      return convertColor(setGamut(src), mode);
    });

  return (
    <ul
      aria-label="color scales"
      className="-my-6 grid max-w-full grid-cols-11 gap-x-2 overflow-x-auto py-2"
    >
      {shades.map((shade, index) => (
        <Palette key={index} color={shade} modal={modal} order={index} />
      ))}
    </ul>
  );
}

interface ColorCard {
  color: AnyColorMode;
  modal: boolean;
  order: number;
}

function Palette({ color, modal, order }: ColorCard) {
  const css = formatCss(color);
  const link = switchColorPath("/color", color);
  const shade = order === 0 ? 50 : order === 10 ? 950 : order * 100;

  return (
    <li aria-label={`color ${shade}`} className="inline-grid">
      <Porter
        href={link}
        modal={modal}
        className="inline-flex grow-1 rounded-md"
        style={{ ["--bg" as string]: css }}
      >
        <div className="bg-ref pointer-events-none aspect-square min-h-12 w-full rounded-md" />
        <code className="sr-only">{css}</code>
      </Porter>
    </li>
  );
}

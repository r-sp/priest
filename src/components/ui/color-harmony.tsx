import type { AnyColorMode } from "~/types/color";
import {
  createHue,
  createColor,
  round,
  formatCss,
  convertHue,
  checkGamut,
  switchColorPath,
} from "~/utils";
import Link from "next/link";

interface Props {
  color: AnyColorMode;
}

export default function ColorHarmony({ color }: Props) {
  const mode = color.mode;
  const hueBase = createHue(createColor(color), mode);
  const current = hueBase.h!;

  const hue = (deg: number): number => {
    const angle = deg + current;
    const limiter = ((angle % 360) + 360) % 360;
    const decimal = mode === "lch" || mode === "oklch" ? 3 : 2;
    return round(limiter, decimal);
  };

  const hue30s = hue(-30);
  const hue30 = hue(30);
  const hue60 = hue(60);
  const hue90 = hue(90);
  const hue120 = hue(120);
  const hue150 = hue(150);
  const hue180 = hue(180);
  const hue210 = hue(210);
  const hue240 = hue(240);
  const hue270 = hue(270);

  const hueShift = (harmonies: number[]): AnyColorMode[] => {
    return harmonies.map((c) => convertHue({ ...hueBase, h: c }, mode));
  };

  const hueShades: {
    harmony: AnyColorMode[];
    label: string;
    ratio: string;
  }[] = [
    {
      harmony: hueShift([current, hue180]),
      label: "Complementary",
      ratio: "[0, 180]",
    },
    {
      harmony: hueShift([hue30s, current, hue30]),
      label: "Analogous",
      ratio: "[-30, 0, 30]",
    },
    {
      harmony: hueShift([current, hue120, hue240]),
      label: "Triadic",
      ratio: "[0, 120, 240]",
    },
    {
      harmony: hueShift([current, hue150, hue210]),
      label: "Split Complementary",
      ratio: "[0, 150, 210]",
    },
    {
      harmony: hueShift([current, hue90, hue180, hue270]),
      label: "Tetradic",
      ratio: "[0, 90, 180, 270]",
    },
    {
      harmony: hueShift([current, hue60, hue180, hue240]),
      label: "Rectangle",
      ratio: "[0, 60, 180, 240]",
    },
  ];

  return (
    <ul
      aria-label="color harmony"
      className="-mx-2 grid gap-x-4 gap-y-6 pb-8 md:grid-cols-2"
    >
      {hueShades.map((shade, index) => (
        <Harmony key={index} color={shade} />
      ))}
    </ul>
  );
}

interface ColorCard {
  color: {
    harmony: AnyColorMode[];
    label: string;
    ratio: string;
  };
}

function Harmony({ color }: ColorCard) {
  const { harmony, label, ratio } = color;
  return (
    <li
      aria-label={label.toLowerCase()}
      className="inline-grid gap-y-3 rounded-md bg-gray-100 px-2 pt-2 pb-4 dark:bg-gray-900"
    >
      <div role="presentation" className="aspect-cinema flex gap-x-2">
        {harmony.map((shade, index) => (
          <Palette key={index} color={shade} />
        ))}
      </div>
      <div role="none" className="grid">
        <h3 className="text-gray-800 dark:text-gray-200">{label}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <code>{ratio}</code>
        </p>
      </div>
    </li>
  );
}

interface ColorPalette {
  color: AnyColorMode;
}

function Palette({ color }: ColorPalette) {
  const css = formatCss(color);
  const offset = checkGamut(color);
  const path = switchColorPath("/color", color);
  const link = offset ? `${path}&error=${offset}` : path;

  return (
    <Link
      href={link}
      className="inline-flex grow-1 rounded-md"
      prefetch={false}
      replace={true}
      scroll={false}
      style={{ ["--bg" as string]: css }}
    >
      <div className="bg-ref pointer-events-none h-full w-full rounded-md" />
      <code className="sr-only">{css}</code>
    </Link>
  );
}

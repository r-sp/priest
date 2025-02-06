import type { AnyColorMode } from "~/types/color";
import { createHue, createColor, convertHue, round } from "~/utils";

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
    label: string;
    harmony: AnyColorMode[];
  }[] = [
    {
      label: "complementary",
      harmony: hueShift([current, hue180]),
    },
    {
      label: "analogous",
      harmony: hueShift([hue30s, current, hue30]),
    },
    {
      label: "triadic",
      harmony: hueShift([current, hue120, hue240]),
    },
    {
      label: "split-complementary",
      harmony: hueShift([current, hue150, hue210]),
    },
    {
      label: "tetradic",
      harmony: hueShift([current, hue90, hue180, hue270]),
    },
    {
      label: "rectangle",
      harmony: hueShift([current, hue60, hue180, hue240]),
    },
    {
      label: "double-split-complementary",
      harmony: hueShift([hue30s, current, hue30, hue150, hue210]),
    },
  ];

  return (
    <ul className="grid max-w-full gap-y-6 overflow-x-auto pb-6 break-words">
      {hueShades.map((shade, index) => (
        <li key={index} className="inline-grid font-mono">
          {JSON.stringify(shade)}
        </li>
      ))}
    </ul>
  );
}

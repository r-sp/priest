import type {
  RgbColor,
  HslColor,
  HwbColor,
  LabColor,
  LchColor,
  OklabColor,
  OklchColor,
} from "~/lib/types";
import { round } from "~/utils";

const warning = "text-red-700 dark:text-red-400";

export function CheckRgb({ color }: { color: RgbColor }) {
  const { r, g, b } = color;
  const red = round(r * 255);
  const green = round(g * 255);
  const blue = round(b * 255);

  return (
    <code>
      <span>{`rgb(`}</span>
      <span className={r < 0 || r > 1 ? warning : undefined}>{red}</span>{" "}
      <span className={g < 0 || g > 1 ? warning : undefined}>{green}</span>{" "}
      <span className={b < 0 || b > 1 ? warning : undefined}>{blue}</span>
      <span>{`)`}</span>
    </code>
  );
}

export function CheckHsl({ color }: { color: HslColor }) {
  const { h, s, l } = color;
  const hue = round(h || 0, 2);
  const saturation = round(s * 100, 2);
  const lightness = round(l * 100, 2);

  return (
    <code>
      <span>{`hsl(`}</span>
      <span className={h! < 0 || h! > 360 ? warning : undefined}>
        {hue}
      </span>{" "}
      <span className={s < 0 || s > 1 ? warning : undefined}>
        {`${saturation}%`}
      </span>{" "}
      <span className={l < 0 || l > 1 ? warning : undefined}>
        {`${lightness}%`}
      </span>
      <span>{`)`}</span>
    </code>
  );
}

export function CheckHwb({ color }: { color: HwbColor }) {
  const { h, w, b } = color;
  const hue = round(h || 0, 2);
  const whiteness = round(w * 100, 2);
  const blackness = round(b * 100, 2);

  return (
    <code>
      <span>{`hwb(`}</span>
      <span className={h! < 0 || h! > 360 ? warning : undefined}>
        {hue}
      </span>{" "}
      <span
        className={w < 0 || w > 1 ? warning : undefined}
      >{`${whiteness}%`}</span>{" "}
      <span
        className={b < 0 || b > 1 ? warning : undefined}
      >{`${blackness}%`}</span>
      <span>{`)`}</span>
    </code>
  );
}

export function CheckLab({ color }: { color: LabColor }) {
  const { l, a, b } = color;
  const lightness = round(l, 3);
  const greenRed = round(a, 3);
  const blueYellow = round(b, 3);

  return (
    <code>
      <span>{`lab(`}</span>
      <span className={l < 0 || l > 100 ? warning : undefined}>
        {lightness}
      </span>{" "}
      <span className={a < -100 || a > 100 ? warning : undefined}>
        {greenRed}
      </span>{" "}
      <span className={b < -100 || b > 100 ? warning : undefined}>
        {blueYellow}
      </span>
      <span>{`)`}</span>
    </code>
  );
}

export function CheckLch({ color }: { color: LchColor }) {
  const { l, c, h } = color;
  const lightness = round(l, 3);
  const chroma = round(c, 3);
  const hue = round(h || 0, 3);

  return (
    <code>
      <span>{`lch(`}</span>
      <span className={l < 0 || l > 100 ? warning : undefined}>
        {lightness}
      </span>{" "}
      <span className={c < 0 || c > 150 ? warning : undefined}>{chroma}</span>{" "}
      <span className={h! < 0 || h! > 360 ? warning : undefined}>{hue}</span>
      <span>{`)`}</span>
    </code>
  );
}

export function CheckOklab({ color }: { color: OklabColor }) {
  const { l, a, b } = color;
  const lightness = round(l, 3);
  const greenRed = round(a, 3);
  const blueYellow = round(b, 3);

  return (
    <code>
      <span>{`oklab(`}</span>
      <span className={l < 0 || l > 1 ? warning : undefined}>
        {lightness}
      </span>{" "}
      <span className={a < -0.4 || a > 0.4 ? warning : undefined}>
        {greenRed}
      </span>{" "}
      <span className={b < -0.4 || b > 0.4 ? warning : undefined}>
        {blueYellow}
      </span>
      <span>{`)`}</span>
    </code>
  );
}

export function CheckOklch({ color }: { color: OklchColor }) {
  const { l, c, h } = color;
  const lightness = round(l, 3);
  const chroma = round(c, 3);
  const hue = round(h || 0, 3);

  return (
    <code>
      <span>{`oklch(`}</span>
      <span className={l < 0 || l > 1 ? warning : undefined}>
        {lightness}
      </span>{" "}
      <span className={c < 0 || c > 0.4 ? warning : undefined}>{chroma}</span>{" "}
      <span className={h! < 0 || h! > 360 ? warning : undefined}>{hue}</span>
      <span>{`)`}</span>
    </code>
  );
}

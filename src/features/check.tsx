import type {
  RgbColor,
  HslColor,
  HwbColor,
  LabColor,
  LchColor,
  OklabColor,
  OklchColor,
} from "~/lib/types";

function Check({
  value,
  min,
  max,
}: {
  value: number;
  min: number;
  max: number;
}) {
  return (
    <span
      className={
        value < min || value > max
          ? "text-red-700 dark:text-red-400"
          : undefined
      }
    >
      {value}
    </span>
  );
}

export function CheckRgb({ color }: { color: RgbColor }) {
  const { r, g, b } = color;
  return (
    <code>
      <span>{`rgb(`}</span>
      <Check value={r} min={0} max={255} />{" "}
      <Check value={g} min={0} max={255} />{" "}
      <Check value={b} min={0} max={255} />
      <span>{`)`}</span>
    </code>
  );
}

export function CheckHsl({ color }: { color: HslColor }) {
  const { h, s, l } = color;
  return (
    <code>
      <span>{`hsl(`}</span>
      <Check value={h!} min={0} max={360} />{" "}
      <Check value={s} min={0} max={100} />{" "}
      <Check value={l} min={0} max={100} />
      <span>{`)`}</span>
    </code>
  );
}

export function CheckHwb({ color }: { color: HwbColor }) {
  const { h, w, b } = color;
  return (
    <code>
      <span>{`hwb(`}</span>
      <Check value={h!} min={0} max={360} />{" "}
      <Check value={w} min={0} max={100} />{" "}
      <Check value={b} min={0} max={100} />
      <span>{`)`}</span>
    </code>
  );
}

export function CheckLab({ color }: { color: LabColor }) {
  const { l, a, b } = color;
  return (
    <code>
      <span>{`lab(`}</span>
      <Check value={l} min={0} max={100} />{" "}
      <Check value={a} min={-100} max={100} />{" "}
      <Check value={b} min={-100} max={100} />
      <span>{`)`}</span>
    </code>
  );
}

export function CheckLch({ color }: { color: LchColor }) {
  const { l, c, h } = color;
  return (
    <code>
      <span>{`lch(`}</span>
      <Check value={l} min={0} max={100} />{" "}
      <Check value={c} min={0} max={150} />{" "}
      <Check value={h!} min={0} max={360} />
      <span>{`)`}</span>
    </code>
  );
}

export function CheckOklab({ color }: { color: OklabColor }) {
  const { l, a, b } = color;
  return (
    <code>
      <span>{`oklab(`}</span>
      <Check value={l} min={0} max={1} />{" "}
      <Check value={a} min={-0.4} max={0.4} />{" "}
      <Check value={b} min={-0.4} max={0.4} />
      <span>{`)`}</span>
    </code>
  );
}

export function CheckOklch({ color }: { color: OklchColor }) {
  const { l, c, h } = color;
  return (
    <code>
      <span>{`oklch(`}</span>
      <Check value={l} min={0} max={1} /> <Check value={c} min={0} max={0.4} />{" "}
      <Check value={h!} min={0} max={360} />
      <span>{`)`}</span>
    </code>
  );
}

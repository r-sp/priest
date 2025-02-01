"use client";

import type {
  AnyColorMode,
  ColorState,
  ColorLabel,
  ColorFormat,
  ComposeColor,
  ColorMode,
} from "~/types/color";
import clsx from "clsx";

interface Props {
  color: ColorState;
  mode: keyof ColorState;
  action: (color: AnyColorMode, mode?: keyof ColorState) => void;
}

export default function ColorOptions({ color, mode, action }: Props) {
  const { hex, rgb, hsl, hwb, lab, lch, oklab, oklch } = color;

  const modeHex = mode === "hex";
  const modeRgb = mode === "rgb";
  const modeHsl = mode === "hsl";
  const modeHwb = mode === "hwb";
  const modeLab = mode === "lab";
  const modeLch = mode === "lch";
  const modeOklab = mode === "oklab";
  const modeOklch = mode === "oklch";

  return (
    <ul
      role="listbox"
      className={clsx(
        "absolute top-0 right-0 left-0 z-3 grid rounded-md px-2 pt-12 pb-2 break-words ring select-none",
        "bg-gray-100 text-gray-600 ring-gray-200 dark:bg-gray-900 dark:text-gray-400 dark:ring-gray-800",
      )}
    >
      {!modeHex ? (
        <li className="inline-grid">
          <button
            role="option"
            aria-selected={modeHex}
            aria-label={hex}
            name="rgb"
            className={clsx(
              "flex cursor-pointer rounded-md px-2 py-2 outline-0",
              "hover:bg-gray-200 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200",
              "focus:bg-gray-200 focus:text-gray-800 dark:focus:bg-gray-800 dark:focus:text-gray-200",
            )}
            onClick={() => action({ mode: "rgb", ...rgb.color }, "hex")}
          >
            <code>{hex}</code>
          </button>
        </li>
      ) : null}
      {!modeRgb ? (
        <Option
          mode="rgb"
          input={rgb}
          label={["red", "green", "blue"]}
          offset={[
            { min: 0, max: 255 },
            { min: 0, max: 255 },
            { min: 0, max: 255 },
          ]}
          isActive={modeRgb}
          update={action}
        />
      ) : null}
      {!modeHsl ? (
        <Option
          mode="hsl"
          input={hsl}
          label={["hue", "saturation", "lightness"]}
          offset={[
            { min: 0, max: 360 },
            { min: 0, max: 100 },
            { min: 0, max: 100 },
          ]}
          isActive={modeHsl}
          update={action}
        />
      ) : null}
      {!modeHwb ? (
        <Option
          mode="hwb"
          input={hwb}
          label={["hue", "whiteness", "blackness"]}
          offset={[
            { min: 0, max: 360 },
            { min: 0, max: 100 },
            { min: 0, max: 100 },
          ]}
          isActive={modeHwb}
          update={action}
        />
      ) : null}
      <li
        role="separator"
        className="my-2 border-t border-t-gray-200 dark:border-t-gray-800"
      ></li>
      {!modeLch ? (
        <Option
          mode="lch"
          input={lch}
          label={["lightness", "chroma", "hue"]}
          offset={[
            { min: 0, max: 100 },
            { min: 0, max: 150 },
            { min: 0, max: 360 },
          ]}
          isActive={modeLch}
          update={action}
        />
      ) : null}
      {!modeOklch ? (
        <Option
          mode="oklch"
          input={oklch}
          label={["lightness", "chroma", "hue"]}
          offset={[
            { min: 0, max: 1 },
            { min: 0, max: 0.4 },
            { min: 0, max: 360 },
          ]}
          isActive={modeOklch}
          update={action}
        />
      ) : null}
      {!modeLab ? (
        <Option
          mode="lab"
          input={lab}
          label={["lightness", "green-red", "blue-yellow"]}
          offset={[
            { min: 0, max: 100 },
            { min: -100, max: 100 },
            { min: -100, max: 100 },
          ]}
          isActive={modeLab}
          update={action}
        />
      ) : null}
      {!modeOklab ? (
        <Option
          mode="oklab"
          input={oklab}
          label={["lightness", "green-red", "blue-yellow"]}
          offset={[
            { min: 0, max: 1 },
            { min: -0.4, max: 0.4 },
            { min: -0.4, max: 0.4 },
          ]}
          isActive={modeOklab}
          update={action}
        />
      ) : null}
    </ul>
  );
}

interface Offset {
  min: number;
  max: number;
}

const noticeLabel = (label: ColorLabel, value: number, offset: Offset) => {
  return value < offset.min
    ? `${label} is under ${offset.min}`
    : value > offset.max
      ? `${label} is above ${offset.max}`
      : label;
};

const noticeError = (value: number, offset: Offset): string | undefined => {
  return value < offset.min || value > offset.max
    ? "text-red-700 dark:text-red-400"
    : undefined;
};

interface OptionProps<T extends ColorFormat> {
  mode: T;
  input: ComposeColor<T>;
  label: [ColorLabel, ColorLabel, ColorLabel];
  offset: [Offset, Offset, Offset];
  update: (color: ColorMode<T>, mode?: T) => void;
  isActive: boolean;
}

function Option<Key extends ColorFormat>({
  input,
  mode,
  label,
  offset,
  isActive,
  update,
}: OptionProps<Key>) {
  const { color, css } = input;

  const [startLabel, middleLabel, endLabel] = label;
  const [startOffset, middleOffset, endOffset] = offset;

  const value = Object.values(color) as [number, number, number];
  const startValue = value[0] as number;
  const middleValue = value[1] as number;
  const endValue = value[2] as number;

  return (
    <li className="inline-grid">
      <button
        role="option"
        aria-selected={isActive}
        aria-label={css}
        name={mode}
        className={clsx(
          "no-scrollbar flex cursor-pointer flex-nowrap overflow-x-auto rounded-md px-2 py-2 whitespace-nowrap outline-0",
          "hover:bg-gray-200 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200",
          "focus:bg-gray-200 focus:text-gray-800 dark:focus:bg-gray-800 dark:focus:text-gray-200",
        )}
        onClick={() => update({ mode, ...color }, mode)}
      >
        <code>
          <span>{`${mode}(`}</span>
          <span
            role="none"
            title={noticeLabel(startLabel, startValue, startOffset)}
            className={noticeError(startValue, startOffset)}
          >
            {startValue}
          </span>
          {` `}
          <span
            role="none"
            title={noticeLabel(middleLabel, middleValue, middleOffset)}
            className={noticeError(middleValue, middleOffset)}
          >
            {middleValue}
          </span>
          {` `}
          <span
            role="none"
            title={noticeLabel(endLabel, endValue, endOffset)}
            className={noticeError(endValue, endOffset)}
          >
            {endValue}
          </span>
          <span>{`)`}</span>
        </code>
      </button>
    </li>
  );
}

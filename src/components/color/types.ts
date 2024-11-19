import type { AnyColor, HslaColor, HsvaColor, RgbaColor } from "~/lib/types";
import type { ChangeEventHandler, ComponentPropsWithoutRef, Dispatch, SetStateAction } from "react";

export type ColorProps = {
  raw: AnyColor;
};

export type ColorActionProps = {
  action: Dispatch<SetStateAction<AnyColor>>;
};

export type ColorHexProps = {
  raw: string;
} & ColorActionProps;

export type ColorHslProps = {
  raw: HslaColor;
} & ColorActionProps;

export type ColorRgbProps = {
  raw: RgbaColor;
} & ColorActionProps;

export type ColorPickerProps = {
  raw: HsvaColor;
} & ColorActionProps;

export type ColorInputProps = {
  update?: ChangeEventHandler<HTMLInputElement>;
  focus?: ChangeEventHandler<HTMLInputElement>;
  leave?: ChangeEventHandler<HTMLInputElement>;
} & ComponentPropsWithoutRef<"input">;

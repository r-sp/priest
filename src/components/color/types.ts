import type { AnyColor, HslaColor, HsvaColor, RgbaColor } from "~/lib/types";
import type { ChangeEventHandler, ComponentPropsWithoutRef, Dispatch, SetStateAction } from "react";

export type ColorProps = {
  raw: AnyColor;
};

export type ColorInputProps = {
  update?: ChangeEventHandler<HTMLInputElement>;
  focus?: ChangeEventHandler<HTMLInputElement>;
  leave?: ChangeEventHandler<HTMLInputElement>;
} & ComponentPropsWithoutRef<"input">;

export type ColorPickerProps = {
  raw: HsvaColor;
  action: Dispatch<SetStateAction<AnyColor>>;
};

export type ColorToolkitProps = {
  color: {
    hex: string;
    hsl: HslaColor;
    rgb: RgbaColor;
  };
  action: Dispatch<SetStateAction<AnyColor>>;
};

"use client";

import type {
  ReactNode,
  Dispatch,
  SetStateAction,
  ComponentPropsWithoutRef,
} from "react";
import type { ColorFormat } from "~/lib/types";
import { useCallback } from "react";
import { useColor, useMode } from "~/hooks";
import { formatHex } from "~/lib/color";
import { Separator } from "~/components";

type SetHex = Dispatch<SetStateAction<boolean>>;
type SetModal = Dispatch<SetStateAction<boolean>>;

export default function InputMode({
  hex,
  modal,
  action,
}: {
  hex: boolean;
  modal: boolean;
  action: [SetHex, SetModal];
}) {
  const [{ rgb, hsl, hwb, lab, lch, oklab, oklch }] = useColor();
  const [mode, setMode] = useMode();
  const [setHex, setModal] = action;

  const handleMode = useCallback(
    (type: ColorFormat | "hex") => {
      if (type === "hex") {
        setHex(true);
        setMode("rgb");
      } else {
        setHex(false);
        setMode(type);
      }
      setModal(false);
    },
    [setMode, setHex, setModal],
  );

  return modal ? (
    <List>
      <Separator
        as="li"
        role="none"
        className="mb-2"
        style={{ marginTop: "-2px" }}
      />
      {!hex && (
        <Item>
          <Button
            label="hex"
            code={formatHex(rgb.color)}
            onClick={() => handleMode("hex")}
          />
        </Item>
      )}
      {hex && mode === "rgb" && (
        <Item>
          <Button
            label="rgb"
            code={rgb.css}
            onClick={() => handleMode("rgb")}
          />
        </Item>
      )}
      {mode !== "rgb" && (
        <Item>
          <Button
            label="rgb"
            code={rgb.css}
            onClick={() => handleMode("rgb")}
          />
        </Item>
      )}
      {mode !== "hsl" && (
        <Item>
          <Button
            label="hsl"
            code={hsl.css}
            onClick={() => handleMode("hsl")}
          />
        </Item>
      )}
      {mode !== "hwb" && (
        <Item>
          <Button
            label="hwb"
            code={hwb.css}
            onClick={() => handleMode("hwb")}
          />
        </Item>
      )}
      <Separator as="li" className="my-2" />
      {mode !== "lch" && (
        <Item>
          <Button
            label="lch"
            code={lch.css}
            onClick={() => handleMode("lch")}
          />
        </Item>
      )}
      {mode !== "oklch" && (
        <Item>
          <Button
            label="oklch"
            code={oklch.css}
            onClick={() => handleMode("oklch")}
          />
        </Item>
      )}
      {mode !== "lab" && (
        <Item>
          <Button
            label="lab"
            code={lab.css}
            onClick={() => handleMode("lab")}
          />
        </Item>
      )}
      {mode !== "oklab" && (
        <Item>
          <Button
            label="oklab"
            code={oklab.css}
            onClick={() => handleMode("oklab")}
          />
        </Item>
      )}
    </List>
  ) : null;
}

function List({
  children,
}: { children: ReactNode } & ComponentPropsWithoutRef<"ol">) {
  return (
    <ol
      role="listbox"
      aria-label="color conversion"
      className="absolute top-0 right-0 left-0 z-4 grid rounded-md border border-neutral-400 bg-neutral-50 pt-10 pb-2 text-neutral-500 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-400"
    >
      {children}
    </ol>
  );
}

function Item({
  children,
  ...props
}: { children: ReactNode } & ComponentPropsWithoutRef<"li">) {
  return (
    <li role="none" className="inline-grid rounded-none" {...props}>
      {children}
    </li>
  );
}

function Button({
  label,
  code,
  ...props
}: { label: string; code: string } & ComponentPropsWithoutRef<"button">) {
  return (
    <button
      role="option"
      aria-label={label}
      aria-selected={false}
      className="action flex items-center justify-start px-3 py-1"
      tabIndex={0}
      {...props}
    >
      <code className="inline-flex">{code}</code>
    </button>
  );
}

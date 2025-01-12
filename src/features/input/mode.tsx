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
import clsx from "clsx";

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
    <div
      role="listbox"
      className="absolute top-0 right-0 left-0 z-4 pt-10 shadow-xl shadow-gray-950/30 dark:shadow-gray-950/60"
    >
      <List label="legacy">
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
      </List>
      <List label="modern" className="rounded-b-md">
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
    </div>
  ) : null;
}

function List({
  children,
  label,
  className,
}: { children: ReactNode; label: string } & ComponentPropsWithoutRef<"ol">) {
  return (
    <ol
      role="group"
      aria-label={label}
      className={clsx(
        "grid overflow-hidden py-2 ring",
        "bg-gray-100 ring-gray-300 dark:bg-gray-900 dark:ring-gray-700",
        className,
      )}
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
      className={clsx(
        "flex items-center justify-start px-4 py-2 outline-0",
        "hover:bg-gray-200 focus:bg-gray-200 dark:hover:bg-gray-800 dark:focus:bg-gray-800",
        "text-gray-600 dark:text-gray-400",
      )}
      tabIndex={0}
      {...props}
    >
      <code className="inline-flex">{code}</code>
    </button>
  );
}

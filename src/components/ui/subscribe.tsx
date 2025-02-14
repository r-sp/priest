"use client";

import type { ComponentPropsWithoutRef } from "react";
import type { SessionSubscribe } from "~/types/session";
import type { AnyColorMode } from "~/types/color";
import { useMemo } from "react";
import { useSession } from "~/hooks";
import { formatCss } from "~/utils";
import { Icon } from "../common";
import clsx from "clsx";

interface Props
  extends Omit<ComponentPropsWithoutRef<"button">, "currentColor"> {
  currentColor: AnyColorMode;
}

export default function Subscribe({ currentColor, ...props }: Props) {
  const session: SessionSubscribe = useSession((state) => [
    state.color,
    state.setColor,
  ]);
  const [color, setColor] = useMemo(() => session, [session]);

  const storeCss = formatCss(color);
  const currentCss = formatCss(currentColor);
  const isEqualColor = storeCss === currentCss;

  const handleSubscribe = () => {
    setColor(currentColor);
  };

  return (
    <button
      suppressHydrationWarning
      className={clsx(
        "action inline-flex h-9 grow-1 cursor-pointer items-center justify-center gap-x-2 rounded-md px-3 text-sm ring",
        isEqualColor ? "pointer-events-none opacity-60" : "cursor-pointer",
      )}
      disabled={isEqualColor}
      tabIndex={isEqualColor ? -1 : 0}
      onClick={handleSubscribe}
      {...props}
    >
      <Icon size="20" type="palette" className="pointer-events-none size-5" />
      <span>{isEqualColor ? "Subscribed" : "Subscribe"}</span>
    </button>
  );
}

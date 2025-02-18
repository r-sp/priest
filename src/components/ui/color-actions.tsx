"use client";

import type { ComponentPropsWithoutRef } from "react";
import type { SessionSubscribe } from "~/types/session";
import type { AnyColorMode } from "~/types/color";
import { useMemo, useCallback } from "react";
import { useSession } from "~/hooks";
import { formatCss } from "~/utils";
import { Icon } from "../common";
import clsx from "clsx";

interface Props {
  color: AnyColorMode;
  link: string;
  path: string;
}

export default function ColorActions({ color, link, path }: Props) {
  return (
    <div
      role="group"
      aria-label="color actions"
      className="xs:flex-row flex grow-0 flex-col justify-between gap-4"
    >
      <SubscribeColor
        aria-label="set current color as primary"
        currentColor={color}
      />
      <DownloadColor
        aria-label="download color as image"
        href={link}
        filename={path}
      />
    </div>
  );
}

interface SubscribeAction
  extends Omit<ComponentPropsWithoutRef<"button">, "currentColor"> {
  currentColor: AnyColorMode;
}

function SubscribeColor({ currentColor, ...props }: SubscribeAction) {
  const session: SessionSubscribe = useSession((state) => [
    state.color,
    state.setColor,
  ]);
  const [color, setColor] = useMemo(() => session, [session]);

  const storeCss = formatCss(color);
  const currentCss = formatCss(currentColor);
  const isEqualColor = storeCss === currentCss;

  const handleSubscribe = useCallback(() => {
    setColor(currentColor);
  }, [setColor, currentColor]);

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

interface DownloadAction
  extends Omit<ComponentPropsWithoutRef<"button">, "href" | "filename"> {
  href: string;
  filename: string;
}

function DownloadColor({ href, filename, ...props }: DownloadAction) {
  const hiddenLink = "link-download";

  const handleDownload = useCallback(async () => {
    try {
      const response = await fetch(href);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const body = document.body;
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.id = hiddenLink;

      const prev = document.getElementById(hiddenLink);
      if (prev) {
        body.removeChild(prev);
        body.appendChild(link);
      } else {
        body.appendChild(link);
      }

      link.click();
      window.URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
    } finally {
      const next = document.getElementById(hiddenLink);
      if (next) {
        document.body.removeChild(next);
      }
    }
  }, [href, filename]);

  return (
    <button
      className="action inline-flex h-9 grow-1 cursor-pointer items-center justify-center gap-x-2 rounded-md px-3 text-sm ring"
      onClick={handleDownload}
      {...props}
    >
      <Icon size="20" type="download" className="pointer-events-none size-5" />
      <span>Download</span>
    </button>
  );
}

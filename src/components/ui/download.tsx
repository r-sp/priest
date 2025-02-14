"use client";

import type { ComponentPropsWithoutRef } from "react";
import { Icon } from "../common";

interface Props
  extends Omit<ComponentPropsWithoutRef<"button">, "href" | "filename"> {
  href: string;
  filename: string;
}

export default function Download({ href, filename, ...props }: Props) {
  const hiddenLink = "link-download";

  const handleDownload = async () => {
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
  };

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

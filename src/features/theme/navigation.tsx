"use client";

import type { ReactNode, KeyboardEvent } from "react";
import { useState, useRef, useCallback } from "react";
import { createPortal } from "react-dom";

export default function Navigation({ children }: { children: ReactNode }) {
  const [reduceMotion, setReduceMotion] = useState<boolean>(false);
  const refList = useRef<HTMLDivElement>(null);

  const handleKeyboard = useCallback((e: KeyboardEvent) => {
    const list = refList.current;
    if (!list) return;

    const buttons = Array.from<HTMLDivElement>(
      list.querySelectorAll("button:not([disabled])"),
    );

    const index = buttons.indexOf(document.activeElement as HTMLDivElement);
    if (index < 0) return;

    switch (e.key) {
      case "ArrowUp":
      case "ArrowLeft": {
        const next = (index - 1 + buttons.length) % buttons.length;
        buttons[next]?.focus();
        e.preventDefault();
        break;
      }
      case "ArrowDown":
      case "ArrowRight": {
        const next = (index + 1 + buttons.length) % buttons.length;
        buttons[next]?.focus();
        e.preventDefault();
        break;
      }
    }
  }, []);

  return (
    <div
      ref={refList}
      role="menu"
      aria-label="theme"
      className="flex rounded-3xl border border-neutral-400 dark:border-neutral-700"
      onKeyDown={handleKeyboard}
      onFocus={() => setReduceMotion(true)}
      onBlur={() => setReduceMotion(false)}
    >
      {children}
      {reduceMotion ? createPortal(<ReduceMotion />, document.body) : null}
    </div>
  );
}

function ReduceMotion() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `.transition-colors{transition-duration:0s}`,
      }}
    ></style>
  );
}

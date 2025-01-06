"use client";

import type {
  ReactNode,
  Dispatch,
  SetStateAction,
  RefObject,
  KeyboardEvent,
} from "react";
import { useRef, useCallback, useEffect } from "react";
import clsx from "clsx";

export default function Navigation({
  children,
  modal,
  action,
  button,
}: {
  children: ReactNode;
  modal: boolean;
  action: Dispatch<SetStateAction<boolean>>;
  button: RefObject<HTMLButtonElement | null>;
}) {
  const refList = useRef<HTMLDivElement>(null);
  const btn = button.current;

  const handleKeyboard = useCallback(
    (e: KeyboardEvent) => {
      const list = refList.current;
      if (!list) return;

      const tabs = Array.from<HTMLDivElement>(
        list.querySelectorAll("button:not([disabled])"),
      );

      const index = tabs.indexOf(document.activeElement as HTMLDivElement);
      if (index < 0) return;

      const prevTab = () => {
        const next = (index - 1 + tabs.length) % tabs.length;
        tabs[next]?.focus();
        e.preventDefault();
      };

      const nextTab = () => {
        const next = (index + 1 + tabs.length) % tabs.length;
        tabs[next]?.focus();
        e.preventDefault();
      };

      if (e.shiftKey && e.key === "Tab") {
        prevTab();
      } else {
        switch (e.key) {
          case "ArrowUp":
          case "ArrowLeft": {
            prevTab();
            break;
          }
          case "Tab":
          case "ArrowDown":
          case "ArrowRight": {
            nextTab();
            break;
          }
          case "Escape": {
            action(false);
            if (btn) {
              btn.focus();
            }
            break;
          }
        }
      }
    },
    [action, btn],
  );

  useEffect(() => {
    if (modal && refList.current) {
      const btn = refList.current.querySelector(
        "button[tabindex='0']",
      ) as HTMLButtonElement;
      if (btn) {
        btn.focus();
      }
    }
  }, [modal, refList]);

  return (
    <div
      ref={refList}
      role="menu"
      aria-label="color mode"
      id="color-mode-menu"
      className={clsx(
        modal
          ? "visible translate-x-0 translate-y-0 scale-100 transition-transform ease-out"
          : "invisible -translate-y-6 translate-x-2 scale-90 transition-transform ease-in",
        "absolute top-10 right-0 z-4 flex flex-col rounded-sm border border-neutral-400 bg-neutral-50 py-2 dark:border-neutral-700 dark:bg-neutral-950",
      )}
      onKeyDown={handleKeyboard}
    >
      {children}
    </div>
  );
}

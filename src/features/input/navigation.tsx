"use client";

import type { ReactNode, Dispatch, SetStateAction, KeyboardEvent } from "react";
import { useRef, useCallback } from "react";
import clsx from "clsx";

type SetModal = Dispatch<SetStateAction<boolean>>;
type SetFocus = Dispatch<SetStateAction<boolean>>;

export default function Navigation({
  children,
  modal,
  action,
}: {
  children: ReactNode;
  modal: boolean;
  action: [SetModal, SetFocus];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [setModal, setFocus] = action;

  const handleKeyboard = useCallback(
    (e: KeyboardEvent) => {
      const list = ref.current;
      if (!list) return;

      const tabs = Array.from<HTMLDivElement>(
        list.querySelectorAll("*[tabindex='0']"),
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

      if (!modal) return;

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
            setFocus(false);
            setModal(false);
            break;
          }
        }
      }
    },
    [ref, modal, setModal, setFocus],
  );

  return (
    <div
      ref={ref}
      role="form"
      aria-label="color input"
      className={clsx(modal && "relative z-16", "grid")}
      onKeyDown={handleKeyboard}
    >
      {children}
    </div>
  );
}

"use client";

import type { ReactNode, FocusEvent } from "react";
import type { ColorStates } from "./helper";
import type { OklchColor } from "~/lib/types";
import { useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { createColorById } from "./helper";
import Modal from "./modal";

export default function Navigation({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<boolean>(false);
  const [color, setColor] = useState<ColorStates | undefined>(undefined);

  const handleFocus = useCallback((e: FocusEvent) => {
    const button = e.target;
    const item = e.target.parentElement!;
    const style = item.style.getPropertyValue("--bg");

    if (button.hasAttribute("data-color")) {
      button.setAttribute("aria-label", `Color: ${style}`);
    }

    const openModal = () => {
      setModal(true);
      setColor(
        createColorById({
          id: button.id,
          color: JSON.parse(button.getAttribute("data-color")!) as OklchColor,
          css: style,
        }),
      );

      button.removeEventListener("click", openModal);
    };

    button.removeEventListener("click", openModal);
    button.addEventListener("click", openModal);

    e.preventDefault();
  }, []);

  return (
    <div
      className="mx-auto flex w-full flex-col gap-2 sm:flex-row sm:flex-wrap"
      onFocus={handleFocus}
    >
      {children}
      {color && modal
        ? createPortal(
            <Modal state={color} action={[setModal, setColor]} />,
            document.getElementById("content") || document.body,
          )
        : null}
    </div>
  );
}

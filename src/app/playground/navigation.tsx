"use client";

import type { ReactNode, FocusEvent } from "react";
import { useState, useCallback } from "react";
import { createPortal } from "react-dom";
import Modal from "./modal";

type ColorModal = {
  id: string;
  color: string;
  css: string;
};

export default function Navigation({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<boolean>(false);
  const [color, setColor] = useState<ColorModal | undefined>(undefined);

  const closeModal = () => {
    setModal(false);
    setColor(undefined);
  };

  const handleFocus = useCallback((e: FocusEvent) => {
    const button = e.target;
    const item = e.target.parentElement!;
    const style = item.style.getPropertyValue("--bg");

    if (button.hasAttribute("data-color")) {
      button.setAttribute("aria-label", `Color: ${style}`);
    }

    const openModal = () => {
      const dataColor = JSON.parse(button.getAttribute("data-color")!);

      setModal(true);
      setColor({
        id: button.id,
        color: dataColor,
        css: style,
      });
      button.removeEventListener("click", openModal);
    };

    button.removeEventListener("click", openModal);
    button.addEventListener("click", openModal);

    e.preventDefault();
  }, []);

  return (
    <div className="mx-auto grid w-full max-w-5xl gap-2" onFocus={handleFocus}>
      {children}
      {color && modal
        ? createPortal(
            <Modal state={color} action={closeModal} />,
            document.getElementById("content") || document.body,
          )
        : null}
    </div>
  );
}

"use client";

import type { MouseEvent, KeyboardEvent, FocusEvent } from "react";
import { useCallback } from "react";
// import { currentId, prevId, nextId, findColorById } from "./helper";
import { Inline } from "~/components";

export default function Modal({
  state,
  action,
}: {
  state: {
    id: string;
    color: string;
    css: string;
  };
  action: () => void;
}) {
  const { id, css } = state;

  const handleClose = useCallback(
    (e: MouseEvent | KeyboardEvent | FocusEvent) => {
      const btn = document.getElementById(id) as HTMLButtonElement;
      if (btn) {
        btn.focus();
      }

      action();
      e.preventDefault();
    },
    [action, id],
  );

  const handleKeyboard = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "Enter":
        case "Escape": {
          handleClose(e);
          break;
        }
      }
    },
    [handleClose],
  );

  // const [group, variant] = currentId(id);
  // const [prevGroup, prevVariant] = prevId(group, variant);
  // const [nextGroup, nextVariant] = nextId(group, variant);
  // const prevColor = findColorById(group, prevVariant);
  // const nextColor = findColorById(group, nextVariant);

  return (
    <Inline
      bg={css}
      className="overlay fixed z-69 flex items-center justify-center"
      onKeyDown={handleKeyboard}
    >
      <button
        autoFocus={true}
        className="bg-ref relative z-3 aspect-square h-auto w-full max-w-3xl"
        onClick={handleClose}
      >
        <span className="sr-only">Close modal</span>
      </button>
      <span
        role="button"
        aria-label="close modal"
        className="overlay fixed z-0 bg-neutral-50/80 backdrop-blur-sm dark:bg-neutral-950/80"
        tabIndex={0}
        onFocus={handleClose}
      ></span>
    </Inline>
  );
}

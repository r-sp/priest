"use client";

import type { Dispatch, SetStateAction, KeyboardEvent } from "react";
import type { ColorStates } from "./helper";
import { useState, useCallback } from "react";
import { createColorById } from "./helper";
import { Inline } from "~/components";

type SetModal = Dispatch<SetStateAction<boolean>>;
type SetColor = Dispatch<SetStateAction<ColorStates | undefined>>;

export default function Modal({
  state,
  action,
}: {
  state: ColorStates;
  action: [SetModal, SetColor];
}) {
  const [setModal, setColor] = action;
  const [currentColor, setCurrentColor] = useState<ColorStates>(state);
  const { current, prev, next } = currentColor;

  const handleClose = useCallback(() => {
    const btn = document.getElementById(current.id) as HTMLButtonElement;
    if (btn) {
      btn.focus();
    }

    setModal(false);
    setColor(undefined);
  }, [current, setModal, setColor]);

  const handlePrev = useCallback(() => {
    if (prev) {
      setCurrentColor(createColorById(prev));
    }
  }, [prev]);

  const handleNext = useCallback(() => {
    if (next) {
      setCurrentColor(createColorById(next));
    }
  }, [next]);

  const handleKeyboard = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape": {
          handleClose();
          break;
        }
        case "ArrowUp":
        case "ArrowLeft": {
          handlePrev();
          e.preventDefault();
          break;
        }
        case "ArrowDown":
        case "ArrowRight": {
          handleNext();
          e.preventDefault();
          break;
        }
      }
    },
    [handleClose, handlePrev, handleNext],
  );

  return (
    <div>
      <aside
        aria-label={current.id.replaceAll("-", " ")}
        className="overlay pointer-events-none fixed z-16 flex items-center justify-center"
        onKeyDown={handleKeyboard}
      >
        <Inline
          bg={current.css}
          className="pointer-events-auto relative z-4 inline-flex aspect-square h-auto w-full max-w-3xl items-center"
        >
          {prev && (
            <button
              aria-label={`Previous Color: ${prev.css}`}
              className="action absolute left-2 z-8 inline-flex size-8 items-center justify-center rounded-3xl bg-neutral-50 dark:bg-neutral-950"
              onClick={handlePrev}
            >
              <svg
                role="presentation"
                className="size-6"
                width={24}
                height={24}
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M14.9808 21.6538L16.4 20.2345L8.16552 12L16.4 3.7655L14.9808 2.34625L5.32702 12L14.9808 21.6538Z"
                />
              </svg>
            </button>
          )}
          <button
            autoFocus={true}
            aria-label={`Color: ${current.css}`}
            className="bg-ref h-full w-full"
            onClick={handleClose}
          ></button>
          {next && (
            <button
              aria-label={`Next Color: ${next.css}`}
              className="action absolute right-2 z-8 inline-flex size-8 items-center justify-center rounded-3xl bg-neutral-50 dark:bg-neutral-950"
              onClick={handleNext}
            >
              <svg
                role="presentation"
                className="size-6"
                width={24}
                height={24}
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M9.01923 21.6538L7.59998 20.2345L15.8345 12L7.59998 3.7655L9.01923 2.34625L18.673 12L9.01923 21.6538Z"
                />
              </svg>
            </button>
          )}
        </Inline>
      </aside>
      <span
        role="button"
        aria-label="close modal"
        className="overlay fixed z-12 bg-neutral-50/80 backdrop-blur-sm dark:bg-neutral-950/80"
        tabIndex={0}
        onFocus={handleClose}
      ></span>
    </div>
  );
}

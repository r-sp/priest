"use client";

import type { ReactNode, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Props {
  children: ReactNode;
}

export default function Modal({ children }: Props) {
  const router = useRouter();

  const handleClose = () => {
    document.body.removeAttribute("style");
    router.back();
  };

  const handleKeyboard = (e: KeyboardEvent) => {
    switch (e.key) {
      case "Escape": {
        handleClose();
        e.preventDefault();
        break;
      }
    }
  };

  useEffect(() => {
    document.body.style.overflowY = "hidden";
  });

  return (
    <aside onKeyDown={handleKeyboard}>
      <div role="none" className="fixed inset-0 z-69 overflow-y-auto">
        <div role="none" className="relative z-3 px-3">
          <div className="mx-auto flex h-14 max-w-[49rem] items-center justify-start">
            <button
              autoFocus={true}
              aria-label="return back"
              className="inline-flex size-8 items-center justify-center rounded-full text-gray-800 dark:text-gray-200"
              onClick={handleClose}
            >
              <svg
                className="pointer-events-none size-6"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  fill="currentColor"
                  d="M7.373 12.75L13.0693 18.4462L12 19.5L4.5 12L12 4.5L13.0693 5.55375L7.373 11.25H19.5V12.75H7.373Z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div
          role="none"
          className="relative z-4 mx-auto w-full max-w-[50rem] pb-8"
        >
          {children}
        </div>
        <span
          role="button"
          aria-label="close modal"
          className="fixed top-0 right-0 bottom-0 left-0 z-2 bg-gray-50 dark:bg-gray-950"
          tabIndex={0}
          onFocus={handleClose}
        ></span>
      </div>
    </aside>
  );
}

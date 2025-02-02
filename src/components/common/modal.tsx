"use client";

import type { ReactNode, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";

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

  return (
    <aside onKeyDown={handleKeyboard}>
      <div role="none" className="fixed inset-0 z-90 overflow-y-auto md:px-4">
        <div
          role="none"
          className="max-w-8xl mx-auto grid min-h-svh content-baseline gap-y-4 md:grid-cols-[20rem_1fr] md:gap-x-4 lg:grid-cols-[24rem_1fr] xl:grid-cols-[28rem_1fr]"
        >
          <nav className="pointer-events-none relative z-3 flex flex-col gap-y-6 px-4 pt-4 md:sticky md:top-0 md:px-0">
            <div className="pointer-events-auto flex items-center justify-start md:justify-end">
              <button
                autoFocus={true}
                aria-label="return back"
                className="ml-[-0.3rem] inline-flex size-8 items-center justify-center rounded-full text-gray-800 md:mr-[-0.3rem] md:ml-0 dark:text-gray-200"
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
          </nav>
          <div role="none" className="relative z-4">
            {children}
          </div>
          <span
            role="button"
            aria-label="close modal"
            className="fixed top-0 right-0 bottom-0 left-0 z-2 bg-gray-50/75 backdrop-blur-xl dark:bg-gray-950/75"
            tabIndex={0}
            onFocus={handleClose}
          ></span>
        </div>
      </div>
    </aside>
  );
}

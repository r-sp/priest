"use client";

import type { ReactNode, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import clsx from "clsx";

interface Props {
  children: ReactNode;
  color: string;
}

export default function Modal({ children, color }: Props) {
  const [scroll, setScroll] = useState<boolean>(false);
  const router = useRouter();

  const handleClose = () => {
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

  const title = `Color: ${color}`;

  useEffect(() => {
    const pageTitle = document.title;
    const pageRoot = document.documentElement.style;
    const pageBody = document.body.style;
    document.title = title;
    pageRoot.overflowY = "hidden";
    pageBody.overflowY = "scroll";
    pageBody.pointerEvents = "none";
    setScroll(true);

    return () => {
      document.title = pageTitle;
      pageRoot.removeProperty("overflow-y");
      pageBody.removeProperty("overflow-y");
      pageBody.removeProperty("pointer-events");
    };
  }, [title, setScroll]);

  return (
    <div role="none" onKeyDown={handleKeyboard}>
      <div
        role="dialog"
        aria-label={title}
        className={clsx(
          "fixed top-0 right-0 bottom-0 left-0 z-90 md:px-4",
          scroll ? "overflow-y-auto" : "overflow-y-hidden",
        )}
      >
        <div className="max-w-8xl mx-auto grid min-h-svh content-baseline gap-y-4 md:grid-cols-[20rem_1fr] md:gap-x-4 lg:grid-cols-[24rem_1fr]">
          <nav className="flex flex-col gap-y-6 px-4 pt-4 md:sticky md:top-0 md:px-0">
            <div className="flex items-center justify-start md:justify-end">
              <button
                autoFocus={true}
                aria-label="return back"
                className="pointer-events-auto ml-[-0.3rem] inline-flex size-8 items-center justify-center rounded-full text-gray-800 md:mr-[-0.3rem] md:ml-0 dark:text-gray-200"
                onClick={handleClose}
              >
                <svg
                  className="animate-narrow pointer-events-none size-6"
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
          <div
            role="none"
            className={clsx(
              "pointer-events-auto",
              scroll ? "animate-slide" : "invisible",
            )}
          >
            {children}
          </div>
        </div>
      </div>
      <span
        role="button"
        aria-label="close modal"
        className="animate-fade pointer-events-auto fixed right-0 left-0 z-2 bg-gray-50/75 backdrop-blur-xl dark:bg-gray-950/75"
        style={{ bottom: "-4rem", top: "-4rem" }}
        tabIndex={0}
        onFocus={handleClose}
      ></span>
    </div>
  );
}

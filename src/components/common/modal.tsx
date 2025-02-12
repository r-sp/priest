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
          "fixed top-0 right-0 bottom-0 left-0 z-50 bg-gray-50/80 px-4 backdrop-blur-2xl dark:bg-gray-950/80",
          scroll
            ? "pointer-events-auto overflow-y-auto"
            : "overflow-y-hidden opacity-0",
        )}
      >
        <nav className="mx-auto flex h-16 max-w-5xl items-center justify-start">
          <button
            autoFocus={true}
            aria-label="return back"
            className="ml-[-0.4rem] inline-flex size-8 items-center justify-center rounded-full text-gray-800 outline-0 dark:text-gray-200"
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
        </nav>
        <div role="none" className="pointer-events-none relative">
          {children}
          <span
            role="button"
            aria-label="close color modal"
            className="pointer-events-auto absolute top-0 right-0 bottom-0 left-0 -z-1"
            tabIndex={0}
            onFocus={handleClose}
          />
        </div>
      </div>
    </div>
  );
}

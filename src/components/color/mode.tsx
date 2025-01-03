"use client";

import { type ColorFormat } from "~/lib/types";
import { useState, useEffect, useRef, useCallback } from "react";
import { useMode, useGamut } from "~/app/store";
import { createPortal } from "react-dom";
import Separator from "../ui/separator";
import clsx from "clsx";

export default function ColorMode() {
  const [mode, setMode] = useMode();
  const [gamut, setGamut] = useGamut();
  const [modal, setModal] = useState<boolean>(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  const modeRgb = mode === "rgb";
  const modeHsl = mode === "hsl";
  const modeHwb = mode === "hwb";
  const modeLab = mode === "lab";
  const modeLch = mode === "lch";
  const modeOklab = mode === "oklab";
  const modeOklch = mode === "oklch";

  const handleMode = (type: ColorFormat) => {
    setMode(type);
    setModal(false);

    if (btnRef.current) {
      btnRef.current.focus();
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (modal) {
        setModal(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [modal]);

  const radioChecked =
    "M12 16.5C13.2487 16.5 14.3108 16.0622 15.1865 15.1865C16.0622 14.3108 16.5 13.2487 16.5 12C16.5 10.7513 16.0622 9.68917 15.1865 8.8135C14.3108 7.93783 13.2487 7.5 12 7.5C10.7513 7.5 9.68917 7.93783 8.8135 8.8135C7.93783 9.68917 7.5 10.7513 7.5 12C7.5 13.2487 7.93783 14.3108 8.8135 15.1865C9.68917 16.0622 10.7513 16.5 12 16.5ZM12.0017 21.5C10.6877 21.5 9.45267 21.2507 8.2965 20.752C7.14033 20.2533 6.13467 19.5766 5.2795 18.7218C4.42433 17.8669 3.74725 16.8617 3.24825 15.706C2.74942 14.5503 2.5 13.3156 2.5 12.0017C2.5 10.6877 2.74933 9.45267 3.248 8.2965C3.74667 7.14033 4.42342 6.13467 5.27825 5.2795C6.13308 4.42433 7.13833 3.74725 8.294 3.24825C9.44967 2.74942 10.6844 2.5 11.9983 2.5C13.3123 2.5 14.5473 2.74933 15.7035 3.248C16.8597 3.74667 17.8653 4.42342 18.7205 5.27825C19.5757 6.13308 20.2528 7.13833 20.7518 8.294C21.2506 9.44967 21.5 10.6844 21.5 11.9983C21.5 13.3123 21.2507 14.5473 20.752 15.7035C20.2533 16.8597 19.5766 17.8653 18.7218 18.7205C17.8669 19.5757 16.8617 20.2528 15.706 20.7518C14.5503 21.2506 13.3156 21.5 12.0017 21.5ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z";
  const radioUnchecked =
    "M12.0017 21.5C10.6877 21.5 9.45267 21.2507 8.2965 20.752C7.14033 20.2533 6.13467 19.5766 5.2795 18.7218C4.42433 17.8669 3.74725 16.8617 3.24825 15.706C2.74942 14.5503 2.5 13.3156 2.5 12.0017C2.5 10.6877 2.74933 9.45267 3.248 8.2965C3.74667 7.14033 4.42342 6.13467 5.27825 5.2795C6.13308 4.42433 7.13833 3.74725 8.294 3.24825C9.44967 2.74942 10.6844 2.5 11.9983 2.5C13.3123 2.5 14.5473 2.74933 15.7035 3.248C16.8597 3.74667 17.8653 4.42342 18.7205 5.27825C19.5757 6.13308 20.2528 7.13833 20.7518 8.294C21.2506 9.44967 21.5 10.6844 21.5 11.9983C21.5 13.3123 21.2507 14.5473 20.752 15.7035C20.2533 16.8597 19.5766 17.8653 18.7218 18.7205C17.8669 19.5757 16.8617 20.2528 15.706 20.7518C14.5503 21.2506 13.3156 21.5 12.0017 21.5ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z";

  return (
    <div role="none" id="color-mode" className="relative">
      <button
        ref={btnRef}
        aria-haspopup="true"
        aria-expanded={modal}
        aria-controls="color-mode-menu"
        aria-label="change color mode"
        className={clsx(
          !modal && "action",
          "inline-flex size-8 items-center justify-center rounded-2xl border border-neutral-400 transition-colors dark:border-neutral-700",
        )}
        onClick={() => setModal(!modal)}
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
            d="M17.6538 19.6537C16.7169 19.6537 15.925 19.3303 15.278 18.6834C14.6312 18.0364 14.3077 17.2445 14.3077 16.3077C14.3077 15.3707 14.6312 14.5788 15.278 13.9319C15.925 13.2849 16.7169 12.9614 17.6538 12.9614C18.5908 12.9614 19.3827 13.2849 20.0295 13.9319C20.6765 14.5788 21 15.3707 21 16.3077C21 17.2445 20.6765 18.0364 20.0295 18.6834C19.3827 19.3303 18.5908 19.6537 17.6538 19.6537ZM17.6528 18.1537C18.1624 18.1537 18.5977 17.9736 18.9587 17.6134C19.3196 17.2531 19.5 16.8182 19.5 16.3087C19.5 15.799 19.3198 15.3637 18.9595 15.0027C18.5993 14.6419 18.1644 14.4614 17.6547 14.4614C17.1451 14.4614 16.7098 14.6416 16.349 15.0019C15.9882 15.3621 15.8077 15.797 15.8077 16.3067C15.8077 16.8164 15.9878 17.2516 16.348 17.6124C16.7083 17.9733 17.1433 18.1537 17.6528 18.1537ZM4.5 17.0577V15.5577H12.1155V17.0577H4.5ZM6.34625 11.0384C5.40925 11.0384 4.61733 10.7149 3.9705 10.0679C3.3235 9.42111 3 8.62919 3 7.69219C3 6.75536 3.3235 5.96344 3.9705 5.31644C4.61733 4.66961 5.40925 4.34619 6.34625 4.34619C7.28308 4.34619 8.075 4.66961 8.722 5.31644C9.36883 5.96344 9.69225 6.75536 9.69225 7.69219C9.69225 8.62919 9.36883 9.42111 8.722 10.0679C8.075 10.7149 7.28308 11.0384 6.34625 11.0384ZM6.34525 9.53844C6.85492 9.53844 7.29017 9.35827 7.651 8.99794C8.01183 8.63777 8.19225 8.20286 8.19225 7.69319C8.19225 7.18352 8.01217 6.74828 7.652 6.38744C7.29167 6.02661 6.85675 5.84619 6.34725 5.84619C5.83758 5.84619 5.40225 6.02628 5.04125 6.38644C4.68042 6.74678 4.5 7.18169 4.5 7.69119C4.5 8.20086 4.68017 8.63619 5.0405 8.99719C5.40067 9.35803 5.83558 9.53844 6.34525 9.53844ZM11.8845 8.44219V6.94219H19.5V8.44219H11.8845Z"
          />
        </svg>
      </button>
      <Navigation visible={modal} state={setModal} button={btnRef}>
        <button
          role="menuitemradio"
          aria-checked={modeRgb}
          className="action inline-flex h-8 min-w-32 items-center gap-2 px-3 font-mono text-sm font-medium transition-colors"
          tabIndex={modal ? (modeRgb ? 0 : -1) : -1}
          onClick={() => {
            handleMode("rgb");
            if (gamut) {
              setGamut(false);
            }
          }}
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
              d={modeRgb ? radioChecked : radioUnchecked}
            />
          </svg>
          <span>RGB</span>
        </button>
        <button
          role="menuitemradio"
          aria-checked={modeHsl}
          className="action inline-flex h-8 min-w-32 items-center gap-2 px-3 font-mono text-sm font-medium transition-colors"
          tabIndex={modal ? (modeHsl ? 0 : -1) : -1}
          onClick={() => {
            handleMode("hsl");
            if (gamut) {
              setGamut(false);
            }
          }}
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
              d={modeHsl ? radioChecked : radioUnchecked}
            />
          </svg>
          <span>HSL</span>
        </button>
        <button
          role="menuitemradio"
          aria-checked={modeHwb}
          className="action inline-flex h-8 min-w-32 items-center gap-2 px-3 font-mono text-sm font-medium transition-colors"
          tabIndex={modal ? (modeHwb ? 0 : -1) : -1}
          onClick={() => {
            handleMode("hwb");
            if (gamut) {
              setGamut(false);
            }
          }}
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
              d={modeHwb ? radioChecked : radioUnchecked}
            />
          </svg>
          <span>HWB</span>
        </button>
        <Separator className="my-2" />
        <button
          role="menuitemradio"
          aria-checked={modeLch}
          className="action inline-flex h-8 min-w-32 items-center gap-2 px-3 font-mono text-sm font-medium transition-colors"
          tabIndex={modal ? (modeLch ? 0 : -1) : -1}
          onClick={() => {
            handleMode("lch");
            if (!gamut) {
              setGamut(true);
            }
          }}
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
              d={modeLch ? radioChecked : radioUnchecked}
            />
          </svg>
          <span>LCH</span>
        </button>
        <button
          role="menuitemradio"
          aria-checked={modeOklch}
          className="action inline-flex h-8 min-w-32 items-center gap-2 px-3 font-mono text-sm font-medium transition-colors"
          tabIndex={modal ? (modeOklch ? 0 : -1) : -1}
          onClick={() => {
            handleMode("oklch");
            if (!gamut) {
              setGamut(true);
            }
          }}
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
              d={modeOklch ? radioChecked : radioUnchecked}
            />
          </svg>
          <span>OKLCH</span>
        </button>
        <button
          role="menuitemradio"
          aria-checked={modeLab}
          className="action inline-flex h-8 min-w-32 items-center gap-2 px-3 font-mono text-sm font-medium transition-colors"
          tabIndex={modal ? (modeLab ? 0 : -1) : -1}
          onClick={() => {
            handleMode("lab");
            if (!gamut) {
              setGamut(true);
            }
          }}
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
              d={modeLab ? radioChecked : radioUnchecked}
            />
          </svg>
          <span>LAB</span>
        </button>
        <button
          role="menuitemradio"
          aria-checked={modeOklab}
          className="action inline-flex h-8 min-w-32 items-center gap-2 px-3 font-mono text-sm font-medium transition-colors"
          tabIndex={modal ? (modeOklab ? 0 : -1) : -1}
          onClick={() => {
            handleMode("oklab");
            if (!gamut) {
              setGamut(true);
            }
          }}
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
              d={modeOklab ? radioChecked : radioUnchecked}
            />
          </svg>
          <span>OKLAB</span>
        </button>
      </Navigation>
      {modal
        ? createPortal(
            <span
              role="button"
              aria-label="close color mode menu"
              className="overlay fixed z-3 min-h-dvh"
              tabIndex={0}
              onFocus={() => {
                setModal(false);
                if (btnRef.current) {
                  btnRef.current.focus();
                }
              }}
            ></span>,
            document.getElementById("color-mode") || document.body,
          )
        : null}
    </div>
  );
}

function Navigation({
  children,
  visible,
  state,
  button,
}: {
  children: React.ReactNode;
  visible: boolean;
  state: React.Dispatch<React.SetStateAction<boolean>>;
  button: React.RefObject<HTMLButtonElement | null>;
}) {
  const refList = useRef<HTMLDivElement>(null);
  const modal = visible;
  const setModal = state;
  const btn = button.current;

  const handleKeyboard = useCallback(
    (e: React.KeyboardEvent) => {
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
            setModal(false);
            if (btn) {
              btn.focus();
            }
            break;
          }
        }
      }
    },
    [setModal, btn],
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

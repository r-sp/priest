"use client";

import { useState, useMemo, useRef, useCallback, type KeyboardEvent } from "react";
import { useColorStore, useColorProvider } from "./provider";
import { stringifyHsl, stringifyRgb } from "~/lib/utils";
import type { AnyColor, ColorMode } from "~/lib/types";

export default function ColorPromote({ color }: { color: AnyColor }) {
  const { update, mode, setMode } = useColorStore((state) => state);
  const [promote, setPromote] = useState<ColorMode>(mode);
  const [space, setSpace] = useState<boolean>(false);
  const { convert } = useColorProvider();

  const reqColor = convert(color);
  const currentColor = useMemo(
    () => ({
      hex: reqColor.toHex(),
      hsl: reqColor.toHsl(),
      rgb: reqColor.toRgb(),
    }),
    [reqColor],
  );

  const setHex = () => {
    update({ ...currentColor, raw: currentColor.hex });
    setPromote("hex");
    if (mode !== "hex") {
      setMode("hex");
    }
  };

  const setHsl = () => {
    update({ ...currentColor, raw: currentColor.hsl });
    setPromote("hsl");
    if (mode !== "hsl") {
      setMode("hsl");
    }
  };

  const setRgb = () => {
    update({ ...currentColor, raw: currentColor.rgb });
    setPromote("rgb");
    if (mode !== "rgb") {
      setMode("rgb");
    }
  };

  const promoteColor = () => {
    if (mode !== promote) {
      setPromote(mode);
    }
    switch (promote) {
      case "hsl":
        return setHsl();
        break;
      case "rgb":
        return setRgb();
        break;
      default:
        return setHex();
    }
  };

  const hex = currentColor.hex;
  const hsl = stringifyHsl(currentColor.hsl);
  const rgb = stringifyRgb(currentColor.rgb);

  const refSpace = useRef<HTMLButtonElement>(null);
  const refList = useRef<HTMLUListElement>(null);

  const handleKeyboard = useCallback((e: KeyboardEvent) => {
    const list = refList.current;
    if (!list) return;

    const btns = Array.from<HTMLElement>(list.querySelectorAll("button:not([disabled])"));

    const index = btns.indexOf(document.activeElement as HTMLElement);
    if (index < 0) return;

    switch (e.key) {
      case "ArrowLeft":
      case "ArrowUp": {
        const next = (index - 1 + btns.length) % btns.length;
        btns[next]?.focus();
        break;
      }
      case "ArrowRight":
      case "ArrowDown": {
        const next = (index + 1 + btns.length) % btns.length;
        btns[next]?.focus();
        break;
      }
    }
  }, []);

  const handleModal = useCallback(() => {
    setSpace(!space);

    if (!space) {
      const list = refList.current;
      if (!list) return;

      const btns = Array.from<HTMLElement>(list.querySelectorAll("button:not([disabled])"));

      btns.map((btn) => {
        if (btn.hasAttribute("aria-checked") && btn.getAttribute("aria-checked") === "true") {
          btn.focus();
        }
      });
    }
  }, [space]);

  const closeModal = () => {
    setSpace(false);
    if (refSpace.current) {
      refSpace.current.focus();
    }
  };

  return (
    <div role="presentation" className="relative z-0 flex">
      <button
        aria-label={`promote current color as ${promote}`}
        className="inline-flex h-8 items-center justify-center rounded-s-md border-holy-700 border-r-holy-950 bg-holy-900 px-3 text-holy-300 hover:bg-holy-800 focus:bg-holy-800 focus-visible:z-2 focus-visible:rounded-e-md active:border-holy-600 active:bg-holy-700"
        onClick={promoteColor}
      >
        <span>Promote current color</span>
      </button>
      <button
        ref={refSpace}
        aria-label="promote current color with specific color space"
        aria-haspopup="true"
        aria-expanded={space ? true : false}
        aria-controls="color-space"
        className="inline-flex size-8 items-center justify-center rounded-e-md border-holy-700 bg-holy-900 text-holy-300 hover:bg-holy-800 focus:bg-holy-800 focus-visible:rounded-s-md active:border-holy-600 active:bg-holy-700"
        onClick={handleModal}
      >
        <svg className="size-6" height={24} width={24} viewBox="0 0 24 24" fill="none">
          <path fill="currentColor" d="M12 14.6537L7.59625 10.25H16.4038L12 14.6537Z" />
        </svg>
      </button>
      <ul
        ref={refList}
        role="menu"
        aria-hidden={space ? false : true}
        aria-label="color space"
        id="color-space"
        className="absolute left-0 top-10 z-6 grid min-w-56 rounded-md border border-solid border-holy-700 bg-holy-900"
        style={
          space
            ? {
                opacity: "1",
                transform: "translateY(0rem)",
              }
            : {
                pointerEvents: "none",
                opacity: "0",
                transform: "translateY(-2.5rem)",
              }
        }
        onKeyDown={handleKeyboard}
      >
        <li className="inline-grid" role="none">
          <PromoteBtn current={space} state={promote} action={setHex} color={{ type: "hex", label: "HEX", code: hex }} />
        </li>
        <li className="inline-grid border-t border-solid border-t-holy-700" role="none">
          <PromoteBtn current={space} state={promote} action={setHsl} color={{ type: "hsl", label: "HSL", code: hsl }} />
        </li>
        <li className="inline-grid border-t border-solid border-t-holy-700" role="none">
          <PromoteBtn current={space} state={promote} action={setRgb} color={{ type: "rgb", label: "RGB", code: rgb }} />
        </li>
      </ul>
      {space ? <span role="presentation" className="overlay z-4" tabIndex={0} onFocus={closeModal}></span> : null}
    </div>
  );
}

function PromoteBtn({
  current,
  state,
  action,
  color,
}: {
  current: boolean;
  state: ColorMode;
  action: () => void;
  color: { type: ColorMode; label: string; code: string };
}) {
  return (
    <button
      role="menuitemradio"
      aria-checked={state === color.type ? true : false}
      className="flex flex-row gap-2 bg-holy-900 py-3 pl-2 pr-3 hover:bg-holy-800 focus:bg-holy-800 focus-visible:z-2 focus-visible:rounded-md active:bg-holy-700"
      tabIndex={current ? 0 : -1}
      onClick={action}
    >
      {state === color.type ? (
        <svg role="presentation" className="size-6" height={24} width={24} viewBox="0 0 24 24" fill="none">
          <path
            fill="currentColor"
            d="M9.55 17.6538L4.2155 12.3193L5.2845 11.25L9.55 15.5155L18.7155 6.35001L19.7845 7.41926L9.55 17.6538Z"
          />
        </svg>
      ) : (
        <span role="presentation" className="inline-flex size-6 items-center justify-center"></span>
      )}
      <div className="inline-flex flex-col items-start" role="none">
        <span className="text-sm font-medium text-holy-400">{color.label}</span>
        <code className="font-mono text-base text-holy-100">{color.code}</code>
      </div>
    </button>
  );
}

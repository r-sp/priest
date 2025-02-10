"use client";

import { useState, useEffect, useMemo } from "react";
import { Textarea } from "../common";
import clsx from "clsx";

interface Props {
  normal: string;
  large: string;
}

export default function Editable({ normal, large }: Props) {
  const [invert, setInvert] = useState<boolean>(false);
  const [reflect, setReflect] = useState<boolean>(false);

  useEffect(() => {
    const style = document.documentElement.style;
    const dark = style.getPropertyValue("color-scheme") === "dark";
    setReflect(dark);
  }, [setReflect]);

  const title = useMemo(
    () => <Textarea value={normal} className="text-sm" tabIndex={-1} />,
    [normal],
  );

  const description = useMemo(
    () => (
      <Textarea
        value={large}
        className="text-xl font-semibold md:text-2xl"
        tabIndex={-1}
      />
    ),
    [large],
  );

  return (
    <div
      role="presentation"
      className={clsx(
        "relative flex rounded-md",
        !invert && "ring",
        !invert && reflect && "ring-gray-800",
        !invert && !reflect && "ring-gray-200",
      )}
      style={
        invert
          ? {
              backgroundColor: "var(--currentColor)",
              color: "var(--contrastColor)",
              colorScheme: "dark",
            }
          : {
              backgroundColor: "var(--contrastColor)",
              color: "var(--currentColor)",
              colorScheme: "light",
            }
      }
    >
      <div className="mr-8 inline-flex grow flex-col gap-y-1 px-3 pt-3 pb-4 text-left">
        {title}
        {description}
      </div>
      <button
        aria-label={
          invert
            ? "set current color as foreground"
            : "set current color as background"
        }
        className="absolute top-2 right-[0.35rem] z-1 inline-flex size-8 items-center justify-center rounded-2xl"
        onClick={() => setInvert(!invert)}
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
            d="M10.5 22.6152V20.5H5.30775C4.80258 20.5 4.375 20.325 4.025 19.975C3.675 19.625 3.5 19.1974 3.5 18.6922V5.30773C3.5 4.80257 3.675 4.37498 4.025 4.02498C4.375 3.67498 4.80258 3.49998 5.30775 3.49998H10.5V1.38474H12V22.6152H10.5ZM5 18H10.5V11.4037L5 18ZM14 20.5V12L19 18V5.30773C19 5.23073 18.9679 5.16023 18.9038 5.09623C18.8398 5.03207 18.7693 4.99998 18.6923 4.99998H14V3.49998H18.6923C19.1974 3.49998 19.625 3.67498 19.975 4.02498C20.325 4.37498 20.5 4.80257 20.5 5.30773V18.6922C20.5 19.1974 20.325 19.625 19.975 19.975C19.625 20.325 19.1974 20.5 18.6923 20.5H14Z"
          />
        </svg>
      </button>
    </div>
  );
}

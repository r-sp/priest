"use client";

import { useState, useEffect, useMemo } from "react";
import { Textarea, Icon } from "../common";
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
        className="max-xs:text-xl text-2xl font-semibold"
        tabIndex={-1}
      />
    ),
    [large],
  );

  return (
    <div
      role="presentation"
      className={clsx(
        "max-xs:size-10 relative flex rounded-md",
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
      <div className="max-xs:hidden inline-flex grow flex-col gap-y-1 pt-3 pr-12 pb-4 pl-3 text-left">
        {title}
        {description}
      </div>
      <button
        aria-label={
          invert
            ? "set current color as foreground"
            : "set current color as background"
        }
        className="max-xs:left-1 max-xs:top-1 absolute top-2 right-[0.35rem] z-1 inline-flex size-8 items-center justify-center rounded-2xl"
        onClick={() => setInvert(!invert)}
      >
        <Icon size="24" type="compare" className="pointer-events-none size-6" />
      </button>
    </div>
  );
}

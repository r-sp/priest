"use client";

import type { ElementType, ComponentPropsWithoutRef } from "react";
import { useState, useEffect } from "react";
import clsx from "clsx";

export default function Sticky<T extends ElementType = "div">({
  offset,
  as,
  className,
  onTop,
  onVisible,
  onHidden,
  ...props
}: Omit<ComponentPropsWithoutRef<T>, "offset" | "as" | "className"> & {
  offset: number;
  as?: T;
  className?: string;
  onTop?: string;
  onVisible?: string;
  onHidden?: string;
}) {
  const [sticky, setSticky] = useState<"top" | "visible" | "hidden">("top");

  const Component = as ?? "div";

  useEffect(() => {
    let pageScroll = false;
    let prevScroll = window.scrollY;

    const handleSticky = () => {
      const currentScroll = window.scrollY;
      if (!pageScroll) {
        window.requestAnimationFrame(() => {
          if (currentScroll < offset) {
            setSticky("top");
          } else if (prevScroll > currentScroll) {
            setSticky("visible");
          } else if (prevScroll < currentScroll) {
            setSticky("hidden");
          } else {
            setSticky("hidden");
          }
          pageScroll = false;
          prevScroll = currentScroll;
        });
        pageScroll = true;
      }
    };

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const preferMotion = () => {
      setSticky("top");
      window.removeEventListener("scroll", handleSticky, {});
      if (!reduceMotion.matches) {
        window.addEventListener("scroll", handleSticky, { passive: true });
        return () => {
          window.removeEventListener("scroll", handleSticky, {});
        };
      }
    };

    preferMotion();
    reduceMotion.addEventListener("change", preferMotion);
  }, [offset]);

  const top = sticky === "top";
  const visible = sticky === "visible";
  const hidden = sticky === "hidden";

  return (
    <Component
      className={clsx(
        className,
        top && onTop,
        visible && onVisible,
        hidden && onHidden,
      )}
      {...props}
    />
  );
}

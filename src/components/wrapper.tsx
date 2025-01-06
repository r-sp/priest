import type { ElementType, ComponentPropsWithoutRef } from "react";
import clsx from "clsx";

export default function Wrapper<T extends ElementType = "div">({
  as,
  className,
  maxWidth = "1280",
  outerStyle,
  clearPadding = false,
  ...props
}: Omit<ComponentPropsWithoutRef<"div">, "as" | "className"> & {
  as?: T;
  maxWidth?: "768" | "1024" | "1280";
  className?: string;
  outerStyle?: string;
  clearPadding?: boolean;
}) {
  const Component = as ?? "div";

  const contentWidth =
    maxWidth === "768"
      ? "max-w-3xl"
      : maxWidth === "1024"
        ? "max-w-5xl"
        : maxWidth === "1280"
          ? "max-w-7xl"
          : "";

  if (clearPadding) {
    return (
      <Component
        className={clsx(className, contentWidth, "mx-auto w-full")}
        {...props}
      />
    );
  } else {
    return (
      <div className={clsx("px-3", outerStyle)}>
        <Component
          className={clsx(className, contentWidth, "mx-auto w-full")}
          {...props}
        />
      </div>
    );
  }
}

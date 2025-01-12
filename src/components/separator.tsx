import type { ElementType, ComponentPropsWithoutRef } from "react";
import clsx from "clsx";

export default function Separator<T extends ElementType = "span">({
  as,
  className,
  ...props
}: Omit<ComponentPropsWithoutRef<"span">, "as" | "className"> & {
  as?: T;
  className?: string;
}) {
  const Component = as ?? "span";

  return (
    <Component
      role="separator"
      className={clsx(
        className,
        "border-t border-t-gray-300 dark:border-t-gray-700",
      )}
      {...props}
    />
  );
}

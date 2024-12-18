import clsx from "clsx";

export default function Separator<T extends React.ElementType = "span">({
  as,
  className,
  ...props
}: Omit<React.ComponentPropsWithoutRef<"span">, "as" | "className"> & {
  as?: T;
  className?: string;
}) {
  const Component = as ?? "span";

  return (
    <Component
      role="separator"
      className={clsx(
        className,
        "border-t border-t-neutral-400 dark:border-t-neutral-700",
      )}
      {...props}
    />
  );
}

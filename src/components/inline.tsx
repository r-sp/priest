import type { ReactNode, ElementType, ComponentPropsWithoutRef } from "react";

export default function Inline<T extends ElementType = "div">({
  children,
  bg,
  as,
  ...props
}: Omit<ComponentPropsWithoutRef<"div">, "bg" | "as"> & {
  children: ReactNode;
  bg: string;
  as?: T;
}) {
  const Component = as ?? "div";

  return (
    <Component {...props} style={{ ["--bg" as string]: bg }}>
      {children}
    </Component>
  );
}

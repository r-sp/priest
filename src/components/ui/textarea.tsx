"use client";

import { useState } from "react";
import clsx from "clsx";

export default function Textarea({
  value,
  className,
  ...props
}: Omit<React.ComponentPropsWithoutRef<"span">, "className"> & {
  value: string;
  className: string;
}) {
  const [content, setContent] = useState<string>(value);

  return (
    <span
      role="textbox"
      className={clsx(className, "resize-none overflow-hidden")}
      contentEditable
      tabIndex={0}
      dangerouslySetInnerHTML={{ __html: content }}
      onBlur={(e) => setContent(e.currentTarget.innerText)}
      {...props}
    />
  );
}

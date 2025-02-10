"use client";

import type { ComponentPropsWithoutRef } from "react";
import { useState } from "react";
import clsx from "clsx";

interface Props extends Omit<ComponentPropsWithoutRef<"span">, "className"> {
  value: string;
  className: string;
}

export default function Textarea({ value, className, ...props }: Props) {
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

"use client";

import type { ComponentPropsWithoutRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Props extends Omit<ComponentPropsWithoutRef<"a">, "href" | "modal"> {
  href: string;
  modal: boolean;
}

export default function Porter({ href, modal, children, ...props }: Props) {
  const router = useRouter();
  return (
    <Link
      href={href}
      prefetch={false}
      replace={true}
      scroll={false}
      onClick={(e) => {
        if (!modal) {
          e.preventDefault();
          router.push(href);
        }
      }}
      {...props}
    >
      {children}
    </Link>
  );
}

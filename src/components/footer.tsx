"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
const ThemeSwitcher = dynamic(() => import("./theme/switcher"), { ssr: false });

export default function Footer() {
  return (
    <footer>
      <div className="px-3 pt-16 pb-12">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
          <div role="none" className="inline-flex h-9 items-center">
            <Link
              href="https://github.com/r-sp/priest"
              rel="noopener"
              target="_blank"
              className="text-sm"
            >
              <span>The Holy Colors</span>
            </Link>
          </div>
          <ThemeSwitcher />
        </div>
      </div>
    </footer>
  );
}

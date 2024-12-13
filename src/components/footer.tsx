"use client";

import ThemeSwitcher from "./theme/switcher";
import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <nav
        aria-label="site links"
        className="mx-auto flex w-full max-w-7xl items-center justify-between pt-12 pb-8 max-xl:px-3"
      >
        <Link
          href="https://github.com/r-sp/priest"
          rel="noopener"
          target="_blank"
          className="text-sm"
        >
          <span>The Holy Colors</span>
        </Link>
        <ThemeSwitcher />
      </nav>
    </footer>
  );
}

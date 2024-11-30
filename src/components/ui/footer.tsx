"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="px-2 py-12 xl:mx-auto xl:max-w-screen-xl" role="none">
        <Link href="/color" className="text-sm font-medium text-holy-400">
          <span>The Holy Colors</span>
        </Link>
      </div>
    </footer>
  );
}

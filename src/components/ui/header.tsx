"use client";

import { ColorSlider } from "../color";
import Link from "next/link";

export default function Header() {
  return (
    <header>
      <div className="px-2 xl:mx-auto xl:max-w-screen-xl" role="none">
        <Link href="/" className="inline-flex py-4 text-base font-medium text-holy-300 max-sm:pointer-events-auto">
          <span>Priest</span>
        </Link>
        <ColorSlider />
      </div>
    </header>
  );
}

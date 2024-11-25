import { type ReactNode } from "react";
import { type HarmonyColor } from "~/lib/types";
import { ColorProvider } from "../provider";
import { getRandomColor } from "~/lib/utils";
import Link from "next/link";
import ColorPicker from "./color-picker";
import ColorRandom from "./color-random";

export default function Layout(props: Readonly<{ children: ReactNode }>) {
  const random = getRandomColor();
  const harmony: HarmonyColor = "rectangle";
  const color = { ...random, harmony: harmony };

  return (
    <div id="priest" className="min-h-svh sm:grid sm:grid-cols-rail xl:mx-auto xl:max-w-screen-2xl" role="none">
      <ColorProvider initValue={color}>
        <nav className="p-2 sm:z-10 sm:px-4 max-sm:sticky max-sm:left-0 max-sm:right-0 max-sm:top-0 max-sm:z-20">
          <div
            className="flex gap-4 sm:sticky sm:left-0 sm:top-2 sm:flex-col max-sm:flex-row max-sm:justify-between"
            role="none"
          >
            <ColorPicker />
            <ColorRandom />
          </div>
        </nav>
        <div className="sm:border-l sm:border-solid sm:border-l-holy-800 sm:px-2" role="none">
          <header>
            <div
              className="flex h-12 items-center px-2 xl:mx-auto xl:max-w-screen-xl max-sm:pointer-events-none max-sm:relative max-sm:z-8 max-sm:-mt-12 max-sm:justify-center"
              role="none"
            >
              <Link href="/" className="text-base font-medium text-holy-100 max-sm:pointer-events-auto">
                <span>Priest</span>
              </Link>
            </div>
          </header>
          <main>
            <div className="px-2 xl:mx-auto xl:max-w-screen-xl" role="none">
              {props.children}
            </div>
          </main>
          <footer>
            <div className="mt-4 px-2 py-8 xl:mx-auto xl:max-w-screen-xl max-sm:text-center" role="none">
              <Link href="/" className="text-sm font-medium text-holy-300">
                <span>The Holy Colors</span>
              </Link>
            </div>
          </footer>
        </div>
      </ColorProvider>
    </div>
  );
}

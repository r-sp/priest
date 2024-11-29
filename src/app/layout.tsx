import { type ReactNode } from "react";
import { Geist, GeistMono } from "~/components/font";
import { ColorProvider, ColorSlider } from "~/components/color";
import { getRandomColor } from "~/lib/utils";
import clsx from "clsx";
import Link from "next/link";
import "./style.css";

export default function RootLayout(props: Readonly<{ children: ReactNode }>) {
  const color = getRandomColor();

  return (
    <html lang="en" className={clsx(Geist.variable, GeistMono.variable)}>
      <body>
        <ColorProvider initValue={color}>
          <header>
            <div className="px-2 xl:mx-auto xl:max-w-screen-xl" role="none">
              <Link href="/" className="inline-flex py-4 text-base font-medium text-holy-300 max-sm:pointer-events-auto">
                <span>Priest</span>
              </Link>
              <ColorSlider />
            </div>
          </header>
          <main>{props.children}</main>
        </ColorProvider>
        <footer>
          <div className="px-2 py-12 xl:mx-auto xl:max-w-screen-xl" role="none">
            <Link href="/color" className="text-sm font-medium text-holy-400">
              <span>The Holy Colors</span>
            </Link>
          </div>
        </footer>
      </body>
    </html>
  );
}

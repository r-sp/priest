import { type ReactNode } from "react";
import { ColorProvider } from "../provider";
import { getRandomColor } from "~/lib/utils";

export default function Layout(props: Readonly<{ children: ReactNode }>) {
  const color = getRandomColor();
  const random = {
    raw: color.toRgb(),
    hex: color.toHex(),
    hsl: color.toHsl(),
    hsv: color.toHsv(),
    rgb: color.toRgb(),
  };

  return (
    <div id="priest" role="none">
      <ColorProvider initValue={random}>
        <header>
          <div className="flex h-12 items-center px-4 xl:mx-auto xl:max-w-screen-xl" role="none">
            <h1 className="text-base font-medium text-holy-300" id="site-name">
              Priest
            </h1>
          </div>
        </header>
        <main>{props.children}</main>
        <footer>
          <div className="mt-4 px-4 py-8 xl:mx-auto xl:max-w-screen-xl" role="none">
            <p className="text-sm font-medium text-holy-300">The Holy Colors</p>
          </div>
        </footer>
      </ColorProvider>
    </div>
  );
}

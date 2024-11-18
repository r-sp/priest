import { type ReactNode } from "react";

export default function BaseLayout(props: Readonly<{ children: ReactNode }>) {
  return (
    <div id="priest" role="none" className="grid">
      <header>
        <div className="flex h-12 items-center px-4 xl:mx-auto xl:max-w-screen-xl" role="none">
          <h1 className="text-xl font-medium text-holy-300" id="site-name">
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
    </div>
  );
}

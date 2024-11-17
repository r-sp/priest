import { type ReactNode } from "react";

export default function BaseLayout(props: Readonly<{ children: ReactNode }>) {
  return (
    <div id="priest" role="none">
      <header>
        <div className="site-header" role="none">
          <h1 className="site-name">Priest</h1>
        </div>
      </header>
      <main>{props.children}</main>
      <footer>
        <div className="site-footer" role="none">
          <p className="site-info">The Holy Colors</p>
        </div>
      </footer>
    </div>
  );
}

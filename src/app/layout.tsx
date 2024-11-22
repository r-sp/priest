import { type ReactNode } from "react";
import { Geist, GeistMono } from "~/components/font";
import Priest from "~/components/ui/priest";
import clsx from "clsx";
import "./style.css";

export default function RootLayout(props: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={clsx(Geist.variable, GeistMono.variable)}>
      <body>
        <div id="root" role="none">
          <Priest>{props.children}</Priest>
          <div id="portal" role="none"></div>
        </div>
      </body>
    </html>
  );
}

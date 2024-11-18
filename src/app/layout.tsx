import { type ReactNode } from "react";
import { HostGrotesk } from "~/components/font";
import Priest from "~/components/ui/priest";
import "./style.css";

export default function RootLayout(props: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={HostGrotesk.variable}>
      <body>
        <div id="root" role="none">
          <Priest>{props.children}</Priest>
          <div id="portal" role="none" className="flex"></div>
        </div>
      </body>
    </html>
  );
}

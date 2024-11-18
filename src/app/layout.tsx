import { type ReactNode } from "react";
import { HostGrotesk } from "~/components/font";
import BaseLayout from "~/components/base";
import "./style.css";

export default function RootLayout(props: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={HostGrotesk.variable}>
      <body>
        <div id="root" role="none">
          <BaseLayout>{props.children}</BaseLayout>
          <div id="portal" role="none" className="flex"></div>
        </div>
      </body>
    </html>
  );
}

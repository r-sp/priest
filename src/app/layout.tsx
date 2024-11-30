import { type ReactNode } from "react";
import { Geist, GeistMono } from "~/components/font";
import { Header, Footer } from "~/components/ui";
import { ColorProvider } from "~/components/color";
import { initColorProvider } from "~/lib/utils";
import clsx from "clsx";
import "./style.css";

export default function RootLayout(props: Readonly<{ children: ReactNode }>) {
  const color = initColorProvider();

  return (
    <html lang="en" className={clsx(Geist.variable, GeistMono.variable)}>
      <body>
        <ColorProvider initValue={color}>
          <Header />
          <main>{props.children}</main>
          <Footer />
        </ColorProvider>
      </body>
    </html>
  );
}

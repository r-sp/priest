import { type ReactNode } from "react";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import clsx from "clsx";
import Header from "~/components/header";
import Footer from "~/components/footer";
import "./style.css";

export default function RootLayout(props: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={clsx(GeistSans.variable, GeistMono.variable)}>
      <body>
        <Header />
        <main>{props.children}</main>
        <Footer />
      </body>
    </html>
  );
}

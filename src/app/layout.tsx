import { type ReactNode } from "react";
import { HostGrotesk } from "~/components/font";
import Header from "~/components/header";
import Footer from "~/components/footer";
import "./style.css";

export default function RootLayout(props: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={HostGrotesk.variable}>
      <body>
        <Header />
        <main>{props.children}</main>
        <Footer />
      </body>
    </html>
  );
}

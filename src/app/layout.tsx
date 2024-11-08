import { type ReactNode } from "react";
import { CounterStoreProvider } from "./provider";

export default function RootLayout(props: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <CounterStoreProvider>{props.children}</CounterStoreProvider>
      </body>
    </html>
  );
}

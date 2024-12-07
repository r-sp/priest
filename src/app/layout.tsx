import clsx from "clsx";
import { Roboto_Flex } from "next/font/google";
import { ColorProvider } from "~/components/color/provider";
import { initColorStore } from "~/lib/color";
import "./style.css";

const RobotoFlex = Roboto_Flex({
  weight: "variable",
  style: "normal",
  display: "swap",
  variable: "--roboto-flex",
  subsets: ["latin", "latin-ext"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const color = initColorStore();

  return (
    <ColorProvider initValue={color}>
      <html lang="en" className={clsx(RobotoFlex.className, "dark")}>
        <body className="bg-neutral-50 text-neutral-500 antialiased dark:bg-neutral-900 dark:text-neutral-400">
          <main>{children}</main>
        </body>
      </html>
    </ColorProvider>
  );
}

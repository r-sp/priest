import clsx from "clsx";
import { Geist, Geist_Mono } from "next/font/google";
import { ColorProvider } from "~/components/color/provider";
import { randomColor } from "~/lib/color";
import "./style.css";

const fontSans = Geist({
  weight: "variable",
  style: "normal",
  display: "swap",
  variable: "--geist-sans",
  subsets: ["latin", "latin-ext"],
});

const fontMono = Geist_Mono({
  weight: "variable",
  style: "normal",
  display: "swap",
  variable: "--geist-mono",
  subsets: ["latin", "latin-ext"],
});

export const revalidate = 86400;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const colorByDate = randomColor();

  return (
    <ColorProvider initValue={colorByDate}>
      <html
        lang="en"
        className={clsx(fontSans.variable, fontMono.variable, "dark")}
      >
        <body className="bg-neutral-50 text-neutral-500 antialiased dark:bg-neutral-900 dark:text-neutral-400">
          <main>{children}</main>
        </body>
      </html>
    </ColorProvider>
  );
}

import { Geist, Geist_Mono } from "next/font/google";
import { ColorProvider } from "~/components/color/provider";
import { randomColor } from "~/lib/color";
import Header from "~/components/header";
import Link from "next/link";
import clsx from "clsx";
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
          <Header />
          <main id="content">{children}</main>
          <footer>
            <nav
              aria-label="site links"
              className="mx-auto w-full max-w-7xl pt-12 pb-8 max-xl:px-3"
            >
              <Link
                href="https://github.com/r-sp/priest"
                rel="noopener"
                target="_blank"
                className="text-sm"
              >
                <span>The Holy Colors</span>
              </Link>
            </nav>
          </footer>
        </body>
      </html>
    </ColorProvider>
  );
}

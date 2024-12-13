import { Geist, Geist_Mono } from "next/font/google";
import { ColorProvider, ThemeScript, Header, Footer } from "~/components";
import { randomColor } from "~/lib/color";
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
        className={clsx(fontSans.variable, fontMono.variable)}
        suppressHydrationWarning
      >
        <head>
          <ThemeScript />
        </head>
        <body className="bg-neutral-50 text-neutral-500 antialiased dark:bg-neutral-950 dark:text-neutral-400">
          <Header />
          <main id="content">{children}</main>
          <Footer />
        </body>
      </html>
    </ColorProvider>
  );
}

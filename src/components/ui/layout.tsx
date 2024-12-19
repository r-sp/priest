"use client";

import { ColorProvider } from "~/app/provider";
import { Geist, Geist_Mono } from "next/font/google";
import { getTodayColor } from "~/lib/color";
import ThemeScript from "../theme/script";
import clsx from "clsx";

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

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const color = getTodayColor();

  return (
    <ColorProvider initValue={color}>
      <html
        lang="en"
        className={clsx(fontSans.variable, fontMono.variable)}
        suppressHydrationWarning
      >
        <body className="bg-neutral-50 text-neutral-500 antialiased dark:bg-neutral-950 dark:text-neutral-400">
          <ThemeScript />
          {children}
        </body>
      </html>
    </ColorProvider>
  );
}

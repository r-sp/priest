import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeScript } from "~/components/theme";
import { Provider } from "~/context";
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

export const metadata: Metadata = {
  title: {
    default: "Priest: The Holy Colors",
    template: "%s | The Holy Colors",
  },
  description:
    "Explore contemporary color palettes using advanced color spaces for vibrant and harmonious designs.",
  metadataBase: new URL("https://priest.vercel.app"),
  openGraph: {
    siteName: "Priest: The Holy Colors",
    url: "/",
    type: "website",
  },
  alternates: {
    canonical: "/",
  },
  keywords: "color space, hex, rgb, hsl, hwb, lab, lch, oklab, oklch",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={clsx("antialiased", "bg-gray-50 dark:bg-gray-950")}>
        <ThemeScript />
        <Provider>
          <div className={clsx(fontSans.variable, fontMono.variable)}>
            <div className="relative flex min-h-svh flex-col font-sans">
              {children}
            </div>
          </div>
        </Provider>
      </body>
    </html>
  );
}

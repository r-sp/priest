import { type Metadata } from "next";
import { Roboto_Flex } from "next/font/google";
import { ColorProvider } from "~/components/color/provider";
import "./style.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Priest",
    default: "Priest",
  },
  description: "The Holy Colors",
};

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
  return (
    <ColorProvider>
      <html lang="en" className={RobotoFlex.className}>
        <body className="bg-neutral-50 text-neutral-500 antialiased dark:bg-neutral-900 dark:text-neutral-400">
          <main>{children}</main>
        </body>
      </html>
    </ColorProvider>
  );
}

import { type Metadata } from "next";
import "./style.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Priest",
    default: "Priest",
  },
  description: "The Holy Colors",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

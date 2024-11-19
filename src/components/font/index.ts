import localFont from "next/font/local";

export const Geist = localFont({
  src: [
    { path: "./geist-sans.woff2", style: "normal" },
    { path: "./geist-sans-ext.woff2", style: "normal" },
  ],
  display: "swap",
  weight: "100 900",
  variable: "--geist-sans",
  declarations: [{ prop: "font-optical-sizing", value: "auto" }],
  fallback: [
    "ui-sans-serif",
    "system-ui",
    "sans-serif",
    "'Apple Color Emoji'",
    "'Segoe UI Emoji'",
    "'Segoe UI Symbol'",
    "'Noto Color Emoji'",
  ],
  preload: true,
});

export const GeistMono = localFont({
  src: [
    { path: "./geist-mono.woff2", style: "normal" },
    { path: "./geist-mono-ext.woff2", style: "normal" },
  ],
  display: "swap",
  weight: "100 900",
  variable: "--geist-mono",
  declarations: [{ prop: "font-optical-sizing", value: "auto" }],
  fallback: [
    "ui-monospace",
    "SFMono-Regular",
    "Menlo",
    "Monaco",
    "Consolas",
    "'Liberation Mono'",
    "'Courier New'",
    "monospace",
  ],
  preload: true,
});

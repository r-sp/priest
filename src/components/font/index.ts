import localFont from "next/font/local";

export const Geist = localFont({
  src: [{ path: "./geist-sans.woff2", style: "normal" }],
  display: "swap",
  weight: "100 900",
  variable: "--geist-sans",
  declarations: [
    { prop: "font-optical-sizing", value: "auto" },
    {
      prop: "unicode-range",
      value:
        "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD",
    },
  ],
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
  src: [{ path: "./geist-mono.woff2", style: "normal" }],
  display: "swap",
  weight: "100 900",
  variable: "--geist-mono",
  declarations: [
    { prop: "font-optical-sizing", value: "auto" },
    {
      prop: "unicode-range",
      value:
        "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD",
    },
  ],
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

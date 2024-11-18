import { type Config } from "tailwindcss";

const round = (num: number) => {
  return num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, "$1")
    .replace(/\.0$/, "");
};
const rem = (px: number) => `${round(px / 16)}rem`;
const em = (px: number) => `${round(px / 16)}em`;

export default {
  content: ["./src/app/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      inherit: "inherit",
      holy: {
        100: "#f2f3f4",
        200: "#c2c3c4",
        300: "#a4a5a6",
        400: "#727374",
        600: "#545556",
        700: "#343536",
        800: "#242526",
        900: "#121314",
      },
    },
    fontFamily: {
      sans: ["var(--font-sans)"],
    },
    fontSize: {
      xs: [rem(12), { lineHeight: rem(16) }],
      sm: [rem(14), { lineHeight: rem(20) }],
      base: [rem(16), { lineHeight: rem(24) }],
      lg: [rem(18), { lineHeight: rem(28) }],
      xl: [rem(20), { lineHeight: rem(28) }],
      "2xl": [rem(24), { lineHeight: rem(32) }],
      "3xl": [rem(32), { lineHeight: rem(36) }],
      "4xl": [rem(36), { lineHeight: rem(40) }],
      "5xl": [rem(48), { lineHeight: "1" }],
      "6xl": [rem(60), { lineHeight: "1" }],
    },
    screens: {
      xs: { raw: `(min-width: ${em(512)})` },
      sm: { raw: `(min-width: ${em(640)})` },
      md: { raw: `(min-width: ${em(768)})` },
      lg: { raw: `(min-width: ${em(1024)})` },
      xl: { raw: `(min-width: ${em(1280)})` },
      "max-xs": { raw: `(max-width: ${em(512)})` },
      "max-sm": { raw: `(max-width: ${em(640)})` },
      "max-md": { raw: `(max-width: ${em(768)})` },
      "max-lg": { raw: `(max-width: ${em(1024)})` },
      "max-xl": { raw: `(max-width: ${em(1280)})` },
    },
    extend: {
      maxWidth: {
        "screen-xs": em(512 + 32),
        "screen-sm": em(640 + 32),
        "screen-md": em(768 + 32),
        "screen-lg": em(1024 + 32),
        "screen-xl": em(1280 + 32),
      },
    },
  },
  corePlugins: {
    preflight: true,
    backdropOpacity: false,
    backgroundOpacity: false,
    borderOpacity: false,
    divideOpacity: false,
    placeholderOpacity: false,
    ringOpacity: false,
    textOpacity: false,
    boxShadow: false,
    boxShadowColor: false,
    dropShadow: false,
    invert: false,
    backdropInvert: false,
  },
} satisfies Config;

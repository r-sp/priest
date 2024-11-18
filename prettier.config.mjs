/** @type {import('prettier').Config} */

const config = {
  arrowParens: "always",
  printWidth: 128,
  singleQuote: false,
  jsxSingleQuote: false,
  semi: true,
  trailingComma: "all",
  tabWidth: 2,
  plugins: ["prettier-plugin-tailwindcss"],
};

export default config;

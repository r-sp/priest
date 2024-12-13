"use client";

export default function ThemeScript() {
  return (
    <script
      suppressHydrationWarning={true}
      dangerouslySetInnerHTML={{
        __html: `(${themeScript.toString()})()`,
      }}
    />
  );
}

function themeScript() {
  const auto = "theme";
  const light = "light";
  const dark = "dark";
  const system = "(prefers-color-scheme: dark)";

  try {
    const theme = document.documentElement.classList;
    const local = localStorage.getItem(auto);
    if (local === dark) {
      theme.add(dark);
    } else if (local === light) {
      theme.remove(dark);
    } else {
      if (window.matchMedia(system).matches) {
        theme.add(dark);
      } else {
        theme.remove(dark);
      }
    }
  } catch (e) {
    console.error(e);
  }
}

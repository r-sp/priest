"use client";

export default function ThemeScript() {
  return (
    <script
      suppressHydrationWarning={true}
      dangerouslySetInnerHTML={{
        __html: `(function i(){try{var s=document.documentElement.classList,e=window.localStorage.getItem("theme"),x=window.matchMedia("(prefers-color-scheme:dark)");"dark"===e?s.add("dark"):"light"===e?s.remove("dark"):x.matches?s.add("dark"):s.remove("dark")}catch(y){console.error(y)}})()`,
      }}
    />
  );
}

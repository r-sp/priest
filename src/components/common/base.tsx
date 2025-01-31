"use client";

import type { ReactNode } from "react";
import type { ColorScheme } from "~/types/color";
import { useEffect, useMemo, useCallback, Fragment } from "react";
import { useSession } from "~/hooks";
import { createService } from "~/utils";
import { Store } from "~/context";
import Link from "next/link";

interface Props {
  children: ReactNode;
  portal: ReactNode;
}

export default function BaseLayout({ children, portal }: Props) {
  const session = createService();
  return (
    <Store initValue={session}>
      <ThemeScript />
      <header>
        <div className="pr-3 pl-4">
          <div className="max-w-8xl mx-auto flex h-14 items-center justify-between">
            <Logo />
            <ThemeSwitcher />
          </div>
        </div>
      </header>
      <main>
        {children}
        {portal}
      </main>
      <footer>
        <div className="mt-16 px-4 py-8">
          <div className="max-w-8xl mx-auto">
            <Slogan />
          </div>
        </div>
      </footer>
    </Store>
  );
}

function Logo() {
  return (
    <Link
      href="/"
      className="size-8 rounded-2xl bg-gray-950 text-gray-50 dark:bg-gray-50 dark:text-gray-950"
    >
      <svg
        role="img"
        aria-label="the holy sign"
        className="pointer-events-none size-8"
        viewBox="0 0 32 32"
        fill="none"
      >
        <path
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.51 31.6183C12.944 27.0829 13.6523 23.4078 14.525 20.4314C15.956 21.8239 17.3087 22.6754 18.6021 23.0175C20.032 23.3956 21.3133 23.1299 22.4033 22.4271C23.4603 21.7455 24.3015 20.6789 24.9757 19.4935C26.3229 17.1251 27.1573 14.0044 27.6557 11.5368C27.9072 10.2914 28.0776 9.18934 28.1851 8.39795C28.2389 8.00196 28.2771 7.68298 28.302 7.46181C28.3144 7.3512 28.3235 7.265 28.3296 7.2058C28.3326 7.1762 28.3349 7.15334 28.3364 7.13756L28.3382 7.11922L28.3388 7.11257C28.3389 7.11209 28.3389 7.11172 27.4286 7.027L28.3389 7.11172C28.3802 6.66801 28.0956 6.25916 27.6651 6.14386L27.4286 7.027C27.6651 6.14386 27.6641 6.14359 27.6631 6.14331L27.6607 6.14268L27.6549 6.14116L27.6478 6.13935L27.6391 6.13715C27.6267 6.13407 27.6108 6.1302 27.5912 6.1257C27.5523 6.11672 27.4991 6.10522 27.4327 6.09256C27.3 6.06726 27.114 6.03723 26.8817 6.01331C26.4175 5.9655 25.7656 5.94177 24.9845 6.03046C23.4147 6.20873 21.3413 6.83991 19.2466 8.60591C17.2991 10.2478 15.3735 12.8334 13.8036 16.8648C12.8299 15.6218 11.7798 14.0852 10.6502 12.2095C9.25777 9.89759 8.1593 8.28109 7.30916 7.27426C6.88928 6.777 6.48894 6.37846 6.10691 6.12518C5.76342 5.89745 5.16141 5.61339 4.5399 5.92907C3.97219 6.21742 3.79775 6.8154 3.72996 7.17583C3.65079 7.59679 3.64318 8.10514 3.67372 8.64979C3.73539 9.74998 3.96706 11.2102 4.30153 12.8835C4.97254 16.2405 6.09021 20.6123 7.23116 25.0075C7.35336 25.4782 7.47584 25.9493 7.5981 26.4195L7.59864 26.4215C7.92738 27.6859 8.25454 28.9441 8.57054 30.1742C9.25103 30.5316 9.96041 30.8414 10.6943 31.0993C10.2708 29.4318 9.82037 27.6997 9.36905 25.964L9.36894 25.9636C9.24621 25.4916 9.12341 25.0193 9.00107 24.548C7.8572 20.1417 6.7536 15.8219 6.09463 12.5251C5.76411 10.8715 5.55362 9.51427 5.49942 8.54744C5.4873 8.33125 5.48368 8.14465 5.48678 7.98583C5.60865 8.1081 5.7501 8.26219 5.91203 8.45396C6.66507 9.34579 7.70301 10.8604 9.08373 13.1529C10.5128 15.5257 11.8443 17.4145 13.0885 18.8825C12.0485 22.1113 11.2188 26.125 10.7226 31.1092C11.3039 31.3122 11.9004 31.4826 12.51 31.6183ZM5.00803 7.59902C5.00821 7.59951 5.0134 7.60209 5.02307 7.60533C5.01268 7.60015 5.00785 7.59853 5.00803 7.59902ZM5.55749 7.39233C5.56241 7.38332 5.56439 7.37791 5.56415 7.37745C5.56391 7.37699 5.56145 7.3815 5.55749 7.39233ZM20.4252 10.0039C18.6205 11.5255 16.7042 14.1087 15.1599 18.464C15.2782 18.5915 15.3953 18.7144 15.5111 18.8326C16.939 20.2905 18.121 20.9988 19.0696 21.2497C19.9778 21.4899 20.7326 21.3286 21.4124 20.8903C22.1252 20.4307 22.7875 19.6421 23.3863 18.5895C24.5851 16.4819 25.3744 13.5954 25.8633 11.1747C26.1054 9.976 26.2696 8.91366 26.3732 8.15171C26.3898 8.02991 26.4047 7.91586 26.4182 7.81025C26.091 7.79144 25.6741 7.79248 25.1908 7.84736C23.9346 7.99002 22.2117 8.4978 20.4252 10.0039Z"
        />
      </svg>
    </Link>
  );
}

function Slogan() {
  return (
    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
      <Link
        href="https://github.com/r-sp/priest"
        rel="noopener"
        target="_blank"
      >
        <span>The Holy Colors</span>
      </Link>
    </p>
  );
}

function ThemeSwitcher() {
  const theme = useSession((state) => state.theme);
  const setTheme = useSession((state) => state.setTheme);
  const getTheme = useMemo(() => theme, [theme]);

  const getLocalStorage = (key: string): string | null | undefined => {
    let local;
    if (typeof window !== "undefined") {
      try {
        local = window.localStorage.getItem(key);
      } catch (e) {
        console.error(e);
      }
    }
    return local;
  };

  const setLocalStorage = (key: string, value: string): void => {
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(key, value);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const removeTheme = (variant: ColorScheme): void => {
    document.documentElement.classList.remove(variant);
  };

  const addTheme = (variant: ColorScheme): void => {
    document.documentElement.classList.add(variant);
    document.documentElement.style.colorScheme = variant;
  };

  useEffect(() => {
    if (getTheme === undefined) {
      const localTheme = getLocalStorage("theme") as ColorScheme;
      if (localTheme === "dark") {
        setTheme("dark");
      } else if (localTheme === "light") {
        setTheme("light");
      } else {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          setTheme("dark");
          setLocalStorage("theme", "dark");
        } else {
          setTheme("light");
          setLocalStorage("theme", "light");
        }
      }
    }
  }, [getTheme, setTheme]);

  const handleTheme = useCallback(
    (clean: ColorScheme, apply: ColorScheme) => {
      removeTheme(clean);
      addTheme(apply);
      setTheme(apply);
      setLocalStorage("theme", apply);
    },
    [setTheme],
  );

  const isDark = getTheme === "dark";

  const iconSun =
    "M12 16.5C10.7513 16.5 9.68917 16.0622 8.8135 15.1865C7.93783 14.3108 7.5 13.2487 7.5 12C7.5 10.7513 7.93783 9.68917 8.8135 8.8135C9.68917 7.93783 10.7513 7.5 12 7.5C13.2487 7.5 14.3108 7.93783 15.1865 8.8135C16.0622 9.68917 16.5 10.7513 16.5 12C16.5 13.2487 16.0622 14.3108 15.1865 15.1865C14.3108 16.0622 13.2487 16.5 12 16.5ZM5 12.75H1.25V11.25H5V12.75ZM22.75 12.75H19V11.25H22.75V12.75ZM11.25 5V1.25H12.75V5H11.25ZM11.25 22.75V19H12.75V22.75H11.25ZM6.573 7.577L4.23075 5.3155L5.2905 4.20575L7.54625 6.523L6.573 7.577ZM18.7095 19.7943L16.4385 17.4615L17.427 16.423L19.7693 18.6845L18.7095 19.7943ZM16.423 6.573L18.6845 4.23075L19.7943 5.2905L17.477 7.54625L16.423 6.573ZM4.20575 18.7095L6.5385 16.4385L7.55775 17.427L5.30575 19.7788L4.20575 18.7095Z";
  const iconMoon =
    "M12.0288 20.5C9.6678 20.5 7.66089 19.6736 6.00805 18.0207C4.35539 16.3681 3.52905 14.3611 3.52905 12C3.52905 9.73714 4.29664 7.79647 5.8318 6.17797C7.36697 4.55931 9.24672 3.68264 11.4711 3.54797C11.6147 3.54797 11.7558 3.55314 11.8943 3.56347C12.0326 3.57381 12.1685 3.58922 12.3018 3.60972C11.7916 4.08656 11.3853 4.66281 11.0828 5.33847C10.7801 6.01414 10.6288 6.73464 10.6288 7.49997C10.6288 9.13881 11.2025 10.5319 12.3498 11.6792C13.497 12.8264 14.89 13.4 16.5288 13.4C17.3045 13.4 18.0276 13.2487 18.6981 12.9462C19.3686 12.6436 19.9391 12.2371 20.4096 11.727C20.4301 11.8603 20.4455 11.9962 20.4558 12.1347C20.466 12.2731 20.4711 12.4141 20.4711 12.5577C20.3429 14.7821 19.4696 16.6618 17.8511 18.197C16.2324 19.7323 14.2916 20.5 12.0288 20.5Z";

  return (
    <Fragment>
      {theme === undefined ? (
        <div className="skeleton size-8 rounded-full" />
      ) : (
        <button
          aria-label={`set theme ${isDark ? "light" : "dark"}`}
          className="inline-flex size-8 items-center justify-center rounded-full text-gray-800 dark:text-gray-200"
          onClick={() => {
            if (isDark) {
              handleTheme("dark", "light");
            } else {
              handleTheme("light", "dark");
            }
          }}
        >
          <svg
            role="none"
            className="size-6"
            width={24}
            height={24}
            viewBox="0 0 24 24"
          >
            <path fill="currentColor" d={isDark ? iconSun : iconMoon} />
          </svg>
        </button>
      )}
    </Fragment>
  );
}

function ThemeScript() {
  return (
    <script
      suppressHydrationWarning={true}
      dangerouslySetInnerHTML={{
        __html: `(function(h,t,m,l){try{var o=window.localStorage.getItem("theme"),s=function(e,x){h.classList.remove(e);h.classList.add(x);h.style.colorScheme=x;};o===t?(s(l,t)):o===l?(s(t,l)):m.matches?(s(l,t)):(s(t,l));}catch(e){console.error(e)}})(document.documentElement,"dark",window.matchMedia("(prefers-color-scheme:dark)"),"light")`,
      }}
    />
  );
}

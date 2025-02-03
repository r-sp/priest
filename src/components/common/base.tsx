import type { ReactNode } from "react";
import { createService } from "~/utils";
import { Store } from "~/context";
import { InputCss, InputSlider } from "../ui";
import ThemeSwitcher from "./theme";
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
      <div className="md:px-4">
        <div className="max-w-8xl mx-auto grid min-h-svh content-baseline gap-y-8 md:grid-cols-[20rem_1fr] md:gap-x-4 lg:grid-cols-[24rem_1fr] xl:grid-cols-[28rem_1fr]">
          <header>
            <nav className="flex flex-col gap-y-6 px-4 pt-4 md:sticky md:top-0 md:px-0">
              <div className="flex items-center justify-between">
                <Logo />
                <ThemeSwitcher />
              </div>
              <InputCss />
              <InputSlider />
            </nav>
          </header>
          <main>{children}</main>
          <footer>
            <div className="mt-16 px-4 py-8">
              <div className="max-w-8xl mx-auto">
                <Slogan />
              </div>
            </div>
          </footer>
        </div>
      </div>
      {portal}
    </Store>
  );
}

function Logo() {
  return (
    <Link href="/" className="size-8 rounded-2xl">
      <svg
        role="img"
        aria-label="the holy sign"
        className="pointer-events-none size-8"
        width={32}
        height={32}
        viewBox="0 0 32 32"
        fill="none"
      >
        <path
          fill="url(#holy-circle)"
          d="M0 16C0 7.16344 7.16344 0 16 0V0C24.8366 0 32 7.16344 32 16V16C32 24.8366 24.8366 32 16 32V32C7.16344 32 0 24.8366 0 16V16Z"
        />
        <path
          fill="url(#holy-sign)"
          fillRule="evenodd"
          clipRule="evendodd"
          d="M12.51 31.6183C12.944 27.0829 13.6523 23.4078 14.525 20.4314C15.956 21.8239 17.3087 22.6754 18.6021 23.0175C20.032 23.3956 21.3133 23.1299 22.4033 22.4271C23.4603 21.7455 24.3015 20.6789 24.9757 19.4935C26.3229 17.1251 27.1573 14.0044 27.6557 11.5368C27.9072 10.2914 28.0776 9.18934 28.1851 8.39795C28.2389 8.00196 28.2771 7.68298 28.302 7.46181C28.3144 7.3512 28.3235 7.265 28.3296 7.2058C28.3326 7.1762 28.3349 7.15334 28.3364 7.13756L28.3382 7.11922L28.3388 7.11257C28.3389 7.11209 28.3389 7.11172 27.4286 7.027L28.3389 7.11172C28.3802 6.66801 28.0956 6.25916 27.6651 6.14386L27.4286 7.027C27.6651 6.14386 27.6641 6.14359 27.6631 6.14331L27.6607 6.14268L27.6549 6.14116L27.6478 6.13935L27.6391 6.13715C27.6267 6.13407 27.6108 6.1302 27.5913 6.1257C27.5523 6.11672 27.4991 6.10522 27.4327 6.09256C27.3 6.06726 27.114 6.03723 26.8817 6.01331C26.4175 5.9655 25.7656 5.94177 24.9845 6.03046C23.4147 6.20873 21.3413 6.83991 19.2466 8.60591C17.2991 10.2478 15.3735 12.8334 13.8036 16.8648C12.8299 15.6218 11.7798 14.0852 10.6502 12.2095C9.25777 9.89759 8.1593 8.28109 7.30916 7.27426C6.88928 6.777 6.48894 6.37846 6.10691 6.12518C5.76342 5.89745 5.16141 5.61339 4.5399 5.92907C3.97219 6.21742 3.79775 6.8154 3.72996 7.17583C3.65079 7.59679 3.64318 8.10514 3.67372 8.64979C3.73539 9.74998 3.96706 11.2102 4.30153 12.8835C4.97254 16.2405 6.09021 20.6123 7.23116 25.0075C7.35336 25.4782 7.47584 25.9493 7.5981 26.4195L7.59864 26.4215C7.92738 27.6859 8.25454 28.9441 8.57054 30.1742C9.25103 30.5316 9.96041 30.8414 10.6943 31.0993C10.2708 29.4318 9.82037 27.6997 9.36905 25.964L9.36894 25.9636C9.24621 25.4916 9.12341 25.0193 9.00107 24.548C7.8572 20.1417 6.7536 15.8219 6.09463 12.5251C5.76411 10.8715 5.55362 9.51427 5.49942 8.54744C5.4873 8.33125 5.48368 8.14465 5.48678 7.98583C5.60865 8.1081 5.7501 8.26219 5.91203 8.45396C6.66507 9.34579 7.70301 10.8604 9.08373 13.1529C10.5128 15.5257 11.8443 17.4145 13.0885 18.8825C12.0485 22.1113 11.2188 26.125 10.7226 31.1092C11.3039 31.3122 11.9004 31.4826 12.51 31.6183ZM5.00803 7.59902C5.00821 7.59951 5.0134 7.60209 5.02307 7.60533C5.01268 7.60015 5.00785 7.59853 5.00803 7.59902ZM5.55749 7.39233C5.56241 7.38332 5.56439 7.37791 5.56415 7.37745C5.56391 7.37699 5.56145 7.3815 5.55749 7.39233ZM20.4252 10.0039C18.6205 11.5255 16.7042 14.1088 15.1599 18.464C15.2782 18.5915 15.3953 18.7144 15.5111 18.8326C16.939 20.2905 18.121 20.9988 19.0696 21.2497C19.9778 21.4899 20.7326 21.3286 21.4124 20.8903C22.1252 20.4307 22.7875 19.6421 23.3863 18.5895C24.5851 16.4819 25.3745 13.5954 25.8633 11.1747C26.1055 9.976 26.2696 8.91366 26.3732 8.15171C26.3898 8.02991 26.4047 7.91586 26.4183 7.81025C26.091 7.79144 25.6741 7.79248 25.1908 7.84736C23.9346 7.99002 22.2117 8.4978 20.4252 10.0039Z"
        />
        <defs>
          <linearGradient
            id="holy-circle"
            x1={0}
            y1={0}
            x2={32}
            y2={32}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#8f8f8f" />
            <stop stopColor="#6b6b6b" offset={0.4} />
            <stop stopColor="#474747" offset={0.65} />
            <stop stopColor="#242424" offset={1} />
          </linearGradient>
          <linearGradient
            id="holy-sign"
            x1={16.3809}
            y1={20.7238}
            x2={12.5714}
            y2={32.3048}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#ffffff" />
            <stop stopColor="#404040" offset={1} />
          </linearGradient>
        </defs>
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

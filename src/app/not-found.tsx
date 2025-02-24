import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description:
    "The requested URL was not found on this server. Double-check the URL or try searching for what you're looking for.",
};

export default function NotFoundPage() {
  return (
    <div className="px-4">
      <article className="mx-auto grid w-full max-w-3xl py-16">
        <h1 className="text-xl font-medium text-gray-900 dark:text-gray-100">
          We&apos;re sorry, but the page you were looking for could not be
          found.
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          It may have been removed, had its name changed, or is temporarily
          unavailable.
        </p>
        <div className="mt-6 flex flex-wrap select-none">
          <Link
            href="/"
            className="action inline-flex h-9 items-center justify-center rounded-md px-4 text-sm ring"
          >
            Go to Homepage
          </Link>
        </div>
      </article>
    </div>
  );
}

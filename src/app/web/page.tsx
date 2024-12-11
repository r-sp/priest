import { type Metadata } from "next";
import {
  type WebColor,
  red,
  brown,
  orange,
  yellow,
  green,
  cyan,
  blue,
  purple,
  pink,
  white,
  black,
} from "~/lib/web-colors";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Web Colors",
};

export default function WebColorsPage() {
  return (
    <article className="mx-auto grid max-w-7xl gap-8 max-xl:px-3">
      <header>
        <h1 className="text-4xl font-bold text-neutral-800 dark:text-neutral-200">
          Web Colors
        </h1>
      </header>
      <section
        aria-labelledby="color-red"
        className="border-t border-t-neutral-400 pt-8 dark:border-t-neutral-700"
      >
        <h2
          id="color-red"
          className="font-mono text-2xl font-medium text-neutral-700 dark:text-neutral-300"
        >
          Red
        </h2>
        <div className="mt-4 grid gap-x-3 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {red.map((c, i) => (
            <Color key={i} slug={c.slug} hex={c.hex} />
          ))}
        </div>
      </section>
      <section
        aria-labelledby="color-brown"
        className="border-t border-t-neutral-400 pt-8 dark:border-t-neutral-700"
      >
        <h2
          id="color-brown"
          className="font-mono text-2xl font-medium text-neutral-700 dark:text-neutral-300"
        >
          Brown
        </h2>
        <div className="mt-4 grid gap-x-3 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {brown.map((c, i) => (
            <Color key={i} slug={c.slug} hex={c.hex} />
          ))}
        </div>
      </section>
      <section
        aria-labelledby="color-orange"
        className="border-t border-t-neutral-400 pt-8 dark:border-t-neutral-700"
      >
        <h2
          id="color-orange"
          className="font-mono text-2xl font-medium text-neutral-700 dark:text-neutral-300"
        >
          Orange
        </h2>
        <div className="mt-4 grid gap-x-3 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {orange.map((c, i) => (
            <Color key={i} slug={c.slug} hex={c.hex} />
          ))}
        </div>
      </section>
      <section
        aria-labelledby="color-yellow"
        className="border-t border-t-neutral-400 pt-8 dark:border-t-neutral-700"
      >
        <h2
          id="color-yellow"
          className="font-mono text-2xl font-medium text-neutral-700 dark:text-neutral-300"
        >
          Yellow
        </h2>
        <div className="mt-4 grid gap-x-3 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {yellow.map((c, i) => (
            <Color key={i} slug={c.slug} hex={c.hex} />
          ))}
        </div>
      </section>
      <section
        aria-labelledby="color-green"
        className="border-t border-t-neutral-400 pt-8 dark:border-t-neutral-700"
      >
        <h2
          id="color-green"
          className="font-mono text-2xl font-medium text-neutral-700 dark:text-neutral-300"
        >
          Green
        </h2>
        <div className="mt-4 grid gap-x-3 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {green.map((c, i) => (
            <Color key={i} slug={c.slug} hex={c.hex} />
          ))}
        </div>
      </section>
      <section
        aria-labelledby="color-cyan"
        className="border-t border-t-neutral-400 pt-8 dark:border-t-neutral-700"
      >
        <h2
          id="color-cyan"
          className="font-mono text-2xl font-medium text-neutral-700 dark:text-neutral-300"
        >
          Cyan
        </h2>
        <div className="mt-4 grid gap-x-3 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {cyan.map((c, i) => (
            <Color key={i} slug={c.slug} hex={c.hex} />
          ))}
        </div>
      </section>
      <section
        aria-labelledby="color-blue"
        className="border-t border-t-neutral-400 pt-8 dark:border-t-neutral-700"
      >
        <h2
          id="color-blue"
          className="font-mono text-2xl font-medium text-neutral-700 dark:text-neutral-300"
        >
          Blue
        </h2>
        <div className="mt-4 grid gap-x-3 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {blue.map((c, i) => (
            <Color key={i} slug={c.slug} hex={c.hex} />
          ))}
        </div>
      </section>
      <section
        aria-labelledby="color-purple"
        className="border-t border-t-neutral-400 pt-8 dark:border-t-neutral-700"
      >
        <h2
          id="color-purple"
          className="font-mono text-2xl font-medium text-neutral-700 dark:text-neutral-300"
        >
          Purple, Violet, and Magenta
        </h2>
        <div className="mt-4 grid gap-x-3 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {purple.map((c, i) => (
            <Color key={i} slug={c.slug} hex={c.hex} />
          ))}
        </div>
      </section>
      <section
        aria-labelledby="color-pink"
        className="border-t border-t-neutral-400 pt-8 dark:border-t-neutral-700"
      >
        <h2
          id="color-pink"
          className="font-mono text-2xl font-medium text-neutral-700 dark:text-neutral-300"
        >
          Pink
        </h2>
        <div className="mt-4 grid gap-x-3 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {pink.map((c, i) => (
            <Color key={i} slug={c.slug} hex={c.hex} />
          ))}
        </div>
      </section>
      <section
        aria-labelledby="color-white"
        className="border-t border-t-neutral-400 pt-8 dark:border-t-neutral-700"
      >
        <h2
          id="color-white"
          className="font-mono text-2xl font-medium text-neutral-700 dark:text-neutral-300"
        >
          White
        </h2>
        <div className="mt-4 grid gap-x-3 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {white.map((c, i) => (
            <Color key={i} slug={c.slug} hex={c.hex} />
          ))}
        </div>
      </section>
      <section
        aria-labelledby="color-black"
        className="border-t border-t-neutral-400 pt-8 dark:border-t-neutral-700"
      >
        <h2
          id="color-black"
          className="font-mono text-2xl font-medium text-neutral-700 dark:text-neutral-300"
        >
          Gray and Black
        </h2>
        <div className="mt-4 grid gap-x-3 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {black.map((c, i) => (
            <Color key={i} slug={c.slug} hex={c.hex} />
          ))}
        </div>
      </section>
    </article>
  );
}

function Color(props: WebColor) {
  return (
    <Link
      href={`/color/${props.slug.toLowerCase()}`}
      className="grid gap-2 rounded-lg"
    >
      <div role="presentation" className="frame inline-grid rounded-lg">
        <span style={{ backgroundColor: `#${props.hex}` }}></span>
      </div>
      <p className="inline-grid">
        <span className="text-base font-medium text-neutral-700 dark:text-neutral-300">
          {props.slug}
        </span>
        <code className="text-sm">{`#${props.hex}`}</code>
      </p>
    </Link>
  );
}

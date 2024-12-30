import { type Metadata } from "next";
import { sharedMetadata } from "./metadata";
import { Wrapper, Separator } from "~/components/ui";
import Link from "next/link";

export function generateMetadata(): Metadata {
  const meta = sharedMetadata({ path: "/" });

  return {
    ...meta,
    title: "Priest: The Holy Colors",
    description:
      "Explore contemporary color palettes using advanced color spaces for vibrant and harmonious designs.",
  };
}

export default function HomePage() {
  return (
    <Wrapper as="article" className="grid gap-y-4" outerStyle="py-4">
      <h1
        id="intro"
        className="mx-auto max-w-3xl text-center text-3xl font-bold text-neutral-800 dark:text-neutral-200"
      >
        Priest: The Holy Colors
      </h1>
      <p className="mx-auto max-w-2xl text-center text-lg">
        Use HEX, RGB, HSL, HWB, plus advanced LAB, LCH, OKLAB & OKLCH color
        spaces for precise color control and conversions.
      </p>
      <Link
        aria-label="Try Color Playground"
        href="/color"
        className="mt-4 inline-grid w-full overflow-hidden rounded-lg"
      >
        <span className="h-6 bg-red-400"></span>
        <span className="h-6 bg-orange-400"></span>
        <span className="h-6 bg-amber-400"></span>
        <span className="h-6 bg-yellow-400"></span>
        <span className="h-6 bg-lime-400"></span>
        <span className="h-6 bg-green-400"></span>
        <span className="h-6 bg-emerald-400"></span>
        <span className="h-6 bg-teal-400"></span>
        <span className="h-6 bg-cyan-400"></span>
        <span className="h-6 bg-sky-400"></span>
        <span className="h-6 bg-blue-400"></span>
        <span className="h-6 bg-indigo-400"></span>
        <span className="h-6 bg-violet-400"></span>
        <span className="h-6 bg-purple-400"></span>
        <span className="h-6 bg-fuchsia-400"></span>
        <span className="h-6 bg-pink-400"></span>
        <span className="h-6 bg-rose-400"></span>
      </Link>
      <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <li className="inline-grid">
          <Link
            href="/color-harmony"
            className="btn grid content-baseline gap-y-1 rounded-lg border border-neutral-400 px-3 py-4 dark:border-neutral-700"
          >
            <h2 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
              Color Harmony
            </h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-500">
              Refers to the arrangement of colors that are pleasing to the eye,
              creating a harmonious color combination that is balanced and
              aesthetically appealing.
            </p>
          </Link>
        </li>
        <li className="inline-grid">
          <Link
            href="/color-palettes"
            className="btn grid content-baseline gap-y-1 rounded-lg border border-neutral-400 px-3 py-4 dark:border-neutral-700"
          >
            <h2 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
              Color Palettes
            </h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-500">
              Carefully chosen sets of colors used to evoke specific emotions,
              establish brand identity, or create a particular aesthetic in
              visual designs.
            </p>
          </Link>
        </li>
        <li className="inline-grid">
          <Link
            href="/color-shades"
            className="btn grid content-baseline gap-y-1 rounded-lg border border-neutral-400 px-3 py-4 dark:border-neutral-700"
          >
            <h2 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
              Color Shades
            </h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-500">
              Encompass the spectrum of that color&apos;s lightness and
              darkness, creating a gradient from its purest form to its darkest
              possible version.
            </p>
          </Link>
        </li>
      </ul>
      <Separator className="my-6" />
      <section
        aria-label="web colors"
        className="grid w-full max-w-3xl gap-y-3"
      >
        <p>
          <Link href="/web-colors" className="font-semibold">
            Web colors
          </Link>{" "}
          are the colors used to style web pages. They are defined using digital
          representations that browsers can interpret and display. The most
          common formats include:
        </p>
        <ul className="inline-grid gap-y-2 pl-4">
          <li className="list-disc">
            <strong className="font-semibold">HEX (Hexadecimal)</strong>: A
            six-digit code representing RGB values.
          </li>
          <li className="list-disc">
            <strong className="font-semibold">RGB (Red, Green, Blue)</strong>:
            Uses numerical values for red, green, and blue.
          </li>
          <li className="list-disc">
            <strong className="font-semibold">
              HSL (Hue, Saturation, Lightness)
            </strong>
            : Defines colors based on hue, saturation, and lightness.
          </li>
          <li className="list-disc">
            <strong className="font-semibold">LAB (CIELAB)</strong>: A
            perceptually uniform color space designed to approximate human
            vision.
          </li>
          <li className="list-disc">
            <strong className="font-semibold">LCH (CIELCh)</strong>: A
            cylindrical representation of LAB, using lightness, chroma, and hue.
          </li>
          <li className="list-disc">
            <strong className="font-semibold">OKLAB</strong>: A perceptually
            uniform color space optimized for image processing and color
            manipulation.
          </li>
          <li className="list-disc">
            <strong className="font-semibold">OKLCH</strong>: A cylindrical
            representation of OKLAB, similar to LCH&apos;s relationship with
            LAB.
          </li>
        </ul>
        <p>
          While HEX, RGB, and HSL are widely supported by browsers, LAB, LCH,
          OKLAB, and OKLCH are increasingly used for tasks requiring greater
          color accuracy and consistency, especially when dealing with color
          gradients and complex color manipulations.
        </p>
      </section>
    </Wrapper>
  );
}

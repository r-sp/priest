import { type Metadata } from "next";
import { sharedMetadata } from "./metadata";
import { Wrapper } from "~/components";
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
    <Wrapper as="article" className="flex flex-col gap-y-8" outerStyle="py-4">
      <header className="mx-auto grid w-full max-w-3xl gap-y-3">
        <h1
          id="intro"
          className="text-center text-3xl font-bold text-gray-800 dark:text-gray-200"
        >
          Priest: The Holy Colors
        </h1>
        <p className="mx-auto max-w-2xl text-center">
          Use HEX, RGB, HSL, HWB, plus advanced LAB, LCH, OKLAB & OKLCH color
          spaces for precise color control and conversions.
        </p>
      </header>
      <section aria-label="color tools" className="grid gap-y-4">
        <Link
          aria-label="Try Color Playground"
          href="/playground"
          className="grid w-full overflow-hidden rounded-lg"
          prefetch={false}
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
      </section>
      <section
        aria-label="web colors"
        className="grid w-full max-w-3xl gap-y-3"
      >
        <p>
          <Link href="/web-colors" className="font-semibold">
            Web colors
          </Link>{" "}
          are the{" "}
          <Link href="/color" prefetch={false}>
            colors
          </Link>{" "}
          used to style web pages. They are defined using digital
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

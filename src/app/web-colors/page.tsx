import { type Metadata } from "next";
import { type WebColor, namedColors } from "~/lib/web-colors";
import { sharedMetadata } from "../metadata";
import { slugify } from "~/lib/utils";
import { convertRgb, formatPathMode } from "~/lib/color";
import { Wrapper } from "~/components/ui";
import Link from "next/link";

export function generateMetadata(): Metadata {
  const meta = sharedMetadata({ path: "web-colors" });

  return {
    ...meta,
    title: "Web Colors",
    description:
      "Red, Brown, Orange, Yellow, Green, Cyan, Blue, Purple, Violet, Magenta, Pink, White, Gray and Black",
  };
}

export default function WebColorsPage() {
  // prettier-ignore
  const { red, brown, orange, yellow, green, cyan, blue, purple, pink, white, black } = namedColors;

  return (
    <Wrapper as="article" className="grid gap-y-8" outerStyle="py-4">
      <header className="inline-grid w-full">
        <h1 className="text-3xl font-semibold text-neutral-800 dark:text-neutral-200">
          Web Colors
        </h1>
        <ul className="pl-4">
          <li className="list-disc">
            <a href="#red">Red</a>
          </li>
          <li className="list-disc">
            <a href="#brown">Brown</a>
          </li>
          <li className="list-disc">
            <a href="#orange">Orange</a>
          </li>
          <li className="list-disc">
            <a href="#yellow">Yellow</a>
          </li>
          <li className="list-disc">
            <a href="#green">Green</a>
          </li>
          <li className="list-disc">
            <a href="#cyan">Cyan</a>
          </li>
          <li className="list-disc">
            <a href="#blue">Blue</a>
          </li>
          <li className="list-disc">
            <a href="#purple-violet-and-magenta">Purple, Violet, and Magenta</a>
          </li>
          <li className="list-disc">
            <a href="#pink">Pink</a>
          </li>
          <li className="list-disc">
            <a href="#white">White</a>
          </li>
          <li className="list-disc">
            <a href="#gray-and-black">Gray and Black</a>
          </li>
        </ul>
      </header>
      <Section color={red} label="Red" />
      <Section color={brown} label="Brown" />
      <Section color={orange} label="Orange" />
      <Section color={yellow} label="Yellow" />
      <Section color={green} label="Green" />
      <Section color={cyan} label="Cyan" />
      <Section color={blue} label="Blue" />
      <Section color={purple} label="Purple, Violet and Magenta" />
      <Section color={pink} label="Pink" />
      <Section color={white} label="White" />
      <Section color={black} label="Gray and Black" />
    </Wrapper>
  );
}

function Section(props: { color: WebColor[]; label: string }) {
  const section = slugify(props.label);

  return (
    <section aria-labelledby={section} className="inline-grid gap-y-4">
      <div
        role="none"
        className="border-t border-t-neutral-400 pt-4 dark:border-t-neutral-700"
      >
        <h2
          id={section}
          className="font-mono text-2xl font-medium text-neutral-700 dark:text-neutral-300"
        >
          {props.label}
        </h2>
      </div>
      <ul className="grid w-full gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {props.color.map((c, i) => (
          <li key={i} className="inline-grid">
            <Link
              href={formatPathMode(convertRgb(c.hex))}
              className="grid w-full gap-2 rounded-lg"
            >
              <div
                role="presentation"
                className="frame inline-grid w-full rounded-lg"
              >
                <span style={{ backgroundColor: `#${c.hex}` }}></span>
              </div>
              <p className="inline-grid">
                <span className="text-base font-medium text-neutral-700 dark:text-neutral-300">
                  {c.slug}
                </span>
                <code className="text-sm">{`#${c.hex}`}</code>
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

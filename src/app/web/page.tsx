import { type Metadata } from "next";
import { type WebColor, namedColors } from "~/lib/web-colors";
import { slugify } from "~/lib/utils";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Web Colors",
};

export default function WebColorsPage() {
  // prettier-ignore
  const { red, brown, orange, yellow, green, cyan, blue, purple, pink, white, black } = namedColors;

  return (
    <article className="mx-auto grid max-w-7xl gap-8 max-xl:px-3">
      <header>
        <h1 className="text-4xl font-bold text-neutral-800 dark:text-neutral-200">
          Web Colors
        </h1>
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
    </article>
  );
}

function Section(props: { color: WebColor[]; label: string }) {
  const section = slugify(props.label);

  return (
    <section
      aria-labelledby={section}
      className="border-t border-t-neutral-400 pt-8 dark:border-t-neutral-700"
    >
      <h2
        id={section}
        className="font-mono text-2xl font-medium text-neutral-700 dark:text-neutral-300"
      >
        {props.label}
      </h2>
      <div className="mt-4 grid gap-x-3 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {props.color.map((c, i) => (
          <Link
            key={i}
            href={`/color/${c.slug.toLowerCase()}`}
            className="grid gap-2 rounded-lg"
          >
            <div role="presentation" className="frame inline-grid rounded-lg">
              <span style={{ backgroundColor: `#${c.hex}` }}></span>
            </div>
            <p className="inline-grid">
              <span className="text-base font-medium text-neutral-700 dark:text-neutral-300">
                {c.slug}
              </span>
              <code className="text-sm">{`#${c.hex}`}</code>
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

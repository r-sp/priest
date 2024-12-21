import { type Metadata } from "next";
import { type WebColor, namedColors } from "~/lib/web-colors";
import { slugify } from "~/lib/utils";
import { formatPathMode } from "~/lib/format";
import { convertRgb } from "~/lib/convert";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Web Colors",
  description:
    "Red, Brown, Orange, Yellow, Green, Cyan, Blue, Purple, Violet, Magenta, Pink, White, Gray and Black",
  alternates: {
    canonical: "https://priest.vercel.app/color/web",
  },
};

export default function WebColorsPage() {
  // prettier-ignore
  const { red, brown, orange, yellow, green, cyan, blue, purple, pink, white, black } = namedColors;

  return (
    <article className="grid gap-y-8">
      <header className="inline-grid w-full px-3">
        <h1 className="mx-auto w-full max-w-7xl text-4xl font-bold text-neutral-800 dark:text-neutral-200">
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
    <section aria-labelledby={section} className="inline-grid gap-y-4 xl:mx-3">
      <div
        role="none"
        className="mx-auto w-full max-w-7xl border-t border-t-neutral-400 pt-4 max-xl:px-3 dark:border-t-neutral-700"
      >
        <h2
          id={section}
          className="font-mono text-2xl font-medium text-neutral-700 dark:text-neutral-300"
        >
          {props.label}
        </h2>
      </div>
      <ul className="mx-auto flex w-full max-w-7xl snap-x snap-mandatory flex-nowrap gap-x-3 overflow-x-auto scroll-smooth px-3 py-2 xl:px-0">
        {props.color.map((c, i) => (
          <li key={i} className="inline-flex snap-center snap-always">
            <Link
              href={formatPathMode(convertRgb(c.hex))}
              className="grid w-full gap-2 rounded-lg"
            >
              <div
                role="presentation"
                className="frame inline-grid w-full min-w-85 rounded-lg"
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

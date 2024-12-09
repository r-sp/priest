import Link from "next/link";

export default function DemoPage() {
  return (
    <article className="grid gap-8 px-4 py-8">
      <header className="mx-auto w-full max-w-3xl">
        <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
          Priest
        </h1>
        <p className="text-base font-normal text-neutral-600 dark:text-neutral-400">
          The Holy Colors
        </p>
      </header>
      <ul className="mx-auto grid w-full max-w-3xl gap-2">
        <li>
          <Link href="/color">Color</Link>
        </li>
        <li>
          <Link href="/playground">Playground</Link>
        </li>
        <li>
          <Link href="/display">Display</Link>
        </li>
      </ul>
    </article>
  );
}

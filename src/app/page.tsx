import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Priest: The Holy Colors",
};

export default function HomePage() {
  return (
    <article className="relative flex min-h-svh items-end justify-center px-4 py-10">
      <header className="text-center">
        <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
          Priest
        </h1>
        <p className="text-base font-normal text-neutral-600 dark:text-neutral-400">
          The Holy Colors
        </p>
      </header>
      <div
        role="presentation"
        className="pointer-events-none absolute top-0 right-0 left-0 grid min-h-svh pb-32"
        tabIndex={-1}
      >
        <div className="bg-red-400"></div>
        <div className="bg-orange-400"></div>
        <div className="bg-amber-400"></div>
        <div className="bg-yellow-400"></div>
        <div className="bg-lime-400"></div>
        <div className="bg-green-400"></div>
        <div className="bg-emerald-400"></div>
        <div className="bg-teal-400"></div>
        <div className="bg-cyan-400"></div>
        <div className="bg-sky-400"></div>
        <div className="bg-blue-400"></div>
        <div className="bg-indigo-400"></div>
        <div className="bg-violet-400"></div>
        <div className="bg-purple-400"></div>
        <div className="bg-fuchsia-400"></div>
        <div className="bg-pink-400"></div>
        <div className="bg-rose-400"></div>
      </div>
    </article>
  );
}

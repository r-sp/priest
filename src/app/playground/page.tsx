import type { Metadata } from "next";
import { Interactive } from "./interactive";

export const metadata: Metadata = {
  title: "Playground",
  alternates: {
    canonical: "/playground",
  },
};

export default function Page() {
  return (
    <div className="px-4 py-8">
      <article className="max-w-8xl mx-auto grid w-full gap-y-6">
        <h1 className="sr-only">Playground</h1>
        <div className="mx-auto inline-grid w-full max-w-xl">
          <Interactive />
        </div>
      </article>
    </div>
  );
}

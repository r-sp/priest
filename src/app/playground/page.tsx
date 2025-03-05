import type { Metadata } from "next";
import { ColorPicker } from "./color-picker";

export const metadata: Metadata = {
  title: "Playground",
  alternates: {
    canonical: "/playground",
  },
};

export default function Page() {
  return (
    <div className="px-4 py-8">
      <article className="mx-auto grid w-full max-w-5xl gap-y-6">
        <h1 className="sr-only">Playground</h1>
        <ColorPicker />
        <div className="grid aspect-square"></div>
        <div className="grid aspect-square"></div>
        <div className="grid aspect-square"></div>
      </article>
    </div>
  );
}

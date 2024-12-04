import { type Metadata } from "next";

import InputRgb from "~/components/color/input-rgb";
import InputHsl from "~/components/color/input-hsl";
import InputLab from "~/components/color/input-lab";
import InputOklab from "~/components/color/input-oklab";
import InputLch from "~/components/color/input-lch";
import InputOklch from "~/components/color/input-oklch";

export const metadata: Metadata = {
  title: "Playground",
};

export default function PlaygroundPage() {
  return (
    <article className="grid gap-8 px-4 py-8">
      <header className="mx-auto w-full max-w-3xl">
        <h1 className="text-2xl font-semibold text-neutral-900">Color Space</h1>
      </header>
      <InputRgb />
      <InputHsl />
      <InputLab />
      <InputOklab />
      <InputLch />
      <InputOklch />
    </article>
  );
}

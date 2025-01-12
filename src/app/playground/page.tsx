import type { Metadata } from "next";
import { sharedMetadata } from "../metadata";
import { Wrapper } from "~/components";
import { Textbox, Slider, Shades } from "~/features";

export function generateMetadata(): Metadata {
  const meta = sharedMetadata({ path: "/playground" });

  return {
    ...meta,
    title: "Playground",
    description:
      "dynamic environment for designers and developers to experiment with color.",
  };
}

export default function PlaygroundPage() {
  return (
    <Wrapper className="grid gap-y-8" outerStyle="py-2">
      <div className="mx-auto inline-grid w-full max-w-3xl gap-y-6">
        <Textbox />
        <Slider dynamicPreview={false} />
      </div>
      <Shades />
    </Wrapper>
  );
}

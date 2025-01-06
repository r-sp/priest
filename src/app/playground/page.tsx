import type { Metadata } from "next";
import { sharedMetadata } from "../metadata";
import { Wrapper } from "~/components";
import ColorInput from "~/features/input";
import Shades from "./shades";

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
    <Wrapper className="grid gap-y-8" outerStyle="py-4">
      <div className="grid">
        <ColorInput dynamicPreview={false} />
      </div>
      <Shades />
    </Wrapper>
  );
}

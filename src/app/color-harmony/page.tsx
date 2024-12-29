import { type Metadata } from "next";
import { sharedMetadata } from "../metadata";
import { ColorPicker, ColorHarmony } from "~/components/color";
import { Wrapper } from "~/components/ui";

export function generateMetadata(): Metadata {
  const meta = sharedMetadata({ path: "color-harmony" });

  return {
    ...meta,
    title: "Color Harmony",
    description:
      "Achieve perfect color harmony with palettes designed using the latest color space technologies.",
  };
}

export default function ColorHarmonyPage() {
  return (
    <Wrapper
      as="section"
      aria-labelledby="color"
      className="grid gap-y-8"
      outerStyle="py-4"
    >
      <ColorPicker />
      <ColorHarmony />
    </Wrapper>
  );
}

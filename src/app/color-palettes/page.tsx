import { type Metadata } from "next";
import { sharedMetadata } from "~/lib/meta";
import ColorPicker from "~/components/color/picker";
import ColorHue from "~/components/color/hue";
import Wrapper from "~/components/ui/wrapper";

export function generateMetadata(): Metadata {
  const meta = sharedMetadata({ path: "color-palettes" });

  return {
    ...meta,
    title: "Color Palettes",
    description:
      "Achieve perfect color harmony with palettes designed using the latest color space technologies.",
  };
}

export default function ColorPalettesPage() {
  return (
    <Wrapper
      as="section"
      aria-labelledby="color"
      className="grid gap-y-8"
      outerStyle="py-4"
    >
      <ColorPicker />
      <ColorHue />
    </Wrapper>
  );
}

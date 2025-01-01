import { type Metadata } from "next";
import { sharedMetadata } from "../metadata";
import { ColorPicker, ColorHue } from "~/components/color";
import { Wrapper } from "~/components/ui";

export function generateMetadata(): Metadata {
  const meta = sharedMetadata({ path: "color-palettes" });

  return {
    ...meta,
    title: "Color Palettes",
    description:
      "Generate stunning color combinations with expanded color gamuts and precise color representation.",
  };
}

export default function ColorPalettesPage() {
  return (
    <Wrapper as="div" className="grid gap-y-8">
      <ColorPicker />
      <ColorHue />
    </Wrapper>
  );
}

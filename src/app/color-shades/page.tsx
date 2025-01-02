import { type Metadata } from "next";
import { sharedMetadata } from "../metadata";
import { ColorPicker, ColorShade } from "~/components/color";
import { Wrapper } from "~/components/ui";

export function generateMetadata(): Metadata {
  const meta = sharedMetadata({ path: "color-shades" });

  return {
    ...meta,
    title: "Color Shades",
    description:
      "Find palettes built with perceptually uniform color spaces for smooth transitions and accurate color perception.",
  };
}

export default function ColorShadesPage() {
  return (
    <Wrapper as="div" className="grid gap-y-8">
      <ColorPicker dynamicPreview={false} />
      <ColorShade />
    </Wrapper>
  );
}

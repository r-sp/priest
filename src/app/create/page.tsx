import { type Metadata } from "next";
import { sharedMetadata } from "~/lib/meta";
import ColorPicker from "~/components/color/picker";
import ColorShade from "~/components/color/shade";
import Wrapper from "~/components/ui/wrapper";

export function generateMetadata(): Metadata {
  const meta = sharedMetadata({ path: "create" });

  return {
    ...meta,
    title: "Create Color",
    description:
      "Find palettes built with perceptually uniform color spaces for smooth transitions and accurate color perception.",
  };
}

export default function CreatePage() {
  return (
    <Wrapper
      as="section"
      aria-labelledby="color"
      className="grid gap-y-8"
      outerStyle="py-4"
    >
      <ColorPicker />
      <ColorShade />
    </Wrapper>
  );
}

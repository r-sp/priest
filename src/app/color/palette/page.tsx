import { type Metadata } from "next";
import { createColor, initColor } from "~/lib/color";
import ColorPicker from "~/components/color/picker";
import ColorHue from "~/components/color/hue";
import Wrapper from "~/components/ui/wrapper";

export function generateMetadata(): Metadata {
  const color = createColor(initColor());
  const link = "https://priest.vercel.app/color";

  return {
    title: "Color Palette",
    openGraph: {
      images: [
        {
          url: `${link}/${color.hex.replace("#", "")}/img`,
          alt: `Color: ${color.hex}`,
        },
      ],
    },
    alternates: {
      canonical: `${link}/palette`,
    },
  };
}

export default function ColorPalettePage() {
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

import { type Metadata } from "next";
import { createColor, randomColor } from "~/lib/color";
import Color from "~/components/ui/color";

export function generateMetadata(): Metadata {
  const color = createColor(randomColor());
  const link = "https://priest.vercel.app/color";

  return {
    title: "Color",
    openGraph: {
      images: [
        {
          url: `${link}/${color.hex.replace("#", "")}/img`,
          alt: `Color: ${color.hex}`,
        },
      ],
    },
    alternates: {
      canonical: link,
    },
  };
}

export default function ColorPage() {
  return <Color />;
}

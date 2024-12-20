import { type Metadata } from "next";
import { Suspense } from "react";
import { createColor, getTodayColor } from "~/lib/color";
import Color from "~/components/ui/color";

export function generateMetadata(): Metadata {
  const color = createColor(getTodayColor());
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
  return (
    <Suspense>
      <Color />
    </Suspense>
  );
}

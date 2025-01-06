import { type Metadata } from "next";
import { createColor, initColor, convertRgb, formatHex } from "~/lib/color";

export function sharedMetadata(options: {
  path: string;
  color?: string;
}): Metadata {
  const { rgb, oklch } = createColor(initColor());
  const link = options.path ? `/${options.path}` : "/";
  const color = options.color ? options.color : oklch.css;
  const title = options.color ? { title: `Color: ${color}` } : {};
  const img = options.color
    ? formatHex(convertRgb(options.color))
    : formatHex(rgb.color);
  const imgPath = img.replace("#", "");
  const pageType = options.path === "/" ? "website" : "article";

  return {
    ...title,
    metadataBase: new URL("https://priest.vercel.app"),
    openGraph: {
      images: [
        {
          url: `/color/${imgPath}`,
          alt: `Color: ${img}`,
        },
      ],
      url: link,
      siteName: "Priest: The Holy Colors",
      type: pageType,
    },
    alternates: {
      canonical: link,
    },
    keywords: "color space, hex, rgb, hsl, hwb, lab, lch, oklab, oklch",
    robots: "index, follow",
  };
}

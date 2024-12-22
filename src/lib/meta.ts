import { type Metadata } from "next";
import { createColor, initColor } from "./color";
import { convertRgb } from "./convert";
import { formatHex } from "./format";

export const sharedMetadata = (options: {
  path: string;
  color?: string;
}): Metadata => {
  const { hex, oklch } = createColor(initColor());
  const link = options.path ? `/${options.path}` : "/";
  const color = options.color ? options.color : oklch.css;
  const title = options.color ? { title: `Color: ${color}` } : {};
  const img = options.color ? formatHex(convertRgb(options.color)) : hex;
  const imgPath = img.replace("#", "");

  return {
    ...title,
    metadataBase: new URL("https://priest.vercel.app"),
    openGraph: {
      images: [
        {
          url: `/${imgPath}`,
          alt: `Color: ${img}`,
        },
      ],
      url: link,
    },
    alternates: {
      canonical: link,
    },
    keywords: "color space, hex, rgb, hsl, hwb, lab, lch, oklab, oklch",
    robots: "index, follow",
  };
};

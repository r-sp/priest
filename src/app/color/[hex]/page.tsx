import { type Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { isValidColor, isValidHex } from "~/lib/color";
import ColorDetail from "~/components/color/detail";

export async function generateMetadata({
  params,
}: {
  params: { hex: string };
}): Promise<Metadata> {
  const color = (await params).hex;
  const name = isValidHex(color);

  const link = `https://priest.vercel.app/color/${color}`;

  return {
    title: `Color: ${name}`,
    openGraph: {
      images: [
        {
          url: `${link}/img`,
          alt: `Color: ${name}`,
        },
      ],
    },
    alternates: {
      canonical: link,
    },
  };
}

export default async function ColorHexPage({
  params,
}: {
  params: { hex: string };
}) {
  const hex = (await params).hex;
  const valid = isValidColor(`#${hex}`);

  if (valid) {
    return <ColorDetail />;
  } else {
    return permanentRedirect("/color");
  }
}

import { type Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { ColorDetail } from "~/components/color";
import { isValidColor, isValidHex } from "~/lib/color";

export async function generateMetadata({
  params,
}: {
  params: { hex: string };
}): Promise<Metadata> {
  const color = (await params).hex;
  const name = isValidHex(color);

  return {
    title: `Color: ${name}`,
    openGraph: {
      images: [
        {
          url: `https://priest.vercel.app/api/og/color=${color}`,
          alt: `Color: ${name}`,
        },
      ],
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

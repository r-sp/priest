import { type Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { ColorDetail } from "~/components/color";
import { isValidColor } from "~/lib/utils";

export async function generateMetadata({ params }: { params: { hex: string } }): Promise<Metadata> {
  const hex = (await params).hex;

  const pageTitle = `Color: #${hex}`;

  return {
    title: pageTitle,
    description: "The Holy Colors",
  };
}

export default async function ColorHexPage({ params }: { params: { hex: string } }) {
  const hex = (await params).hex;
  const valid = isValidColor(`#${hex}`);

  if (valid) {
    return <ColorDetail hex={hex} />;
  } else {
    return permanentRedirect("/color");
  }
}

import { type Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { ColorDetail } from "~/components/color";
import { isValidColor, parseColorName } from "~/lib/color";

export async function generateMetadata({
  params,
}: {
  params: { hex: string };
}): Promise<Metadata> {
  const hex = (await params).hex;
  const name = parseColorName(hex);

  return {
    title: `Color: ${name}`,
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
    return <ColorDetail hex={hex} />;
  } else {
    return permanentRedirect("/color");
  }
}

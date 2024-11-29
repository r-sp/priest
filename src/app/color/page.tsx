import { type Metadata } from "next";
import { ColorDetail } from "~/components/color";

export const metadata: Metadata = {
  title: "Color",
  description: "The Holy Colors",
};

export const dynamic = "force-dynamic";

export default function ColorPage() {
  return <ColorDetail />;
}

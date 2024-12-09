import { type Metadata } from "next";
import { ColorDetail } from "~/components/color";

export const metadata: Metadata = {
  title: "Color",
};

export default function ColorPage() {
  return <ColorDetail />;
}

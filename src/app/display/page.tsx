import { type Metadata } from "next";
import ColorHarmony from "~/components/ui/color-harmony";

export const metadata: Metadata = {
  title: "Color Display",
};

export default function DisplayPage() {
  return <ColorHarmony />;
}

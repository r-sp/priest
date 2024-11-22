import { type Metadata } from "next";
import ColorPicker from "~/components/ui/color-picker";

export const metadata: Metadata = {
  title: "Priest",
  description: "The Holy Colors",
};

export default function HomePage() {
  return <ColorPicker />;
}

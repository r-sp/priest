import { type Metadata } from "next";
import ColorBlind from "~/components/ui/color-blind";

export const metadata: Metadata = {
  title: "Blind Test",
  description: "The Holy Colors",
};

export default function BlindPage() {
  return <ColorBlind />;
}

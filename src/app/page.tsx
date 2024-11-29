import { type Metadata } from "next";
import { ColorFeed } from "~/components/color";

export const metadata: Metadata = {
  title: "Priest",
  description: "The Holy Colors",
};

export const dynamic = "force-dynamic";

export default function HomePage() {
  return <ColorFeed />;
}

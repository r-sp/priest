import { type Metadata } from "next";
import { getRandomColor } from "~/lib/color";
import Color from "~/components/color";

export const metadata: Metadata = {
  title: "Priest",
  description: "The Holy Colors",
};

export const dynamic = "force-dynamic";

export default function HomePage() {
  const random = getRandomColor().toHsl();

  return <Color raw={random} />;
}

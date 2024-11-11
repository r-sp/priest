import { type Metadata } from "next";
import { random } from "colord";
import Color from "~/components/color";

export const metadata: Metadata = {
  title: "Priest",
  description: "The Holy Colors",
};

export default function HomePage() {
  const color = random().toHsv();
  return <Color hsv={color} />;
}

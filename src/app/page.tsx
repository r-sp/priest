import { type Metadata } from "next";
import Color from "~/components/color";

export const metadata: Metadata = {
  title: "Priest",
  description: "The Holy Colors",
};

export default function HomePage() {
  return <Color />;
}

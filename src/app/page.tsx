import { type Metadata } from "next";
import Intro from "~/components/ui/intro";

export const metadata: Metadata = {
  title: "Priest: The Holy Colors",
};

export default function HomePage() {
  return <Intro />;
}

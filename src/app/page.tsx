import { type Metadata } from "next";
import DemoPage from "~/components/ui/demo";

export const metadata: Metadata = {
  title: "Priest: The Holy Colors",
};

export default function HomePage() {
  return <DemoPage />;
}

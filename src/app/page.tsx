import { type Metadata } from "next";
import Counter from "~/components/counter";

export const metadata: Metadata = {
  title: "Priest",
  description: "The Holy Counter",
};

export default function HomePage() {
  return (
    <main>
      <Counter />
    </main>
  );
}

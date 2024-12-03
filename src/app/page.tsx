import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Priest",
  description: "The Holy Colors",
};

export default function HomePage() {
  return (
    <article className="flex h-svh flex-col items-center justify-center">
      <h1>Priest</h1>
      <p>The Holy Colors</p>
    </article>
  );
}

import { type Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Priest: The Holy Colors",
};

export default function HomePage() {
  return (
    <article className="px-3">
      <ul className="mx-auto my-4 max-w-7xl">
        <li>
          <Link href="/color" className="text-lg hover:underline">
            Color
          </Link>
        </li>
        <li>
          <Link href="/color/web" className="text-lg hover:underline">
            Web
          </Link>
        </li>
      </ul>
    </article>
  );
}

import { type Metadata } from "next";
import { sharedMetadata } from "~/lib/meta";
import Link from "next/link";

export function generateMetadata(): Metadata {
  const meta = sharedMetadata({ path: "/" });

  return {
    ...meta,
    title: "Priest: The Holy Colors",
    description:
      "Explore contemporary color palettes using advanced color spaces for vibrant and harmonious designs.",
  };
}

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
        <li>
          <Link href="/color/palette" className="text-lg hover:underline">
            Palette
          </Link>
        </li>
        <li>
          <Link href="/create" className="text-lg hover:underline">
            Create
          </Link>
        </li>
      </ul>
    </article>
  );
}

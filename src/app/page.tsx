import { type Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Priest: The Holy Colors",
};

export default function HomePage() {
  return (
    <article className="mx-auto my-4 max-w-7xl max-xl:mx-3">
      <ul>
        <li>
          <Link href="/color" className="text-lg hover:underline">
            Color
          </Link>
        </li>
        <li>
          <Link href="/color/picker" className="text-lg hover:underline">
            Picker
          </Link>
        </li>
        <li>
          <Link href="/display" className="text-lg hover:underline">
            Display
          </Link>
        </li>
        <li>
          <Link href="/web" className="text-lg hover:underline">
            Web
          </Link>
        </li>
      </ul>
    </article>
  );
}

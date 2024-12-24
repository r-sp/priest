import { type Metadata } from "next";
import { sharedMetadata } from "~/lib/meta";
import Wrapper from "~/components/ui/wrapper";
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
    <Wrapper outerStyle="py-4">
      <ul>
        <li>
          <Link href="/color" className="text-lg hover:underline">
            Color
          </Link>
          <ul className="ml-4 pl-4">
            <li className="list-disc">
              <Link href="/color-palettes" className="text-lg hover:underline">
                Palettes
              </Link>
            </li>
            <li className="list-disc">
              <Link href="/color-shades" className="text-lg hover:underline">
                Shades
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link href="/web-colors" className="text-lg hover:underline">
            Web Colors
          </Link>
        </li>
      </ul>
    </Wrapper>
  );
}

import Link from "next/link";

export default function HomePageToolbar() {
  return (
    <Link href="/harmony" prefetch={false}>
      Harmony
    </Link>
  );
}

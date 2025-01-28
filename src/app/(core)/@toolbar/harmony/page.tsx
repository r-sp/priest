import Link from "next/link";

export default function HarmonyPageToolbar() {
  return (
    <Link href="/" prefetch={false}>
      Homepage
    </Link>
  );
}

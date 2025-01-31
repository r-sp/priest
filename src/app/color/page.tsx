import type { Metadata } from "next";
import type { SessionQuery } from "~/types/session";
import { createMetadata } from "~/utils";
import { ColorQuery } from "~/components/ui";

export async function generateMetadata({
  searchParams,
}: SessionQuery): Promise<Metadata> {
  const query = await searchParams;
  const metadata = createMetadata(query);
  return metadata;
}

export default async function ColorPage({ searchParams }: SessionQuery) {
  return <ColorQuery searchParams={searchParams} portal={false} />;
}

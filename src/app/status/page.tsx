import type { Metadata } from "next";
import { Suspense } from "react";

type Props = {
  searchParams: Promise<{ error: string }>;
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const status = await searchParams;
  const name = status ? "Status: Error" : "Status";
  const path = "/status";

  return {
    title: name,
    description: status.error,
    openGraph: { title: name, url: path },
    alternates: { canonical: path },
  };
}

export default async function StatusPage({ searchParams }: Props) {
  const status = await searchParams;
  const name = status ? status.error.replaceAll("-", " ") : "Status";

  return (
    <Suspense fallback={<Skeleton />}>
      <div className="px-4">
        <article className="max-w-8xl mx-auto">
          <h1 className="text-xl">{name}</h1>
        </article>
      </div>
    </Suspense>
  );
}

function Skeleton() {
  return (
    <div className="px-4">
      <div className="max-w-8xl skeleton mx-auto h-7"></div>
    </div>
  );
}

import type { Metadata } from "next";
import type { ColorQuery } from "~/lib/types";
import { getColorQuery, getColorPath, switchCss, checkGamut } from "~/lib";
import { permanentRedirect } from "next/navigation";
import { Suspense } from "react";
import Preview from "./preview";

type Props = {
  searchParams: Promise<ColorQuery>;
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const query = await searchParams;
  const name = query.mode
    ? `Color: ${switchCss(getColorQuery(query)!)}`
    : "Color";
  const path = query.mode ? getColorPath("/color", query) : "/color";

  return {
    title: name,
    openGraph: { title: name, url: path },
    alternates: { canonical: path },
  };
}

export default async function ColorPage({ searchParams }: Props) {
  const query = await searchParams;
  if (!query.mode) permanentRedirect("/status?error=unknown-color-query");

  const color = getColorQuery(query);
  if (!color) permanentRedirect("/status?error=unknown-color-mode");

  const offset = checkGamut(color);
  if (offset) permanentRedirect(`/status?error=${offset}`);

  return (
    <Suspense fallback={<Skeleton />}>
      <Preview color={color} />
    </Suspense>
  );
}

function Skeleton() {
  return (
    <div className="px-4">
      <div className="mx-auto grid max-w-3xl gap-y-8">
        <div className="flex">
          <div className="skeleton aspect-cinema inline-flex w-full rounded-md"></div>
        </div>
        <div className="grid gap-y-2">
          <div className="skeleton h-6"></div>
          <div className="skeleton h-6"></div>
          <div className="skeleton h-6"></div>
          <div className="skeleton h-6"></div>
          <div className="skeleton h-6"></div>
          <div className="skeleton h-6"></div>
          <div className="skeleton h-6"></div>
        </div>
      </div>
    </div>
  );
}

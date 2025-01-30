import type { Metadata } from "next";
import type { ColorQuery } from "~/types/color";
import { permanentRedirect } from "next/navigation";
import { getColorQuery, getColorPath, createMetadata } from "~/utils/query";
import { checkGamut } from "~/utils/gamut";
import { Suspense } from "react";
import { SkeletonColor } from "~/components/common";
import { ColorPreview, ColorResolve } from "~/components/ui";

interface Props {
  searchParams: Promise<ColorQuery & { error?: string }>;
}

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const query = await searchParams;
  const metadata = createMetadata(query);
  return metadata;
}

export default async function ColorPage({ searchParams }: Props) {
  const query = await searchParams;
  if (!query.mode && !query.error) {
    permanentRedirect("/color?error=unknown-color-query");
  }

  const color = getColorQuery(query);
  if (!color && !query.error) {
    permanentRedirect("/color?error=unknown-color-mode");
  }

  if (color && !query.error) {
    const offset = checkGamut(color);
    if (offset) {
      permanentRedirect(`${getColorPath("/color", query)}&error=${offset}`);
    }
  }

  return (
    <Suspense fallback={<SkeletonColor />}>
      {color ? (
        <ColorPreview color={color} error={query.error} />
      ) : (
        <ColorResolve error={query.error!} />
      )}
    </Suspense>
  );
}

import { type Metadata } from "next";
import { sharedMetadata } from "~/lib/meta";
import {
  type ColorQuery,
  parseColorQuery,
  parseColorPath,
} from "~/components/color/query";
import { formatCssMode } from "~/lib/format";
import { Suspense } from "react";
import Wrapper from "~/components/ui/wrapper";
import Color from "~/components/ui/color";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<ColorQuery>;
}): Promise<Metadata> {
  const query = await searchParams;

  const meta = sharedMetadata({
    path: query.mode ? parseColorPath(query) : "color",
    color: query.mode
      ? formatCssMode(query.mode, parseColorQuery(query))
      : undefined,
  });

  return {
    title: "Color",
    description:
      "Generate stunning color combinations with expanded color gamuts and precise color representation.",
    ...meta,
  };
}

export default async function ColorPage() {
  return (
    <Suspense fallback={<Skeleton />}>
      <Color />
    </Suspense>
  );
}

function Skeleton() {
  return (
    <Wrapper
      as="div"
      maxWidth="1024"
      className="grid gap-y-6"
      outerStyle="py-4"
    >
      <div className="inline-grid gap-y-3">
        <div className="frame rounded-lg">
          <span className="bg-neutral-200 dark:bg-neutral-900"></span>
        </div>
        <span className="h-8 w-64 bg-neutral-200 dark:bg-neutral-900"></span>
      </div>
      <div className="inline-grid gap-y-2">
        <span className="h-4 w-48 bg-neutral-200 dark:bg-neutral-900"></span>
        <span className="h-4 w-56 bg-neutral-200 dark:bg-neutral-900"></span>
        <span className="h-4 w-56 bg-neutral-200 dark:bg-neutral-900"></span>
        <span className="h-4 w-56 bg-neutral-200 dark:bg-neutral-900"></span>
      </div>
      <div className="inline-grid gap-y-2">
        <span className="h-4 w-48 bg-neutral-200 dark:bg-neutral-900"></span>
        <span className="h-4 w-56 bg-neutral-200 dark:bg-neutral-900"></span>
        <span className="h-4 w-56 bg-neutral-200 dark:bg-neutral-900"></span>
        <span className="h-4 w-56 bg-neutral-200 dark:bg-neutral-900"></span>
      </div>
    </Wrapper>
  );
}

import { type Metadata } from "next";
import { sharedMetadata } from "../metadata";
import { type ColorQuery } from "~/lib/types";
import {
  extractColorQuery,
  extractColorPath,
  switchCssMode,
} from "~/lib/color";
import { Suspense } from "react";
import { Wrapper } from "~/components";
import ColorDetail from "./detail";

type Props = {
  searchParams: Promise<ColorQuery>;
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const query = await searchParams;

  const meta = sharedMetadata({
    path: query.mode ? extractColorPath(query) : "color",
    color: query.mode
      ? switchCssMode(query.mode, extractColorQuery(query))
      : undefined,
  });

  return {
    title: "Color",
    description:
      "Find inspiring color schemes built with modern color models for today's creative projects.",
    ...meta,
  };
}

export default async function ColorPage() {
  return (
    <Suspense fallback={<Skeleton />}>
      <ColorDetail />
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

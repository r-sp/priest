import { type Metadata } from "next";
import { createColor, initColor } from "~/lib/color";
import { Suspense } from "react";
import Wrapper from "~/components/ui/wrapper";
import Color from "~/components/ui/color";

export function generateMetadata(): Metadata {
  const color = createColor(initColor());
  const link = "https://priest.vercel.app/color";

  return {
    title: "Color",
    openGraph: {
      images: [
        {
          url: `${link}/${color.hex.replace("#", "")}/img`,
          alt: `Color: ${color.hex}`,
        },
      ],
    },
    alternates: {
      canonical: link,
    },
  };
}

export default function ColorPage() {
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

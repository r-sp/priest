import type { Metadata } from "next";
import type { ColorQuery } from "~/lib/color";
import { getColorQuery, getColorPath } from "~/lib/query";
import { parseCss } from "~/lib/color";
import { checkGamut } from "~/lib/gamut";
import { permanentRedirect } from "next/navigation";
import { Suspense } from "react";
import Preview from "./preview";
import Resolve from "./resolve";

type Props = {
  searchParams: Promise<ColorQuery & { error?: string }>;
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const query = await searchParams;
  const includes =
    query.error?.includes("under") || query.error?.includes("above");

  const createMetadata = (valid: string, invalid: string) => {
    return query.error ? (includes ? valid : invalid) : valid;
  };

  const repaint: ColorQuery =
    query.error || query.mode ? query : { mode: "rgb", r: 0, g: 0, b: 0 };

  const color = query.error
    ? includes
      ? parseCss(getColorQuery(repaint)!)
      : "Error"
    : parseCss(getColorQuery(repaint)!);

  const name = createMetadata(`Color: ${color}`, "Error");
  const text = createMetadata(
    `Explore color conversions from ${color} to various color models: RGB, HSL, HWB, LAB, LCH, OKLAB, OKLCH.`,
    "Something",
  );

  const colorParams = getColorPath("/color", query);
  const path = query.error
    ? includes
      ? `${colorParams}&error=${query.error}`
      : `/color?error=${query.error}`
    : colorParams;

  return {
    title: name,
    description: text,
    openGraph: { title: name, url: path },
    alternates: { canonical: path },
  };
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
    <Suspense fallback={<Skeleton />}>
      {color ? (
        <Preview color={color} error={query.error} />
      ) : (
        <Resolve error={query.error!} />
      )}
    </Suspense>
  );
}

function Skeleton() {
  return (
    <div className="px-4">
      <div className="mx-auto grid max-w-3xl gap-y-8">
        <div className="flex gap-y-4">
          <div className="skeleton aspect-cinema inline-flex w-full rounded-md"></div>
          <div className="skeleton h-7"></div>
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

import type { NextRequest } from "next/server";
import { permanentRedirect } from "next/navigation";
import { ImageResponse } from "next/og";

export const runtime = "edge";

export const contentType = "image/png";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const color = (await params).slug;

  if (!/^(?:[0-9A-Fa-f]{3}){1,2}$/.test(color)) {
    permanentRedirect("/color?error=unknown-color-swatch");
  }

  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: `#${color}`,
          width: "100%",
          height: "100%",
        }}
      />
    ),
    {
      width: 1680,
      height: 720,
    },
  );
}

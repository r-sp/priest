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

  if (!/^([a-f0-9]{6}-){10}[a-f0-9]{6}$/.test(color)) {
    permanentRedirect("/color?error=unknown-color-scales");
  }

  const shades = color.split("-").map((c) => "#" + c);

  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: "#000000",
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
        }}
      >
        {shades.map((shade, index) => (
          <div
            key={index}
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <div
              style={{
                backgroundColor: shade,
                borderRadius: "8px",
                display: "flex",
                width: "96px",
                height: "96px",
              }}
            ></div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "4px" }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: "16px",
                  lineHeight: "1",
                  color: "#f2f2f2",
                }}
              >
                {shade}
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: "14px",
                  lineHeight: "1",
                  color: "#969696",
                }}
              >
                {index === 0 ? 50 : index === 10 ? 950 : index * 100}
              </div>
            </div>
          </div>
        ))}
      </div>
    ),
    {
      width: 1248,
      height: 184,
    },
  );
}

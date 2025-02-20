import type { NextRequest } from "next/server";
import type { CSSProperties } from "react";
import { permanentRedirect } from "next/navigation";
import { ImageResponse } from "next/og";
import { decodeScale } from "~/utils";

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

  const shades = decodeScale(color);

  const img: CSSProperties = {
    backgroundColor: "#1e1e1e",
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    gap: "16px",
    padding: "16px",
  };

  const card: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  };

  const detail: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  };

  const title: CSSProperties = {
    display: "flex",
    fontSize: "16px",
    lineHeight: "1",
    color: "#f2f2f2",
  };

  const text: CSSProperties = {
    display: "flex",
    fontSize: "14px",
    lineHeight: "1",
    color: "#969696",
  };

  return new ImageResponse(
    (
      <div style={img}>
        {shades.map((shade, index) => (
          <div key={index} style={card}>
            <div
              style={{
                backgroundColor: shade,
                borderRadius: "8px",
                display: "flex",
                width: "96px",
                height: "96px",
              }}
            ></div>
            <div style={detail}>
              <div style={title}>{shade}</div>
              <div style={text}>
                {index === 0 ? 50 : index === 10 ? 950 : index * 100}
              </div>
            </div>
          </div>
        ))}
      </div>
    ),
    {
      width: 1248,
      height: 182,
    },
  );
}

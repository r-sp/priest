import type { NextRequest } from "next/server";
import type { CSSProperties } from "react";
import { permanentRedirect } from "next/navigation";
import { ImageResponse } from "next/og";
import {
  round,
  parseColor,
  decodeColor,
  createHue,
  convertHue,
  createHex,
} from "~/utils";

export const runtime = "edge";

export const contentType = "image/png";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const color = (await params).slug;

  if (
    !/^(rgb|hsl|hwb|lch|oklch|lab|oklab)-((?:n)?[0-9]+(?:u[0-9]+)?-)*(?:n)?[0-9]+(?:u[0-9]+)?$/.test(
      color,
    )
  ) {
    permanentRedirect("/color?error=unknown-color-harmony");
  }

  const currentColor = parseColor(decodeColor(color));
  const currentHue = createHue(currentColor);

  const mode = currentColor.mode;

  const hue = (deg: number): string => {
    const angle = currentHue.h! + deg;
    const limiter = ((angle % 360) + 360) % 360;
    const decimal = mode === "lch" || mode === "oklch" ? 3 : 2;
    const current = convertHue(
      { ...currentHue, h: round(limiter, decimal) },
      mode,
    );
    return createHex(current);
  };

  const hue30s = hue(-30);
  const hue0 = createHex(currentColor);
  const hue30 = hue(30);
  const hue60 = hue(60);
  const hue90 = hue(90);
  const hue120 = hue(120);
  const hue150 = hue(150);
  const hue180 = hue(180);
  const hue210 = hue(210);
  const hue240 = hue(240);
  const hue270 = hue(270);

  const img: CSSProperties = {
    backgroundColor: "#1e1e1e",
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "32px",
    padding: "16px",
  };

  const palettes: CSSProperties = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
  };

  const harmonies: CSSProperties = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: "32px",
  };

  return new ImageResponse(
    (
      <div style={img}>
        <div style={palettes}>
          <Palette color={hue30s} hue={-30} />
          <Palette color={hue0} hue={0} />
          <Palette color={hue30} hue={30} />
          <Palette color={hue60} hue={60} />
          <Palette color={hue90} hue={90} />
          <Palette color={hue120} hue={120} />
          <Palette color={hue150} hue={150} />
          <Palette color={hue180} hue={180} />
          <Palette color={hue210} hue={210} />
          <Palette color={hue240} hue={240} />
          <Palette color={hue270} hue={270} />
        </div>
        <div style={harmonies}>
          <Harmony
            color={[hue0, hue180]}
            label="Complementary"
            hue="[0, 180]"
          />
          <Harmony
            color={[hue30s, hue0, hue30]}
            label="Analogous"
            hue="[-30, 0, 30]"
          />
          <Harmony
            color={[hue0, hue120, hue240]}
            label="Triadic"
            hue="[0, 120, 240]"
          />
          <Harmony
            color={[hue0, hue150, hue210]}
            label="Adjacent"
            hue="[0, 150, 210]"
          />
          <Harmony
            color={[hue0, hue90, hue180, hue270]}
            label="Tetradic"
            hue="[0, 90, 180, 270]"
          />
          <Harmony
            color={[hue0, hue60, hue180, hue240]}
            label="Rectangle"
            hue="[0, 60, 180, 240]"
          />
        </div>
      </div>
    ),
    {
      width: 1248,
      height: 300,
    },
  );
}

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

interface ColorCard {
  color: string;
  hue: number;
}

function Palette({ color, hue }: ColorCard) {
  const preview: CSSProperties = {
    backgroundColor: color,
    borderRadius: "8px",
    display: "flex",
    width: "96px",
    height: "96px",
  };

  return (
    <div style={card}>
      <div style={preview} />
      <div style={detail}>
        <div style={title}>{color}</div>
        <div style={text}>{hue}</div>
      </div>
    </div>
  );
}

interface ColorMatch {
  color: string[];
  label: string;
  hue: string;
}

function Harmony({ color, label, hue }: ColorMatch) {
  const preview: CSSProperties = {
    display: "flex",
    flexDirection: "row",
    gap: "8px",
  };

  return (
    <div style={{ ...card, minWidth: "152px" }}>
      <div style={preview}>
        {color.map((shade, index) => (
          <div
            key={index}
            style={{
              backgroundColor: shade,
              borderRadius: "4px",
              display: "flex",
              width: "32px",
              height: "32px",
            }}
          ></div>
        ))}
      </div>
      <div style={detail}>
        <div style={title}>{label}</div>
        <div style={text}>{hue}</div>
      </div>
    </div>
  );
}

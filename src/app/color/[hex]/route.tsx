import { type NextRequest } from "next/server";
import { ImageResponse } from "next/og";
import { isValidHex } from "~/utils/prefix";
import { createColor, convertRgb, parseHex, formatHex } from "~/lib/color";
import { limiter, multiply } from "~/utils/number";

export const runtime = "edge";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: { hex: string };
  },
) {
  const color = (await params).hex;
  const { rgb, oklch } = createColor(convertRgb(isValidHex(color)));

  const base = oklch.color.h || 0;

  const hueShift = (angle: number[]) =>
    angle.map((deg) => {
      const colorOklch = { ...oklch.color, h: deg };
      return {
        hex: parseHex({ mode: "oklch", ...colorOklch }),
      };
    });

  const harmony = hueShift(
    multiply(15, 0, 360).map((deg) => limiter(base + deg, 0, 360)),
  );

  const hex = formatHex(rgb.color);

  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: hex,
          color: "#000000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            height: 720,
            width: 720,
          }}
        >
          {harmony.map((color, index) => (
            <div
              key={index}
              style={{
                backgroundColor: color.hex,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "20%",
                height: "20%",
              }}
            ></div>
          ))}
        </div>
      </div>
    ),
    {
      width: 1280,
      height: 720,
    },
  );
}

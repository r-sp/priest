import { type CSSProperties } from "react";
import { ImageResponse } from "next/og";
import { createColor, isValidHex } from "~/lib/color";
import { colorsNamed, nearest, differenceCiede2000 } from "culori";

export const runtime = "edge";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const obj = Object.fromEntries(url.searchParams.entries());
  const color = createColor(isValidHex(obj.color));

  const colorHex = color.hex;
  const colorRgb = color.rgb.css;
  const colorHsl = color.hsl.css;
  const colorHwb = color.hwb.css;
  const colorLab = color.lab.css;
  const colorLch = color.lch.css;
  const colorOklab = color.oklab.css;
  const colorOklch = color.oklch.css;

  const colors = Object.keys(colorsNamed);
  const nearestNamedColors = nearest(colors, differenceCiede2000());
  const relatedColors = nearestNamedColors(colorHex, 3);

  const body: CSSProperties = {
    alignItems: "center",
    backgroundColor: colorHex,
    color: "#000000",
    display: "flex",
    gap: 0,
    height: "100%",
    justifyContent: "flex-start",
    width: "100%",
  };
  const details: CSSProperties = {
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
    gap: 16,
    height: "100%",
    padding: 16,
    width: "32%",
  };
  const title: CSSProperties = {
    fontFamily: "monospace",
    fontSize: 40,
    margin: 0,
  };
  const card: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  };
  const code: CSSProperties = {
    fontFamily: "monospace",
    fontSize: 24,
    margin: 0,
  };

  return new ImageResponse(
    (
      <main style={body}>
        <div style={details}>
          <svg width={48} height={48} viewBox="0 0 32 32" fill="none">
            <path
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.7385 31.6673C13.7915 31.8854 14.8824 32 16 32C24.8366 32 32 24.8366 32 16C32 7.16345 24.8366 0 16 0C7.16345 0 0 7.16345 0 16C0 22.2318 3.56268 27.6314 8.76239 30.2733C8.48612 29.1756 8.20153 28.0562 7.91566 26.9318L7.91552 26.9312C7.79967 26.4756 7.68362 26.0191 7.56782 25.5629C6.48834 21.3102 5.43045 17.0785 4.79525 13.8285C4.47868 12.2087 4.25894 10.7931 4.20041 9.72512C4.17144 9.19671 4.17841 8.70047 4.25434 8.28761C4.31821 7.94034 4.48597 7.3337 5.05557 7.03783C5.68806 6.70928 6.29578 7.00889 6.62521 7.23226C6.99543 7.48328 7.37925 7.87508 7.77763 8.3576C8.58532 9.33586 9.62665 10.9035 10.9444 13.1411C11.9791 14.8981 12.9425 16.3463 13.8374 17.5262C15.3166 13.6909 17.1241 11.2175 18.9561 9.63794C20.9505 7.9184 22.928 7.30138 24.4293 7.12703C25.1756 7.04035 25.7991 7.06349 26.2438 7.11032C26.4663 7.13376 26.6449 7.16322 26.7728 7.18816C26.8367 7.20063 26.8881 7.21199 26.9261 7.22093C26.945 7.22541 26.9607 7.22928 26.9729 7.23239C26.979 7.23394 26.9842 7.23531 26.9885 7.23645L26.9944 7.23803L26.9969 7.23869C26.9979 7.23899 26.999 7.23926 26.752 8.15224C27.6884 8.23852 27.6883 8.2389 27.6883 8.23938L27.6877 8.24588L27.686 8.26373C27.6845 8.27907 27.6824 8.30126 27.6795 8.32999C27.6773 8.35233 27.6746 8.37862 27.6715 8.40871C27.6666 8.45599 27.6605 8.51268 27.6533 8.57817C27.6298 8.79252 27.5936 9.10155 27.5426 9.48511C27.4407 10.2517 27.2794 11.3191 27.0412 12.5254C26.5695 14.9141 25.7788 17.9405 24.4997 20.2402C23.8598 21.3907 23.0578 22.4333 22.0437 23.102C20.9946 23.7938 19.7567 24.0569 18.3776 23.6839C17.1643 23.3557 15.9048 22.553 14.5817 21.2573C13.7908 24.0488 13.1451 27.4719 12.7385 31.6673ZM26.752 8.15224L26.999 7.23926C27.4393 7.35989 27.73 7.78123 27.6884 8.23852L26.752 8.15224Z"
            />
            <path
              fill="currentColor"
              d="M10.9061 31.0886C11.378 26.4442 12.1457 22.6811 13.1026 19.6354C11.9278 18.2146 10.6724 16.3912 9.32655 14.1059C8.02043 11.8881 7.04034 10.4259 6.33113 9.56695C6.23472 9.45018 6.14632 9.34829 6.0657 9.25975C6.06693 9.36877 6.07093 9.48899 6.07816 9.6209C6.12925 10.553 6.32788 11.8637 6.64052 13.4633C7.2637 16.6518 8.30754 20.8305 9.38993 25.0946C9.50024 25.5291 9.61094 25.9646 9.72159 26.3998L9.73867 26.467C10.1351 28.0261 10.5308 29.5824 10.9061 31.0886Z"
            />
            <path
              fill="currentColor"
              d="M20.1797 11.075C18.4863 12.5351 16.6827 15.0174 15.2258 19.2072C15.3299 19.3215 15.433 19.4319 15.535 19.5384C16.8821 20.9451 17.9889 21.6191 18.8658 21.8563C19.699 22.0817 20.3875 21.9315 21.013 21.5191C21.6735 21.0836 22.2941 20.3311 22.8587 19.3159C23.9886 17.2844 24.7343 14.4979 25.1967 12.1565C25.4255 10.9978 25.5807 9.97084 25.6786 9.23428C25.6911 9.14047 25.7026 9.05141 25.7132 8.96744C25.4208 8.95409 25.059 8.95888 24.6449 9.00697C23.4722 9.14316 21.8577 9.62825 20.1797 11.075Z"
            />
          </svg>
          <h1 style={title}>
            <code>{colorHex}</code>
          </h1>
          <div style={card}>
            <p style={code}>
              <code>{colorRgb}</code>
            </p>
            <p style={code}>
              <code>{colorHsl}</code>
            </p>
            <p style={code}>
              <code>{colorHwb}</code>
            </p>
          </div>
          <div style={card}>
            <p style={code}>
              <code>{colorLch}</code>
            </p>
            <p style={code}>
              <code>{colorOklch}</code>
            </p>
            <p style={code}>
              <code>{colorLab}</code>
            </p>
            <p style={code}>
              <code>{colorOklab}</code>
            </p>
          </div>
          <div style={card}>
            {relatedColors.map((related, index) => (
              <p key={index} style={{ ...code, color: "#737373" }}>
                <code>{`#${related}`}</code>
              </p>
            ))}
          </div>
        </div>
      </main>
    ),
    {
      width: 1280,
      height: 720,
    },
  );
}

"use client";

import { useChroma } from "./provider";

export default function Chroma() {
  const { hex, hsl, random } = useChroma((state) => state);

  return (
    <div className="chroma">
      <div className="chroma-card">
        <div className="chroma-color" style={{ backgroundColor: hex }} suppressHydrationWarning></div>
        <code className="chroma-hex" suppressHydrationWarning>
          {hex}
        </code>
        <code className="chroma-hsl" suppressHydrationWarning>
          {hsl}
        </code>
      </div>
      <button className="chroma-btn" onClick={random}>
        Random Color
      </button>
    </div>
  );
}

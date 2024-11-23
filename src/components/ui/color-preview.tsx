"use client";

import { useColorProvider } from "../provider";

export default function ColorPreview() {
  const { css } = useColorProvider();

  return (
    <div className="mt-4">
      <span className="block rounded-2xl" style={{ backgroundColor: css.rgb, height: "60svh" }}></span>
    </div>
  );
}

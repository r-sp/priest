"use client";

import { useQueryState, parseAsString } from "nuqs";
import { useColorProvider } from "../provider";
import { convertColor } from "~/lib/utils";

export default function ColorDetails() {
  const [reqHex] = useQueryState("hex", parseAsString.withDefault("undefined"));
  const { css } = useColorProvider();

  const color = reqHex === "undefined" ? css.hex : `#${reqHex}`;
  const previewColor = reqHex === "undefined" ? css.rgb : convertColor(`#${reqHex}`).toRgbString();

  return (
    <div className="grid gap-4">
      <div className="rounded-md" style={{ backgroundColor: previewColor, height: "60svh" }}></div>
      <code className="font-mono text-2xl text-holy-200">{color}</code>
    </div>
  );
}

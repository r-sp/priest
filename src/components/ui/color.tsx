"use client";

import { useColorQuery } from "../color/query";
import ColorPreview from "../color/preview";
import ColorView from "../color/view";

export default function Color() {
  const color = useColorQuery();

  return color ? <ColorPreview /> : <ColorView />;
}

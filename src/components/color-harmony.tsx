"use client";

import { colord, extend } from "colord";
import ColorTab from "./color-tab";

import harmoniesPlugin from "colord/plugins/harmonies";
extend([harmoniesPlugin]);

export default function ColorHarmony(props: { hsv: { h: number; s: number; v: number; a: number } }) {
  const color = colord(props.hsv);
  const colorHEX = color.toHex();
  const analogous = color.harmonies("analogous").map((c) => c.toHex());
  const complementary = color.harmonies("complementary").map((c) => c.toHex());
  const doubleSplitComplementary = color.harmonies("double-split-complementary").map((c) => c.toHex());
  const rectangle = color.harmonies("rectangle").map((c) => c.toHex());
  const splitComplementary = color.harmonies("split-complementary").map((c) => c.toHex());
  const tetradic = color.harmonies("tetradic").map((c) => c.toHex());
  const triadic = color.harmonies("triadic").map((c) => c.toHex());

  const colors = {
    analogous: analogous,
    complementary: complementary,
    doubleSplitComplementary: doubleSplitComplementary,
    rectangle: rectangle,
    splitComplementary: splitComplementary,
    tetradic: tetradic,
    triadic: triadic,
  };

  return (
    <div className="color-harmonies">
      <ColorTab harmony={colors} hex={colorHEX} />
    </div>
  );
}

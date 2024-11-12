"use client";

import { useState } from "react";
import clsx from "clsx";

type ColorHarmony =
  | "analogous"
  | "complementary"
  | "double-split-complementary"
  | "rectangle"
  | "split-complementary"
  | "tetradic"
  | "triadic";

type Colors = {
  analogous: string[];
  complementary: string[];
  doubleSplitComplementary: string[];
  rectangle: string[];
  splitComplementary: string[];
  tetradic: string[];
  triadic: string[];
};

export default function ColorHarmony(props: { harmony: Colors }) {
  const [content, setContent] = useState<ColorHarmony>("double-split-complementary");

  const ColorCard = (props: { color: string[] }) => {
    return (
      <div className="color-harmony">
        {props.color.map((color, index) => (
          <div className="color-card" key={index}>
            <div className="color-display" style={{ backgroundColor: color }}></div>
            <code className="color-name" role="none">
              {color}
            </code>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="color-harmonies">
      <nav className="color-tab" aria-label="color harmony">
        <button
          className={clsx("color-tab-option btn", content === "complementary" && "active")}
          onClick={() => setContent("complementary")}
        >
          <span>Complementary</span>
        </button>
        <button
          className={clsx("color-tab-option btn", content === "analogous" && "active")}
          onClick={() => setContent("analogous")}
        >
          <span>Analogous</span>
        </button>
        <button
          className={clsx("color-tab-option btn", content === "triadic" && "active")}
          onClick={() => setContent("triadic")}
        >
          <span>Triadic</span>
        </button>
        <button
          className={clsx("color-tab-option btn", content === "split-complementary" && "active")}
          onClick={() => setContent("split-complementary")}
        >
          <span>Split Complementary</span>
        </button>
        <button
          className={clsx("color-tab-option btn", content === "tetradic" && "active")}
          onClick={() => setContent("tetradic")}
        >
          <span>Tetradic</span>
        </button>
        <button
          className={clsx("color-tab-option btn", content === "rectangle" && "active")}
          onClick={() => setContent("rectangle")}
        >
          <span>Rectangle</span>
        </button>
        <button
          className={clsx("color-tab-option btn", content === "double-split-complementary" && "active")}
          onClick={() => setContent("double-split-complementary")}
        >
          <span>Double Split Complementary</span>
        </button>
      </nav>
      <section className="color-tab-content" aria-label={clsx("color harmony of ", content.replaceAll("-", " "))}>
        {content === "complementary" && <ColorCard color={props.harmony.complementary} />}
        {content === "analogous" && <ColorCard color={props.harmony.analogous} />}
        {content === "triadic" && <ColorCard color={props.harmony.triadic} />}
        {content === "split-complementary" && <ColorCard color={props.harmony.splitComplementary} />}
        {content === "tetradic" && <ColorCard color={props.harmony.tetradic} />}
        {content === "rectangle" && <ColorCard color={props.harmony.rectangle} />}
        {content === "double-split-complementary" && <ColorCard color={props.harmony.doubleSplitComplementary} />}
      </section>
    </div>
  );
}

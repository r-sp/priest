"use client";

import { useState, useMemo, Dispatch, SetStateAction } from "react";
import { colord, extend } from "colord";
import clsx from "clsx";

import harmoniesPlugin from "colord/plugins/harmonies";
extend([harmoniesPlugin]);

type Color =
  | "analogous"
  | "complementary"
  | "double-split-complementary"
  | "rectangle"
  | "split-complementary"
  | "tetradic"
  | "triadic";

export default function ColorHarmony(props: { hex: string }) {
  const [content, setContent] = useState<Color>("double-split-complementary");

  const color = colord(props.hex);
  const harmony = useMemo(() => {
    return {
      analogous: color.harmonies("analogous").map((c) => c.toHex()),
      complementary: color.harmonies("complementary").map((c) => c.toHex()),
      doubleSplitComplementary: color.harmonies("double-split-complementary").map((c) => c.toHex()),
      rectangle: color.harmonies("rectangle").map((c) => c.toHex()),
      splitComplementary: color.harmonies("split-complementary").map((c) => c.toHex()),
      tetradic: color.harmonies("tetradic").map((c) => c.toHex()),
      triadic: color.harmonies("triadic").map((c) => c.toHex()),
    };
  }, [color]);

  return (
    <div className="color-harmonies" role="none">
      <nav className="color-tab" aria-label="color harmony">
        <TabButton current={content} state="complementary" action={setContent} name="Complementary" />
        <TabButton current={content} state="analogous" action={setContent} name="Analogous" />
        <TabButton current={content} state="triadic" action={setContent} name="Triadic" />
        <TabButton current={content} state="split-complementary" action={setContent} name="Split Complementary" />
        <TabButton current={content} state="tetradic" action={setContent} name="Tetradic" />
        <TabButton current={content} state="rectangle" action={setContent} name="Rectangle" />
        <TabButton current={content} state="double-split-complementary" action={setContent} name="Double Split Complementary" />
      </nav>
      <section className="color-tab-content" aria-label={clsx("color harmony of ", content.replaceAll("-", " "))}>
        <TabContent current={content} state="complementary" color={harmony.complementary} />
        <TabContent current={content} state="analogous" color={harmony.analogous} />
        <TabContent current={content} state="triadic" color={harmony.triadic} />
        <TabContent current={content} state="split-complementary" color={harmony.splitComplementary} />
        <TabContent current={content} state="tetradic" color={harmony.tetradic} />
        <TabContent current={content} state="rectangle" color={harmony.rectangle} />
        <TabContent current={content} state="double-split-complementary" color={harmony.doubleSplitComplementary} />
      </section>
    </div>
  );
}

function TabButton(props: { current: Color; state: Color; action: Dispatch<SetStateAction<Color>>; name: string }) {
  return (
    <button
      className={clsx("color-tab-option btn", props.current === props.state && "active")}
      onClick={() => props.action(props.state)}
    >
      <span>{props.name}</span>
    </button>
  );
}

function TabContent(props: { current: Color; state: Color; color: string[] }) {
  if (props.current === props.state) {
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
  }
}

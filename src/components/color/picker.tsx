"use client";

import type { Dispatch, SetStateAction } from "react";
import type { AnyColor, HsvaColor } from "~/lib/types";

import Hue from "@uiw/react-color-hue";
import Saturation from "@uiw/react-color-saturation";
import ShadeSlider from "@uiw/react-color-shade-slider";

export default function Picker(props: { raw: HsvaColor; action: Dispatch<SetStateAction<AnyColor>> }) {
  const updateColor = (color: HsvaColor | { h: number } | { v: number }) => {
    props.action({ ...props.raw, ...color });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="pick-saturation" role="toolbar" aria-label="color saturation">
        <Saturation hsva={props.raw} hue={props.raw.h} style={{ height: "100%", width: "100%" }} onChange={updateColor} />
      </div>
      <div className="pick-hue" role="toolbar" aria-label="color hue" aria-orientation="horizontal">
        <Hue hue={props.raw.h} onChange={updateColor} />
      </div>
      <div className="pick-lightness" role="toolbar" aria-label="color lightness" aria-orientation="horizontal">
        <ShadeSlider hsva={props.raw} onChange={updateColor} />
      </div>
    </div>
  );
}

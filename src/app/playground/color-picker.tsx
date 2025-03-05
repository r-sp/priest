"use client";

import type { ColorStates, ColorActions } from "./store";
import { useReducer, memo } from "react";
import { colorRecuder } from "./store";
import { ColorSaturation } from "./interactive-saturation";

function Interactive() {
  const [state, dispatch] = useReducer<ColorStates, [ColorActions]>(
    colorRecuder,
    {
      color: { h: 210, s: 100, l: 50 },
      point: { x: 0, y: 0, z: 0 },
    },
  );

  const handleSaturation = (
    saturation: number,
    lightness: number,
    pointX: number,
    pointY: number,
  ) => {
    dispatch({
      type: "saturation",
      s: saturation,
      l: lightness,
      x: pointX,
      y: pointY,
    });
  };

  // const handleHue = (hue: number, pointZ: number) => {
  //   dispatch({
  //     type: "hue",
  //     h: hue,
  //     z: pointZ,
  //   });
  // };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <ColorSaturation store={state} onChange={handleSaturation} />
      {/* <ColorHue color={[210, 50, 50]} /> */}
      <div className="flex flex-col font-mono text-gray-600 dark:text-gray-400">
        <div className="flex flex-col">
          <h2 className="font-semibold text-gray-800 dark:text-gray-200">
            color
          </h2>
          <p>{`H: ${state.color.h}%`}</p>
          <p>{`S: ${state.color.s}%`}</p>
          <p>{`L: ${state.color.l}%`}</p>
        </div>
        <div className="flex flex-col">
          <h2 className="font-semibold text-gray-800 dark:text-gray-200">
            axis
          </h2>
          <p>{`X: ${state.point.x}%`}</p>
          <p>{`Y: ${state.point.y}%`}</p>
          <p>{`Z: ${state.point.z}`}</p>
        </div>
      </div>
    </div>
  );
}

const ColorPicker = memo(Interactive);

export { ColorPicker };

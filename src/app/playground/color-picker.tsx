"use client";

import type { InteractiveState, InteractiveAction } from "./interactive-color";
import { useReducer, memo } from "react";
import { interactiveReducer } from "./interactive-color";
import { ColorSaturation } from "./interactive-saturation";
import { ColorHue } from "./interactive-hue";

function Interactive() {
  const [color, action] = useReducer<InteractiveState, [InteractiveAction]>(
    interactiveReducer,
    {
      color: { h: 216, s: 50, v: 50 },
      box: { left: 0, top: 0, width: 0, height: 0 },
      btn: { left: 0, top: 0, width: 32, height: 32 },
      track: { left: 0, top: 0, width: 0, height: 24 },
      thumb: { left: 0, top: 0, width: 24, height: 24 },
    },
  );

  return (
    <div className="inline-grid gap-y-6">
      <ColorSaturation state={color} dispatch={action} />
      <ColorHue state={color} dispatch={action} />
    </div>
  );
}

const ColorPicker = memo(Interactive);

export { ColorPicker };

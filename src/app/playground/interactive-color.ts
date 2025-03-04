import type { ActionDispatch } from "react";

interface HSV {
  h: number;
  s: number;
  v: number;
}

interface Offset {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface InteractiveState {
  color: HSV;
  box: Offset;
  btn: Offset;
  track: Offset;
  thumb: Offset;
}

type InteractiveColor = {
  type: Extract<keyof InteractiveState, "color">;
} & HSV;

type InteractiveOffset = {
  type: Exclude<keyof InteractiveState, "color">;
} & Offset;

type InteractiveSaturation = {
  type: "saturation";
} & HSV &
  Offset;

type InteractiveHue = {
  type: "hue";
} & HSV &
  Offset;

type InteractiveAction =
  | InteractiveColor
  | InteractiveOffset
  | InteractiveSaturation
  | InteractiveHue;

interface InteractiveProps {
  state: InteractiveState;
  dispatch: ActionDispatch<[InteractiveAction]>;
}

export type { InteractiveState, InteractiveAction, InteractiveProps };

const interactiveReducer = (
  state: InteractiveState,
  action: InteractiveAction,
): InteractiveState => {
  switch (action.type) {
    case "color": {
      return {
        ...state,
        color: { h: action.h, s: action.s, v: action.v },
      };
    }
    case "box": {
      return {
        ...state,
        box: {
          left: action.left,
          top: action.top,
          width: action.width,
          height: action.height,
        },
      };
    }
    case "btn": {
      return {
        ...state,
        btn: {
          left: action.left,
          top: action.top,
          width: action.width,
          height: action.height,
        },
      };
    }
    case "track": {
      return {
        ...state,
        track: {
          left: action.left,
          top: action.top,
          width: action.width,
          height: action.height,
        },
      };
    }
    case "thumb": {
      return {
        ...state,
        thumb: {
          left: action.left,
          top: action.top,
          width: action.width,
          height: action.height,
        },
      };
    }
    case "saturation": {
      return {
        ...state,
        color: { h: action.h, s: action.s, v: action.v },
        btn: {
          left: action.left,
          top: action.top,
          width: action.width,
          height: action.height,
        },
      };
    }
    case "hue": {
      return {
        ...state,
        color: { h: action.h, s: action.s, v: action.v },
        thumb: {
          left: action.left,
          top: action.top,
          width: action.width,
          height: action.height,
        },
      };
    }
    default: {
      return state;
    }
  }
};

export { interactiveReducer };

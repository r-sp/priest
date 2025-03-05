interface ColorStates {
  color: { h: number; s: number; l: number };
  point: { x: number; y: number; z: number };
}

interface StoreSaturationEvent {
  type: "saturation";
  s: number;
  l: number;
  x: number;
  y: number;
}

interface StoreHueEvent {
  type: "hue";
  h: number;
  z: number;
}

type ColorActions = StoreSaturationEvent | StoreHueEvent;

interface ElementOffset {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface StoreStates {
  box: ElementOffset;
  btn: ElementOffset;
}

interface StoreViewportEvent {
  type: "viewport";
  box: ElementOffset;
  btn: ElementOffset;
}

interface StoreDragEvent {
  type: "drag";
  left: number;
  top: number;
}

interface StoreTapEvent {
  type: "tap";
  box: { left: number; top: number };
  btn: { left: number; top: number };
}

type StoreActions = StoreViewportEvent | StoreDragEvent | StoreTapEvent;

export type { ColorStates, ColorActions, StoreStates, StoreActions };

const colorRecuder = (
  state: ColorStates,
  action: ColorActions,
): ColorStates => {
  switch (action.type) {
    case "saturation": {
      const { s, l, x, y } = action;
      return {
        color: { ...state.color, s, l },
        point: { ...state.point, x, y },
      };
    }
    case "hue": {
      const { h, z } = action;
      return {
        color: { ...state.color, h },
        point: { ...state.point, z },
      };
    }
    default: {
      return state;
    }
  }
};

const storeReducer = (
  state: StoreStates,
  action: StoreActions,
): StoreStates => {
  switch (action.type) {
    case "viewport": {
      const { box, btn } = action;
      return { box, btn };
    }
    case "drag": {
      const { left, top } = action;
      return {
        ...state,
        btn: { ...state.btn, left, top },
      };
    }
    case "tap": {
      const { box, btn } = action;
      return {
        box: { ...state.box, ...box },
        btn: { ...state.btn, ...btn },
      };
    }
    default: {
      return state;
    }
  }
};

export { colorRecuder, storeReducer };

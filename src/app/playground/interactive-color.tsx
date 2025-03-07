"use client";

import type { RefObject } from "react";
import { useReducer, useRef, useMemo, useCallback } from "react";
import { useAnimationControls, motion, LayoutGroup } from "motion/react";
import { round } from "~/utils";

interface ColorStates {
  point: { x: number; y: number; z: number };
  offset: {
    box: { width: number; height: number };
    btn: { width: number; height: number };
    track: { width: number; height: number };
    thumb: { width: number; height: number };
    nonce: boolean;
  };
}

interface ViewportEvent {
  type: "viewport";
  point: ColorStates["point"];
  offset: ColorStates["offset"];
}

interface SaturationEvent {
  type: "saturation";
  x: number;
  y: number;
}

interface HueEvent {
  type: "hue";
  z: number;
}

type ColorActions = ViewportEvent | SaturationEvent | HueEvent;

const reducer = (state: ColorStates, action: ColorActions): ColorStates => {
  switch (action.type) {
    case "viewport": {
      return {
        ...state,
        point: action.point,
        offset: action.offset,
      };
    }
    case "saturation": {
      return {
        ...state,
        point: { ...state.point, x: action.x, y: action.y },
      };
    }
    case "hue": {
      return {
        ...state,
        point: { ...state.point, z: action.z },
      };
    }
    default: {
      return state;
    }
  }
};

function InteractiveColor() {
  const [state, dispatch] = useReducer(reducer, {
    point: { x: 100, y: 0, z: 210 },
    offset: {
      box: { width: 0, height: 0 },
      btn: { width: 24, height: 24 },
      track: { width: 0, height: 24 },
      thumb: { width: 24, height: 24 },
      nonce: true,
    },
  });

  const boxRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const btnAnimation = useAnimationControls();
  const thumbAnimation = useAnimationControls();

  const currentColor = useMemo(() => {
    const { point, offset } = state;
    const { nonce, box, track } = offset;

    const pointX = (point.x / box.width) * 100;
    const pointY = (point.y / box.height) * 100;
    const pointZ = point.z / track.width;

    let x = nonce ? point.x : pointX;
    let y = nonce ? point.y : pointY;
    x /= 100;
    y /= 100;
    y = 1 - y;

    let l = y * (1 - x / 2);
    if (l === 0 || l === 1) {
      x = 0;
    } else {
      x = (y - l) / Math.min(l, 1 - l);
    }
    x *= 100;
    l *= 100;

    return {
      h: nonce ? point.z : round(pointZ * 360, 2),
      s: round(x, 2),
      l: round(l, 2),
      x: nonce ? 0 : round(pointX, 2),
      y: nonce ? 0 : round(pointY, 2),
      z: nonce ? 0 : round(pointZ * 100, 2),
    };
  }, [state]);

  const getClientRect = useCallback(
    (
      ref: RefObject<HTMLDivElement | null>,
      dom: HTMLButtonElement | null,
    ): [DOMRect, DOMRect] => {
      let client, rect;
      const blank = { left: 0, top: 0, width: 0, height: 0 } as DOMRect;
      const current = ref.current;
      if (!current) {
        client = blank;
        rect = blank;
      } else {
        client = current.getBoundingClientRect();
        rect =
          dom !== null
            ? dom.getBoundingClientRect()
            : ((dom = current.querySelector("button")),
              dom !== null ? dom.getBoundingClientRect() : blank);
      }
      return [client, rect];
    },
    [],
  );

  const getClientArea = useCallback(
    (dom: HTMLDivElement): [DOMRect, boolean] => {
      const ignoredArea = Number(dom.getAttribute("tabindex") ?? -1) === 0;
      const rect = dom.getBoundingClientRect();
      return [rect, ignoredArea] as [DOMRect, boolean];
    },
    [],
  );

  const getClientRadius = useCallback(
    (
      rect: DOMRect,
      offset: {
        x: number;
        y: number;
        width: number;
        height: number;
      },
    ): [number, number] => {
      let pointX = offset.x - rect.left - offset.width / 2;
      let pointY = offset.y - rect.top - offset.height / 2;

      const boxWidth = rect.width - offset.width;
      const boxHeight = rect.height - offset.height;
      pointX = pointX < 0 ? 0 : pointX > boxWidth ? boxWidth : pointX;
      pointY = pointY < 0 ? 0 : pointY > boxHeight ? boxHeight : pointY;

      return [pointX, pointY];
    },
    [],
  );

  const handleViewport = useCallback(() => {
    const [box, btn] = getClientRect(boxRef, null);
    const [track, thumb] = getClientRect(trackRef, null);
    const boxWidth = box.width - btn.width;
    const boxHeight = box.height - btn.height;
    const trackWidth = track.width - thumb.width;

    const nonce = state.offset.nonce;
    const pointX = nonce
      ? (state.point.x / 100) * boxWidth
      : btn.left - box.left;
    const pointY = nonce
      ? (state.point.y / 100) * boxHeight
      : btn.top - box.top;
    const pointZ = nonce
      ? (state.point.z / 360) * trackWidth
      : thumb.left - track.left;

    dispatch({
      type: "viewport",
      point: { x: pointX, y: pointY, z: pointZ },
      offset: {
        box: { width: boxWidth, height: boxHeight },
        btn: { width: btn.width, height: btn.height },
        track: { width: trackWidth, height: track.height },
        thumb: { width: thumb.width, height: thumb.height },
        nonce: false,
      },
    });
    btnAnimation.start({ x: pointX, y: pointY });
    thumbAnimation.start({ x: pointZ });
  }, [getClientRect, state, dispatch, btnAnimation, thumbAnimation]);

  const hue = currentColor.h;
  const saturation = currentColor.s;
  const lightness = currentColor.l;
  const ring = lightness > 40 ? 20 : 80;

  return (
    <div
      className="grid gap-8 md:grid-cols-2"
      style={{
        ["--hue" as string]: `${hue}deg`,
        ["--saturation" as string]: `${saturation}%`,
        ["--lightness" as string]: `${lightness}%`,
      }}
    >
      <LayoutGroup>
        <motion.div className="grid gap-y-4" onViewportEnter={handleViewport}>
          <motion.div
            ref={boxRef}
            layout="preserve-aspect"
            className="interactive-saturation relative flex aspect-square cursor-crosshair touch-none overflow-hidden"
            tabIndex={-1}
            onClick={(event) => {
              const [rect, ignoredArea] = getClientArea(
                event.target as HTMLDivElement,
              );
              if (ignoredArea) return;
              const { btn } = state.offset;
              const [pointX, pointY] = getClientRadius(rect, {
                x: event.clientX,
                y: event.clientY,
                width: btn.width,
                height: btn.height,
              });
              event.preventDefault();
              btnAnimation.start({ x: pointX, y: pointY });
              dispatch({ type: "saturation", x: pointX, y: pointY });
            }}
            onPan={(event) => {
              const [rect, ignoredArea] = getClientArea(
                event.target as HTMLDivElement,
              );
              if (ignoredArea) return;
              const { btn } = state.offset;
              const [pointX, pointY] = getClientRadius(rect, {
                x: event.clientX,
                y: event.clientY,
                width: btn.width,
                height: btn.height,
              });
              event.preventDefault();
              btnAnimation.set({ x: pointX, y: pointY });
              dispatch({ type: "saturation", x: pointX, y: pointY });
            }}
          >
            <motion.button
              animate={btnAnimation}
              drag
              dragConstraints={boxRef}
              dragElastic={false}
              dragMomentum={true}
              viewport={{ once: true }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, "--ring": `${ring}%` }}
              whileHover={{ "--tw-ring-offset-width": "1px" }}
              whileFocus={{ "--tw-ring-offset-width": "2px" }}
              whileDrag={{ "--ring": `${ring < 50 ? 0 : 100}%` }}
              aria-label="adjust color saturation"
              className="interactive-controls inline-flex size-6 cursor-all-scroll rounded-2xl ring-2 outline-0 ring-inset"
              tabIndex={0}
              onDrag={(event) => {
                const [box, btn] = getClientRect(
                  boxRef,
                  event.target as HTMLButtonElement,
                );
                const pointX = btn.left - box.left;
                const pointY = btn.top - box.top;

                event.preventDefault();
                dispatch({ type: "saturation", x: pointX, y: pointY });
              }}
              onDragTransitionEnd={() => {
                btnAnimation.start({
                  x: state.point.x,
                  y: state.point.y,
                  "--ring": `${ring}%`,
                });
              }}
              onKeyDown={(event) => {
                const pointX = state.point.x;
                const pointY = state.point.y;
                const threshold = 8;
                const updatePosition = (percentX: number, percentY: number) => {
                  const { box } = state.offset;
                  percentX =
                    percentX < 0
                      ? 0
                      : percentX > box.width
                        ? box.width
                        : percentX;
                  percentY =
                    percentY < 0
                      ? 0
                      : percentY > box.height
                        ? box.height
                        : percentY;
                  btnAnimation.start({ x: percentX, y: percentY });
                  dispatch({ type: "saturation", x: percentX, y: percentY });
                };
                switch (event.key) {
                  case "ArrowRight": {
                    event.preventDefault();
                    updatePosition(pointX + threshold, pointY);
                    break;
                  }
                  case "ArrowLeft": {
                    event.preventDefault();
                    updatePosition(pointX - threshold, pointY);
                    break;
                  }
                  case "ArrowDown": {
                    event.preventDefault();
                    updatePosition(pointX, pointY + threshold);
                    break;
                  }
                  case "ArrowUp": {
                    event.preventDefault();
                    updatePosition(pointX, pointY - threshold);
                    break;
                  }
                }
              }}
            />
          </motion.div>
          <motion.div
            ref={trackRef}
            layout="preserve-aspect"
            className="relative flex h-6 cursor-crosshair touch-none items-center rounded-xl"
            tabIndex={-1}
            onClick={(event) => {
              const [rect, ignoredArea] = getClientArea(
                event.target as HTMLDivElement,
              );
              if (ignoredArea) return;
              const { thumb } = state.offset;
              const [pointZ] = getClientRadius(rect, {
                x: event.clientX,
                y: event.clientY,
                width: thumb.width,
                height: thumb.height,
              });
              event.preventDefault();
              thumbAnimation.start({ x: pointZ });
              dispatch({ type: "hue", z: pointZ });
            }}
            onPan={(event) => {
              const [rect, ignoredArea] = getClientArea(
                event.target as HTMLDivElement,
              );
              if (ignoredArea) return;
              const { thumb } = state.offset;
              const [pointZ] = getClientRadius(rect, {
                x: event.clientX,
                y: event.clientY,
                width: thumb.width,
                height: thumb.height,
              });
              event.preventDefault();
              thumbAnimation.set({ x: pointZ });
              dispatch({ type: "hue", z: pointZ });
            }}
          >
            <motion.button
              animate={thumbAnimation}
              drag="x"
              dragConstraints={trackRef}
              dragElastic={false}
              dragMomentum={true}
              viewport={{ once: true }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, "--ring": `${ring}%` }}
              whileHover={{ "--tw-ring-offset-width": "1px" }}
              whileFocus={{ "--tw-ring-offset-width": "2px" }}
              whileDrag={{ "--ring": `${ring < 50 ? 0 : 100}%` }}
              aria-label="adjust color hue"
              className="interactive-controls absolute inset-0 z-1 inline-flex size-6 cursor-all-scroll rounded-xl ring-2 outline-0 ring-inset"
              tabIndex={0}
              onDrag={(event) => {
                const [track, thumb] = getClientRect(
                  trackRef,
                  event.target as HTMLButtonElement,
                );
                const pointZ = thumb.left - track.left;
                event.preventDefault();
                dispatch({ type: "hue", z: pointZ });
              }}
              onDragTransitionEnd={() => {
                thumbAnimation.start({
                  x: state.point.z,
                  "--ring": `${ring}%`,
                });
              }}
              onKeyDown={(event) => {
                const pointZ = state.point.z;
                const threshold = 8;
                const updatePosition = (percentZ: number) => {
                  const { track } = state.offset;
                  percentZ =
                    percentZ < 0
                      ? 0
                      : percentZ > track.width
                        ? track.width
                        : percentZ;
                  thumbAnimation.start({ x: percentZ });
                  dispatch({ type: "hue", z: percentZ });
                };
                switch (event.key) {
                  case "ArrowDown":
                  case "ArrowRight": {
                    event.preventDefault();
                    updatePosition(pointZ + threshold);
                    break;
                  }
                  case "ArrowUp":
                  case "ArrowLeft": {
                    event.preventDefault();
                    updatePosition(pointZ - threshold);
                    break;
                  }
                }
              }}
            />
            <span className="interactive-rainbow pointer-events-none absolute right-0 left-0 z-0 h-4 rounded-xl" />
          </motion.div>
        </motion.div>
      </LayoutGroup>
      <Preview color={currentColor} />
    </div>
  );
}

interface Dataset {
  color: {
    h: number;
    s: number;
    l: number;
    x: number;
    y: number;
    z: number;
  };
}

function Preview({ color }: Dataset) {
  const hasOffset = (
    value: number,
    min: number,
    max: number,
  ): string | undefined => {
    const warning = "text-red-700 dark:text-red-400";
    const above = value > max;
    const under = value < min;
    return above || under ? warning : undefined;
  };
  return (
    <div className="grid content-start gap-y-4 font-mono text-gray-700 dark:text-gray-300">
      <div
        className="bg-ref size-16"
        style={{
          ["--bg" as string]:
            "hsl(var(--hue) var(--saturation) var(--lightness))",
        }}
      ></div>
      <div className="inline-grid">
        <h2 className="font-semibold text-gray-900 dark:text-gray-100">
          color
        </h2>
        <p className={hasOffset(color.h, 0, 360)}>{`H: ${color.h}%`}</p>
        <p className={hasOffset(color.s, 0, 100)}>{`S: ${color.s}%`}</p>
        <p className={hasOffset(color.l, 0, 100)}>{`L: ${color.l}%`}</p>
      </div>
      <div className="inline-grid">
        <h2 className="font-semibold text-gray-900 dark:text-gray-100">axis</h2>
        <p className={hasOffset(color.x, 0, 100)}>{`X: ${color.x}%`}</p>
        <p className={hasOffset(color.y, 0, 100)}>{`Y: ${color.y}%`}</p>
        <p className={hasOffset(color.z, 0, 100)}>{`Z: ${color.z}%`}</p>
      </div>
    </div>
  );
}

export { InteractiveColor };

"use client";

import type { StoreStates, StoreActions } from "./store";
import { useReducer, useRef, useCallback, useEffect, memo } from "react";
import { useAnimationControls, motion } from "motion/react";
import { storeReducer } from "./store";
import { round } from "~/utils";

interface Props {
  color: [number, number, number];
}

function Interactive({ color }: Props) {
  const [hue] = color;

  const [state, dispatch] = useReducer<StoreStates, [StoreActions]>(
    storeReducer,
    {
      box: { left: 0, top: 0, width: 0, height: 24 },
      btn: { left: 0, top: 0, width: 24, height: 24 },
    },
  );

  const constraint = useRef<HTMLDivElement | null>(null);
  const animation = useAnimationControls();

  const handleResize = useCallback(() => {
    const hasConstraint = constraint.current;
    if (!hasConstraint) return;

    const hasBtn = hasConstraint.querySelector("button");
    if (!hasBtn) return;

    const boxRect = hasConstraint.getBoundingClientRect();
    const btnRect = hasBtn.getBoundingClientRect();

    const boxWidth = boxRect.width - state.btn.width;

    const pointX = (hue / 360) * boxWidth;

    animation.set({
      x: pointX,
      y: 0,
    });
    dispatch({
      type: "viewport",
      box: {
        left: boxRect.left,
        top: boxRect.top,
        width: boxWidth,
        height: boxRect.height,
      },
      btn: {
        left: pointX,
        top: 0,
        width: btnRect.width,
        height: btnRect.height,
      },
    });
  }, [state, dispatch, hue, animation]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  const percentX = (state.btn.left / state.box.width) * 360;
  const pointX = (state.btn.left / state.box.width) * 100;

  const h = round(percentX, 2);

  const css = `hsl(${h}deg 100% 50%)`;

  return (
    <div>
      <div
        ref={constraint}
        className="bg-ref relative z-0 flex h-6 w-full items-center overflow-hidden select-none"
      >
        <motion.div
          layout="preserve-aspect"
          layoutId="color-hue"
          viewport={{ once: true }}
          className="absolute top-0 right-0 bottom-0 left-0 z-1 inline-flex cursor-crosshair touch-none outline-0"
          tabIndex={-1}
          onViewportEnter={handleResize}
        >
          <motion.button
            animate={animation}
            drag
            dragConstraints={constraint}
            dragTransition={{ bounceStiffness: 10, bounceDamping: 2 }}
            dragElastic={false}
            dragMomentum={true}
            initial={{ opacity: 0 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1 }}
            aria-label="hue"
            className="bg-ref absolute z-2 size-6 cursor-all-scroll rounded-2xl ring-2 outline-0 ring-inset"
            style={{ ["--bg" as string]: css }}
            tabIndex={0}
            onDrag={(event) => {
              event.preventDefault();
              const hasBtn = event.target as HTMLDivElement;
              const btnRect = hasBtn.getBoundingClientRect();

              const pointX = btnRect.left - state.box.left;

              dispatch({ type: "drag", left: pointX, top: 0 });
            }}
          />
        </motion.div>
        <div
          className="bg-gradient-ref pointer-events-none absolute right-0 left-0 z-0 h-4 rounded-xl"
          style={{
            ["--bg" as string]:
              "linear-gradient(90deg, hsl(0 100% 50%) 0%, hsl(60 100% 50%) 17%, hsl(120 100% 50%) 33%, hsl(180 100% 50%) 50%, hsl(240 100% 50%) 67%, hsl(300 100% 50%) 83%, hsl(0 100% 50%) 100%)",
          }}
        />
      </div>
      <Preview point={{ x: pointX, h: h }} box={state.box} btn={state.btn} />
    </div>
  );
}

interface Dataset {
  point: { x: number; h: number };
  box: StoreStates["box"];
  btn: StoreStates["btn"];
}

function Preview({ point, box, btn }: Dataset) {
  const pointX = round(point.x, 2);
  const pointH = round(point.h, 2);

  const btnLeft = round(btn.left, 2);
  const btnTop = round(btn.top, 2);
  const btnWidth = round(btn.width, 2);
  const btnHeight = round(btn.height, 2);

  const boxLeft = round(box.left, 2);
  const boxTop = round(box.top, 2);
  const boxWidth = round(box.width, 2);
  const boxHeight = round(box.height, 2);

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
    <div className="grid gap-4 pt-4 font-mono text-gray-600 md:grid-cols-2 dark:text-gray-400">
      <div className="flex flex-col">
        <h2 className="font-semibold text-gray-800 dark:text-gray-200">axis</h2>
        <p className={hasOffset(pointX, 0, 100)}>{`X: ${pointX}%`}</p>
      </div>
      <div className="flex flex-col">
        <h2 className="font-semibold text-gray-800 dark:text-gray-200">
          color
        </h2>
        <p className={hasOffset(pointH, 0, 360)}>{`H: ${pointH}%`}</p>
      </div>
      <div className="flex flex-col">
        <h2 className="font-semibold text-gray-800 dark:text-gray-200">box</h2>
        <p>{`L: ${boxLeft}`}</p>
        <p>{`T: ${boxTop}`}</p>
        <p>{`W: ${boxWidth}px`}</p>
        <p>{`H: ${boxHeight}px`}</p>
      </div>
      <div className="flex flex-col">
        <h2 className="font-semibold text-gray-800 dark:text-gray-200">btn</h2>
        <p className={hasOffset(btnLeft, 0, boxWidth)}>{`L: ${btnLeft}`}</p>
        <p className={hasOffset(btnTop, 0, boxHeight)}>{`T: ${btnTop}`}</p>
        <p>{`W: ${btnWidth}px`}</p>
        <p>{`H: ${btnHeight}px`}</p>
      </div>
    </div>
  );
}

const ColorHue = memo(Interactive);

export { ColorHue };

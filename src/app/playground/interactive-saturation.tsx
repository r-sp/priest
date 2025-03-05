"use client";

import type { ColorStates, StoreStates, StoreActions } from "./store";
import {
  useReducer,
  useRef,
  useMemo,
  useCallback,
  useEffect,
  memo,
} from "react";
import { useAnimationControls, motion } from "motion/react";
import { storeReducer } from "./store";
import { round } from "~/utils";

interface Props {
  store: ColorStates;
  onChange: (s: number, l: number, x: number, y: number) => void;
}

function Interactive({ store, onChange }: Props) {
  const [state, dispatch] = useReducer<StoreStates, [StoreActions]>(
    storeReducer,
    {
      box: { left: 0, top: 0, width: 0, height: 0 },
      btn: { left: 0, top: 0, width: 32, height: 32 },
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
    const boxHeight = boxRect.height - state.btn.height;

    const pointX = (store.color.s / 100) * boxWidth;
    const pointY = (store.color.l / 100) * boxHeight;

    animation.set({
      x: pointX,
      y: pointY,
    });
    dispatch({
      type: "viewport",
      box: {
        left: boxRect.left,
        top: boxRect.top,
        width: boxWidth,
        height: boxHeight,
      },
      btn: {
        left: pointX,
        top: pointY,
        width: btnRect.width,
        height: btnRect.height,
      },
    });
  }, [store, state, dispatch, animation]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  const color = useMemo(() => {
    const pointX = (state.btn.left / state.box.width) * 100;
    const pointY = (state.btn.top / state.box.height) * 100;
    let stateX = pointX;
    let stateY = pointY;

    stateX /= 100;
    stateY /= 100;
    stateY = 1 - stateY;

    let stateL = stateY * (1 - stateX / 2);
    if (stateL === 0 || stateL === 1) {
      stateX = 0;
    } else {
      stateX = (stateY - stateL) / Math.min(stateL, 1 - stateL);
    }
    stateX *= 100;
    stateL *= 100;

    return {
      h: round(store.color.h, 2),
      s: round(stateX, 2),
      l: round(stateL, 2),
      x: round(pointX, 2),
      y: round(pointY, 2),
    };
  }, [state, store]);

  return (
    <div
      ref={constraint}
      className="bg-ref relative z-0 flex aspect-square overflow-hidden select-none"
      style={{
        ["--bg" as string]: `hsl(${color.h}deg 100% 50%)`,
        backgroundImage:
          "linear-gradient(0deg,#000,transparent),linear-gradient(90deg,#fff,hsla(0,0%,100%,0))",
        boxShadow: "inset 0 0 0 1px rgba(0,0,0,.05)",
      }}
    >
      <motion.div
        layout="preserve-aspect"
        layoutId="color-saturation"
        viewport={{ once: true }}
        className="absolute top-0 right-0 bottom-0 left-0 z-1 inline-flex cursor-crosshair touch-none outline-0"
        tabIndex={-1}
        onViewportEnter={handleResize}
        onClick={(event) => {
          event.preventDefault();
          const area = event.target as HTMLDivElement;
          const ignoredArea = Number(area.getAttribute("tabindex") ?? -1) === 0;
          if (ignoredArea) return;

          const rect = area.getBoundingClientRect();

          const offsetX = state.btn.width / 2;
          const offsetY = state.btn.height / 2;

          const pointX = event.clientX - rect.left - offsetX;
          const pointY = event.clientY - rect.top - offsetY;

          animation.start({ x: pointX, y: pointY });
          dispatch({
            type: "tap",
            box: { left: rect.left, top: rect.top },
            btn: { left: pointX, top: pointY },
          });
          onChange(color.s, color.l, color.x, color.y);
        }}
        onPan={(event) => {
          event.preventDefault();
          const area = event.target as HTMLDivElement;
          const ignoredArea = Number(area.getAttribute("tabindex") ?? -1) === 0;
          if (ignoredArea) return;

          const rect = area.getBoundingClientRect();

          const offsetX = state.btn.width / 2;
          const offsetY = state.btn.height / 2;

          const pointX = event.clientX - rect.left - offsetX;
          const pointY = event.clientY - rect.top - offsetY;

          animation.set({ x: pointX, y: pointY });
          dispatch({
            type: "tap",
            box: { left: rect.left, top: rect.top },
            btn: { left: pointX, top: pointY },
          });
          onChange(color.s, color.l, color.x, color.y);
        }}
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
          aria-label="saturation"
          className="bg-ref absolute z-2 size-8 cursor-all-scroll rounded-2xl ring-2 outline-0 ring-inset"
          style={{
            ["--bg" as string]: `hsl(${color.h}deg ${color.s}% ${color.l}%)`,
            ["--tw-ring-color" as string]: `hsl(${color.h}deg ${color.s}% ${color.l > 32 ? 20 : 80}%)`,
          }}
          tabIndex={0}
          onDrag={(event) => {
            event.preventDefault();
            const hasBtn = event.target as HTMLDivElement;
            const btnRect = hasBtn.getBoundingClientRect();

            const pointX = btnRect.left - state.box.left;
            const pointY = btnRect.top - state.box.top;

            dispatch({ type: "drag", left: pointX, top: pointY });
            onChange(color.s, color.l, color.x, color.y);
          }}
          onKeyDown={(event) => {
            const pointX = state.btn.left;
            const pointY = state.btn.top;
            const offset = 8;

            const updatePosition = (percentX: number, percentY: number) => {
              dispatch({ type: "drag", left: percentX, top: percentY });
              animation.start({ x: percentX, y: percentY });
            };

            switch (event.key) {
              case "ArrowRight": {
                event.preventDefault();
                updatePosition(pointX + offset, pointY);
                break;
              }
              case "ArrowLeft": {
                event.preventDefault();
                updatePosition(pointX - offset, pointY);
                break;
              }
              case "ArrowDown": {
                event.preventDefault();
                updatePosition(pointX, pointY + offset);
                break;
              }
              case "ArrowUp": {
                event.preventDefault();
                updatePosition(pointX, pointY - offset);
                break;
              }
            }
          }}
        />
      </motion.div>
    </div>
  );
}

const ColorSaturation = memo(Interactive);

export { ColorSaturation };

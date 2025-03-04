"use client";

import type { MouseEvent } from "react";
import type { InteractiveProps } from "./interactive-color";
import { useRef, useCallback, useEffect, memo } from "react";
import { useAnimationControls, motion } from "motion/react";
import { round } from "~/utils";

function Interactive({ state, dispatch }: InteractiveProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const animationControls = useAnimationControls();

  const getBoxRect = useCallback(() => {
    const hasBoxRef = boxRef.current;
    if (!hasBoxRef) {
      return {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        top: 0,
        left: 0,
      } as DOMRect;
    }
    return hasBoxRef.getBoundingClientRect();
  }, [boxRef]);

  const getBoxRadius = useCallback(
    (event: globalThis.PointerEvent | MouseEvent) => {
      const area = event.target as HTMLDivElement;
      const ignoredArea = Number(area.getAttribute("tabindex") ?? -1) === 0;

      const boxRect = getBoxRect();

      const clickX = event.clientX - boxRect.left;
      const clickY = event.clientY - boxRect.top;

      const percentX = (clickX / boxRect.width) * 100;
      const percentY = (clickY / boxRect.height) * 100;

      return [percentX, percentY, ignoredArea] as [number, number, boolean];
    },
    [getBoxRect],
  );

  const getBoxAxis = useCallback(
    (percentX: number, percentY: number) => {
      const boxWidth = state.box.width;
      const boxHeight = state.box.height;

      const offsetX = (percentX / 100 - 0.5) * boxWidth;
      const offsetY = (percentY / 100 - 0.5) * boxHeight;

      const pointX = boxWidth / 2 + offsetX;
      const pointY = boxHeight / 2 + offsetY;

      return [pointX, pointY] as [number, number];
    },
    [state],
  );

  const handleDrag = useCallback(
    (
      event:
        | globalThis.MouseEvent
        | globalThis.TouchEvent
        | globalThis.PointerEvent,
    ) => {
      const boxRect = getBoxRect();

      const boxWidth = state.box.width;
      const boxHeight = state.box.height;
      const btnWidth = state.btn.width;
      const btnHeght = state.btn.height;

      const hasBtn = event.target as HTMLDivElement;
      const btnRect = hasBtn.getBoundingClientRect();

      dispatch({
        type: "saturation",
        h: state.color.h,
        s: (btnWidth / boxWidth) * 100,
        v: (btnHeght / boxHeight) * 100,
        left: btnRect.left - boxRect.left,
        top: btnRect.top - boxRect.top,
        width: btnRect.width,
        height: btnRect.height,
      });
    },
    [getBoxRect, state, dispatch],
  );

  const handlePosition = useCallback(
    (percentX: number, percentY: number) => {
      const [pointX, pointY] = getBoxAxis(percentX, percentY);
      animationControls.start({ x: pointX, y: pointY });

      const hue = state.color.h;
      const saturation = state.color.s;
      const value = state.color.v;

      const hasSaturation = saturation !== percentX;
      const hasValue = value !== percentY;

      if (hasSaturation && hasValue) {
        dispatch({ type: "color", h: hue, s: percentX, v: percentY });
      }
    },
    [getBoxAxis, animationControls, state, dispatch],
  );

  const handlePanRadius = useCallback(
    (event: PointerEvent) => {
      const [percentX, percentY, ignoredArea] = getBoxRadius(event);
      if (ignoredArea) return;

      const [pointX, pointY] = getBoxAxis(percentX, percentY);
      animationControls.set({ x: pointX, y: pointY });

      const hue = state.color.h;
      const saturation = state.color.s;
      const value = state.color.v;

      const hasSaturation = saturation !== percentX;
      const hasValue = value !== percentY;

      if (hasSaturation && hasValue) {
        dispatch({ type: "color", h: hue, s: percentX, v: percentY });
      }
    },
    [getBoxRadius, getBoxAxis, animationControls, state, dispatch],
  );

  const handleTapRadius = useCallback(
    (event: MouseEvent) => {
      const [percentX, percentY, ignoredArea] = getBoxRadius(event);
      if (ignoredArea) return;

      handlePosition(percentX, percentY);
    },
    [getBoxRadius, handlePosition],
  );

  const getBoxPosition = useCallback(() => {
    const boxRect = getBoxRect();

    const boxWidth = state.box.width;
    const boxHeight = state.box.height;
    const btnWidth = state.btn.width;
    const btnHeght = state.btn.height;

    const offsetWidth = boxRect.width - btnWidth;
    const offsetHeight = boxRect.height - btnHeght;

    const hasOffsetWidth = offsetWidth !== boxWidth;
    const hasOffsetHeight = offsetHeight !== boxHeight;

    const offset = {
      w: offsetWidth,
      h: offsetHeight,
      l: boxRect.left,
      t: boxRect.top,
    };

    const axis = {
      x: (state.color.s / 100) * offsetWidth,
      y: (state.color.v / 100) * offsetHeight,
    };

    return [offset, axis, hasOffsetWidth, hasOffsetHeight] as [
      typeof offset,
      typeof axis,
      boolean,
      boolean,
    ];
  }, [getBoxRect, state]);

  const handleResize = useCallback(() => {
    const [offset, axis, hasWidth, hasHeight] = getBoxPosition();

    if (hasWidth && hasHeight) {
      animationControls.start({
        x: axis.x,
        y: axis.y,
        scale: 1,
        opacity: 1,
      });
      dispatch({
        type: "box",
        left: offset.l,
        top: offset.t,
        width: offset.w,
        height: offset.h,
      });
    }
  }, [getBoxPosition, animationControls, dispatch]);

  useEffect(() => {
    const controls = new AbortController();
    if (!controls.signal.aborted) {
      handleResize();
    }
    window.addEventListener("resize", handleResize);
    return () => {
      controls.abort();
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  const convertColor = (s: number, v: number) => {
    // make sure the value is 0-1
    s /= 100;
    v /= 100;
    s = Math.max(0, Math.min(1, s));
    v = 1 - Math.max(0, Math.min(1, v));

    // lightness and saturation
    let l = v * (1 - s / 2);
    if (l === 0 || l === 1) {
      s = 0;
    } else {
      s = (v - l) / Math.min(l, 1 - l);
    }

    // make sure the value is 0-100
    s *= 100;
    l *= 100;
    return [s, l];
  };

  const colorHue = state.color.h;
  const colorSaturation = state.color.s;
  const colorValue = state.color.v;

  const [s, l] = convertColor(colorSaturation, colorValue);

  const hue = round(colorHue, 2);
  const saturation = round(s, 2);
  const lightness = round(l, 2);

  const btnX = round(colorSaturation, 2);
  const btnY = round(colorValue, 2);

  const css = `hsl(${hue}deg ${saturation}% ${lightness}%)`;
  const ring = `hsl(${hue}deg ${saturation}% ${lightness > 40 ? 20 : 80}%)`;

  return (
    <div
      className="bg-ref relative z-0 flex aspect-square overflow-hidden select-none"
      style={{
        ["--bg" as string]: `hsl(${hue}deg 100% 50%)`,
        backgroundImage:
          "linear-gradient(0deg,#000,transparent),linear-gradient(90deg,#fff,hsla(0,0%,100%,0))",
        boxShadow: "inset 0 0 0 1px rgba(0,0,0,.05)",
      }}
    >
      <motion.div
        ref={boxRef}
        layout="preserve-aspect"
        className="absolute top-0 right-0 bottom-0 left-0 z-1 cursor-crosshair touch-none"
        tabIndex={-1}
        onPan={handlePanRadius}
        onClick={handleTapRadius}
      >
        <motion.div
          animate={animationControls}
          initial={{ scale: 0.5, opacity: 0.1 }}
          drag
          dragConstraints={boxRef}
          dragTransition={{ bounceStiffness: 10, bounceDamping: 2 }}
          dragElastic={false}
          dragMomentum={true}
          className="bg-ref absolute z-2 size-8 cursor-all-scroll rounded-2xl ring-2 ring-inset"
          style={{
            ["--bg" as string]: css,
            ["--tw-ring-color" as string]: ring,
          }}
          tabIndex={0}
          onDrag={(e) => handleDrag(e)}
        />
      </motion.div>
      <div className="pointer-events-none absolute bottom-0 z-2 flex flex-col gap-y-2 px-4 pb-4 font-mono text-sm break-words text-gray-300">
        <div className="inline-flex flex-col">
          <h2>Color</h2>
          <p>{`H: ${hue}deg`}</p>
          <p>{`S: ${saturation}%`}</p>
          <p>{`L: ${lightness}%`}</p>
        </div>
        <div className="inline-flex flex-col">
          <h2>Motion</h2>
          <p>{`X: ${btnX}%`}</p>
          <p>{`Y: ${btnY}%`}</p>
        </div>
        <div className="pointer-events-auto inline-flex">
          <button
            className="inline-flex items-center justify-start"
            onClick={() => {
              const randomX = round(Math.random() * 100, 2);
              const randomY = round(Math.random() * 100, 2);
              handlePosition(randomX, randomY);
            }}
          >
            <span>Set random axis</span>
          </button>
        </div>
      </div>
    </div>
  );
}

const ColorSaturation = memo(Interactive);

export { ColorSaturation };

"use client";

import type { MouseEvent } from "react";
import type { InteractiveProps } from "./interactive-color";
import { useRef, useCallback, useEffect, memo } from "react";
import { useAnimationControls, motion } from "motion/react";
import { round } from "~/utils";

function Interactive({ state, dispatch }: InteractiveProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const animationControls = useAnimationControls();

  const getTrackRect = useCallback(() => {
    const hasTrackRef = trackRef.current;
    if (!hasTrackRef) {
      return {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        top: 0,
        left: 0,
      } as DOMRect;
    }
    return hasTrackRef.getBoundingClientRect();
  }, [trackRef]);

  const getTrackRadius = useCallback(
    (event: globalThis.PointerEvent | MouseEvent) => {
      const area = event.target as HTMLDivElement;
      const ignoredArea = Number(area.getAttribute("tabindex") ?? -1) === 0;

      const trackRect = getTrackRect();

      const clickX = event.clientX - trackRect.left;
      const percentX = (clickX / trackRect.width) * 100;

      return [percentX, ignoredArea] as [number, boolean];
    },
    [getTrackRect],
  );

  const getTrackAxis = useCallback(
    (percentX: number) => {
      const trackWidth = state.track.width;
      const offsetX = (percentX / 100 - 0.5) * trackWidth;

      const pointX = trackWidth / 2 + offsetX;
      const pointZ = (percentX / 100) * 360;

      return [pointX, pointZ] as [number, number];
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
      const trackRect = getTrackRect();

      const trackWidth = state.track.width;
      const thumbLeft = state.thumb.left;

      const hasThumb = event.target as HTMLDivElement;
      const thumbRect = hasThumb.getBoundingClientRect();

      const offsetLeft = thumbRect.left - trackRect.left;

      dispatch({
        type: "hue",
        h: (thumbLeft / trackWidth) * 360,
        s: state.color.s,
        v: state.color.v,
        left: offsetLeft,
        top: 0,
        width: thumbRect.width,
        height: thumbRect.height,
      });
    },
    [getTrackRect, state, dispatch],
  );

  const handlePosition = useCallback(
    (percentX: number) => {
      const [pointX, pointZ] = getTrackAxis(percentX);
      animationControls.start({ x: pointX, y: 0 });

      const hasHue = state.color.h !== pointZ;
      if (hasHue) {
        dispatch({
          type: "color",
          h: pointZ,
          s: state.color.s,
          v: state.color.v,
        });
      }
    },
    [getTrackAxis, animationControls, state, dispatch],
  );

  const handlePanRadius = useCallback(
    (event: globalThis.PointerEvent) => {
      const [percentX, ignoredArea] = getTrackRadius(event);
      if (ignoredArea) return;

      const [pointX, pointZ] = getTrackAxis(percentX);
      animationControls.set({ x: pointX, y: 0 });

      const hasHue = state.color.h !== pointZ;
      if (hasHue) {
        dispatch({
          type: "color",
          h: pointZ,
          s: state.color.s,
          v: state.color.v,
        });
      }
    },
    [getTrackRadius, getTrackAxis, animationControls, state, dispatch],
  );

  const handleTapRadius = useCallback(
    (event: MouseEvent) => {
      const [percentX, ignoredArea] = getTrackRadius(event);
      if (ignoredArea) return;

      handlePosition(percentX);
    },
    [getTrackRadius, handlePosition],
  );

  const getTrackPosition = useCallback(() => {
    const trackRect = getTrackRect();

    const thumbWidth = state.track.width;
    const thumbHeight = state.track.height;

    const offsetWidth = trackRect.width - thumbWidth;
    const offsetHeight = trackRect.height - thumbHeight;

    const offset = {
      l: trackRect.left,
      w: offsetWidth,
      h: offsetHeight,
      t: trackRect.top,
    };

    const x = (state.color.h / 360) * offsetWidth;

    const hasHue = x !== state.color.h;

    return [offset, x, hasHue] as [typeof offset, number, boolean];
  }, [getTrackRect, state]);

  const handleResize = useCallback(() => {
    const [offset, axis, hasHue] = getTrackPosition();

    if (hasHue) {
      animationControls.start({
        x: axis,
        scale: 1,
        opacity: 1,
      });

      dispatch({
        type: "track",
        left: offset.l,
        top: offset.t,
        width: offset.w,
        height: offset.h,
      });
    }
  }, [getTrackPosition, animationControls, dispatch]);

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

  const hue = round(state.color.h, 2);

  return (
    <div className="relative z-0 flex h-6 items-center overflow-hidden rounded-xl select-none">
      <motion.div
        ref={trackRef}
        layout="preserve-aspect"
        className="absolute top-0 right-0 bottom-0 left-0 z-1 cursor-crosshair touch-none"
        tabIndex={-1}
        onPan={handlePanRadius}
        onClick={handleTapRadius}
      >
        <motion.div
          animate={animationControls}
          initial={{ scale: 0.5, opacity: 0.1 }}
          drag="x"
          dragConstraints={trackRef}
          dragTransition={{ bounceStiffness: 10, bounceDamping: 2 }}
          dragDirectionLock={true}
          dragElastic={false}
          dragMomentum={true}
          className="bg-ref size-6 cursor-all-scroll rounded-xl ring-2 shadow-gray-500 ring-gray-950/50 ring-inset dark:ring-gray-50/70"
          style={{ ["--bg" as string]: `hsl(${hue}deg 100% 50%)` }}
          tabIndex={0}
          onDrag={(e) => handleDrag(e)}
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
  );
}

const ColorHue = memo(Interactive);

export { ColorHue };

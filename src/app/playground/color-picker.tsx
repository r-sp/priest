"use client";

import type { Dispatch, SetStateAction, MouseEvent } from "react";
import { useState, useRef, useCallback, useEffect, memo } from "react";
import { useAnimationControls, motion } from "motion/react";
import { round } from "~/utils";

interface HSV {
  h: number;
  s: number;
  v: number;
}

interface Offset {
  l: number;
  t: number;
  w: number;
  h: number;
}

interface Axis {
  x: number;
  y: number;
}

interface Actions {
  color: HSV;
  setColor: Dispatch<SetStateAction<HSV>>;
}

type DragEvent =
  | globalThis.MouseEvent
  | globalThis.PointerEvent
  | globalThis.TouchEvent;

type RadiusEvent = globalThis.PointerEvent | MouseEvent;

type RadiusData = [number, number, boolean];

type RadiusAxis = [number, number];

type RadiusPosition = [Offset, Axis, boolean, boolean];

const clientRect = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  top: 0,
  left: 0,
} as DOMRect;

function Saturation({ color, setColor }: Actions) {
  const boxData = useState<Offset>({ l: 0, t: 0, w: 0, h: 0 });
  const btnData = useState<Offset>({ l: 0, t: 0, w: 32, h: 32 });

  const [box, setBox] = boxData;
  const [btn, setBtn] = btnData;

  const boxRef = useRef<HTMLDivElement>(null);
  const animationControls = useAnimationControls();

  const updateColor = useCallback(
    (input: Partial<HSV>) => {
      setColor({ ...color, ...input });
    },
    [color, setColor],
  );

  const getBoxRect = useCallback(() => {
    const hasBoxRef = boxRef.current;
    if (!hasBoxRef) return clientRect;
    return hasBoxRef.getBoundingClientRect();
  }, [boxRef]);

  const getBoxRadius = useCallback(
    (event: RadiusEvent) => {
      const area = event.target as HTMLDivElement;
      const ignoredArea = area.hasAttribute("style");

      const boxRect = getBoxRect();

      const clickX = event.clientX - boxRect.left;
      const clickY = event.clientY - boxRect.top;

      const percentX = (clickX / boxRect.width) * 100;
      const percentY = (clickY / boxRect.height) * 100;

      return [percentX, percentY, ignoredArea] as RadiusData;
    },
    [getBoxRect],
  );

  const getBoxAxis = useCallback(
    (percentX: number, percentY: number) => {
      const offsetX = (percentX / 100 - 0.5) * box.w;
      const offsetY = (percentY / 100 - 0.5) * box.h;

      const pointX = box.w / 2 + offsetX;
      const pointY = box.h / 2 + offsetY;

      return [pointX, pointY] as RadiusAxis;
    },
    [box],
  );

  const getBoxPosition = useCallback(() => {
    const boxRect = getBoxRect();

    const offsetWidth = boxRect.width - btn.w;
    const offsetHeight = boxRect.height - btn.h;

    const hasOffsetWidth = offsetWidth !== box.w;
    const hasOffsetHeight = offsetHeight !== box.h;

    const offset: Offset = {
      w: offsetWidth,
      h: offsetHeight,
      l: boxRect.left,
      t: boxRect.top,
    };

    const axis: Axis = {
      x: (color.s / 100) * offsetWidth,
      y: (color.v / 100) * offsetHeight,
    };

    return [offset, axis, hasOffsetWidth, hasOffsetHeight] as RadiusPosition;
  }, [getBoxRect, box, btn, color]);

  const handleDrag = useCallback(
    (event: DragEvent) => {
      updateColor({
        s: (btn.l / box.w) * 100,
        v: (btn.t / box.h) * 100,
      });

      const boxRect = getBoxRect();

      const hasBtn = event.target as HTMLDivElement;
      const btnRect = hasBtn.getBoundingClientRect();

      const offsetLeft = btnRect.left - boxRect.left;
      const offsetTop = btnRect.top - boxRect.top;

      const hasOffsetLeft = offsetLeft !== btn.l;
      const hasOffsetTop = offsetTop !== btn.t;

      if (hasOffsetLeft && hasOffsetTop) {
        setBtn({ ...btn, l: offsetLeft, t: offsetTop });
      }
    },
    [updateColor, getBoxRect, box, btn, setBtn],
  );

  const handlePosition = useCallback(
    (percentX: number, percentY: number) => {
      const [pointX, pointY] = getBoxAxis(percentX, percentY);

      updateColor({ s: percentX, v: percentY });
      animationControls.start({
        x: pointX,
        y: pointY,
      });
    },
    [getBoxAxis, updateColor, animationControls],
  );

  const handlePanRadius = useCallback(
    (event: globalThis.PointerEvent) => {
      const [percentX, percentY, ignoredArea] = getBoxRadius(event);
      if (ignoredArea) return;

      const [pointX, pointY] = getBoxAxis(percentX, percentY);

      updateColor({ s: percentX, v: percentY });
      animationControls.set({
        x: pointX,
        y: pointY,
      });
    },
    [getBoxRadius, getBoxAxis, updateColor, animationControls],
  );

  const handleTapRadius = useCallback(
    (event: MouseEvent) => {
      const [percentX, percentY, ignoredArea] = getBoxRadius(event);
      if (ignoredArea) return;

      handlePosition(percentX, percentY);
    },
    [getBoxRadius, handlePosition],
  );

  const handleResize = useCallback(() => {
    const [offset, axis, hasWidth, hasHeight] = getBoxPosition();

    if (hasWidth && hasHeight) {
      setBox(offset);
      animationControls.start({
        x: axis.x,
        y: axis.y,
        scale: 1,
        opacity: 1,
      });
    }
  }, [getBoxPosition, setBox, animationControls]);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
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

  const [s, l] = convertColor(color.s, color.v);

  const hue = round(color.h, 2);
  const saturation = round(s, 2);
  const lightness = round(l, 2);

  const btnX = round(color.s, 2);
  const btnY = round(color.v, 2);

  const css = `hsl(${hue}deg ${saturation}% ${lightness}%)`;
  const ring = `hsl(${hue}deg ${saturation}% ${lightness > 40 ? 20 : 80}%)`;

  return (
    <motion.div
      ref={boxRef}
      layout="preserve-aspect"
      className="bg-ref relative z-0 flex aspect-square overflow-hidden select-none"
      style={{
        ["--bg" as string]: `hsl(${hue}deg 100% 50%)`,
        backgroundImage:
          "linear-gradient(0deg,#000,transparent),linear-gradient(90deg,#fff,hsla(0,0%,100%,0))",
        boxShadow: "inset 0 0 0 1px rgba(0,0,0,.05)",
      }}
      onPan={handlePanRadius}
    >
      <div
        className="absolute top-0 right-0 bottom-0 left-0 z-1 cursor-crosshair"
        tabIndex={-1}
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
      </div>
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
    </motion.div>
  );
}

function Hue({ color, setColor }: Actions) {
  const trackData = useState<Offset>({ l: 0, t: 0, w: 0, h: 24 });
  const thumbData = useState<Offset>({ l: 0, t: 0, w: 24, h: 24 });

  const [track, setTrack] = trackData;
  const [thumb, setThumb] = thumbData;

  const trackRef = useRef<HTMLDivElement>(null);
  const animationControls = useAnimationControls();

  const handleDrag = useCallback(
    (event: DragEvent) => {
      setColor({
        ...color,
        h: (thumb.l / track.w) * 360,
      });

      const hasTrackRef = trackRef.current;
      if (!hasTrackRef) return;
      const trackRect = hasTrackRef.getBoundingClientRect();

      const hasThumb = event.target as HTMLDivElement;
      const thumbRect = hasThumb.getBoundingClientRect();

      const offsetLeft = thumbRect.left - trackRect.left;
      const hasOffsetLeft = offsetLeft !== thumb.l;

      if (hasOffsetLeft) {
        setThumb({ ...thumb, l: offsetLeft });
      }
    },
    [color, setColor, track, thumb, trackRef, setThumb],
  );

  const handlePosition = useCallback(
    (percentX: number) => {
      setColor({
        ...color,
        h: (percentX / 100) * 360,
      });

      const offsetX = (percentX / 100 - 0.5) * track.w;
      const pointX = track.w / 2 + offsetX;

      animationControls.start({
        x: pointX,
      });
    },
    [color, setColor, track, animationControls],
  );

  const handleTapRadius = useCallback(
    (event: MouseEvent) => {
      const area = event.target as HTMLDivElement;
      if (area.hasAttribute("style")) return;

      const hasTrackRef = trackRef.current;
      if (!hasTrackRef) return;
      const trackRect = hasTrackRef.getBoundingClientRect();

      const clickX = event.clientX - trackRect.left;
      const percentX = (clickX / trackRect.width) * 100;

      handlePosition(percentX);
    },
    [trackRef, handlePosition],
  );

  const handleResize = useCallback(() => {
    const hasTrackRef = trackRef.current;
    if (!hasTrackRef) return;
    const trackRect = hasTrackRef.getBoundingClientRect();

    const offsetWidth = hasTrackRef.offsetWidth - thumb.w;
    const offsetHeight = hasTrackRef.offsetHeight - thumb.h;

    const hasOffsetWidth = offsetWidth !== track.w;
    const hasOffsetHeight = offsetHeight !== track.h;

    if (hasOffsetWidth && hasOffsetHeight) {
      setTrack({
        w: offsetWidth,
        h: offsetWidth,
        l: trackRect.left,
        t: trackRect.top,
      });
      animationControls.start({
        x: (color.h / 360) * offsetWidth,
        scale: 1,
        opacity: 1,
      });
    }
  }, [trackRef, track, setTrack, thumb, animationControls, color]);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  const hue = round(color.h, 2);

  return (
    <motion.div
      ref={trackRef}
      layout="preserve-aspect"
      className="relative z-0 flex h-6 items-center overflow-hidden rounded-xl select-none"
    >
      <div
        className="absolute top-0 right-0 bottom-0 left-0 z-1 cursor-crosshair"
        tabIndex={-1}
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
      </div>
      <div
        className="bg-gradient-ref pointer-events-none absolute right-0 left-0 z-0 h-4 rounded-xl"
        style={{
          ["--bg" as string]:
            "linear-gradient(90deg, hsl(0 100% 50%) 0%, hsl(60 100% 50%) 17%, hsl(120 100% 50%) 33%, hsl(180 100% 50%) 50%, hsl(240 100% 50%) 67%, hsl(300 100% 50%) 83%, hsl(0 100% 50%) 100%)",
        }}
      ></div>
    </motion.div>
  );
}

const ColorSaturation = memo(Saturation);
const ColorHue = memo(Hue);

function Interactive() {
  const [state, action] = useState<HSV>({ h: 216, s: 50, v: 50 });

  return (
    <div className="inline-grid gap-y-6">
      <ColorSaturation color={state} setColor={action} />
      <ColorHue color={state} setColor={action} />
    </div>
  );
}

const ColorPicker = memo(Interactive);

export { ColorPicker, ColorSaturation, ColorHue };

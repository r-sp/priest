"use client";

import type { MouseEvent } from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import { useAnimationControls, motion } from "motion/react";
import { round } from "~/utils";

interface Offset {
  left: number;
  top: number;
  width: number;
  height: number;
}
const initBox: Offset = {
  width: 0,
  height: 0,
  left: 0,
  top: 0,
};
const initBtn: Offset = {
  width: 32,
  height: 32,
  left: 0,
  top: 0,
};

interface Position {
  x: number;
  y: number;
}
const initPosition: Position = {
  x: 0,
  y: 0,
};

function Interactive() {
  const [boxOffset, setBoxOffset] = useState<Offset>(initBox);
  const [btnOffset, setBtnOffset] = useState<Offset>(initBtn);
  const [position, setPosition] = useState<Position>(initPosition);

  const boxRef = useRef<HTMLDivElement>(null);
  const animationControls = useAnimationControls();

  const handleDrag = useCallback(
    (
      event:
        | globalThis.MouseEvent
        | globalThis.PointerEvent
        | globalThis.TouchEvent,
    ) => {
      setPosition({
        x: (btnOffset.left / boxOffset.width) * 100,
        y: (btnOffset.top / boxOffset.height) * 100,
      });

      const box = boxRef.current;
      if (!box) return;
      const boxRect = box.getBoundingClientRect();

      const btn = event.target as HTMLDivElement;
      const btnRect = btn.getBoundingClientRect();

      const offsetLeft = btnRect.left - boxRect.left;
      const offsetTop = btnRect.top - boxRect.top;

      const hasRelativeLeft = offsetLeft !== btnOffset.left;
      const hasRelativeTop = offsetTop !== btnOffset.top;

      if (hasRelativeLeft && hasRelativeTop) {
        setBtnOffset({
          left: offsetLeft,
          top: offsetTop,
          width: btnRect.width,
          height: btnRect.height,
        });
      }
    },
    [boxRef, boxOffset, btnOffset],
  );

  const handlePosition = useCallback(
    (percentX: number, percentY: number) => {
      setPosition({
        x: percentX,
        y: percentY,
      });

      const offsetX = (percentX / 100 - 0.5) * boxOffset.width;
      const offsetY = (percentY / 100 - 0.5) * boxOffset.height;

      const pointX = boxOffset.width / 2 + offsetX;
      const pointY = boxOffset.height / 2 + offsetY;

      animationControls.start({
        x: pointX,
        y: pointY,
      });
    },
    [animationControls, boxOffset],
  );

  const handleTapRadius = useCallback(
    (event: MouseEvent) => {
      const area = event.target as HTMLDivElement;
      if (area.hasAttribute("style")) return;

      const box = boxRef.current;
      if (!box) return;
      const boxRect = box.getBoundingClientRect();

      const clickX = event.clientX - boxRect.left;
      const clickY = event.clientY - boxRect.top;

      const percentX = (clickX / boxRect.width) * 100;
      const percentY = (clickY / boxRect.height) * 100;

      handlePosition(percentX, percentY);
    },
    [boxRef, handlePosition],
  );

  const handleResize = useCallback(() => {
    const box = boxRef.current;
    if (!box) return;
    const boxRect = box.getBoundingClientRect();

    setBoxOffset({
      width: box.offsetWidth - btnOffset.width,
      height: box.offsetHeight - btnOffset.height,
      left: boxRect.left,
      top: boxRect.top,
    });
  }, [boxRef, btnOffset]);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  // converting x-y to hsv to hsl
  const fixup = (x: number, y: number) => {
    x /= 100;
    y /= 100;
    x = Math.max(0, Math.min(1, x));
    y = 1 - Math.max(0, Math.min(1, y));
    let l = y * (1 - x / 2);
    let s;
    if (l === 0 || l === 1) {
      s = 0;
    } else {
      s = (y - l) / Math.min(l, 1 - l);
    }
    s *= 100;
    l *= 100;
    return [s, l];
  };

  const [s, l] = fixup(position.x, position.y);

  const hue = 216;
  const saturation = round(s, 2);
  const lightness = round(l, 2);

  const btnX = round(position.x, 2);
  const btnY = round(position.y, 2);

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
    >
      <div
        className="absolute top-0 right-0 bottom-0 left-0 z-1 cursor-crosshair"
        tabIndex={-1}
        onClick={handleTapRadius}
      >
        <motion.div
          animate={animationControls}
          drag
          dragConstraints={boxRef}
          dragTransition={{ bounceStiffness: 10, bounceDamping: 2 }}
          dragElastic={false}
          dragMomentum={true}
          onDrag={(e) => handleDrag(e)}
          className="bg-ref absolute z-2 size-8 cursor-all-scroll rounded-2xl ring-2"
          style={{
            ["--bg" as string]: css,
            ["--tw-ring-color" as string]: ring,
          }}
          tabIndex={0}
        />
      </div>
      <div className="pointer-events-none absolute bottom-0 z-2 flex flex-col gap-y-2 px-4 pb-4 font-mono text-sm break-words text-gray-200 mix-blend-difference">
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

export { Interactive };

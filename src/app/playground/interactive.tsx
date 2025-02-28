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

  // test
  const btnX = round(position.x, 2);
  const btnY = round(position.y, 2);

  return (
    <motion.div
      ref={boxRef}
      layout="preserve-aspect"
      className="relative z-0 flex aspect-square overflow-hidden select-none"
    >
      <div
        className="absolute top-0 right-0 bottom-0 left-0 z-1 cursor-crosshair"
        onClick={handleTapRadius}
        tabIndex={-1}
      >
        <motion.div
          animate={animationControls}
          drag
          dragConstraints={boxRef}
          dragTransition={{ bounceStiffness: 10, bounceDamping: 2 }}
          dragElastic={false}
          dragMomentum={true}
          onDrag={(e) => handleDrag(e)}
          className="absolute z-2 size-8 cursor-all-scroll rounded-2xl bg-green-600/70"
          tabIndex={0}
        />
      </div>
      <div className="pointer-events-none absolute top-0 right-0 bottom-0 left-0 z-0 flex items-center justify-center bg-gray-400">
        <div className="inline-flex size-8 rounded-2xl bg-red-600/70" />
      </div>
      <div className="pointer-events-none absolute bottom-0 z-2 flex flex-col gap-y-2 px-4 pb-4 font-mono text-sm break-words text-gray-700">
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

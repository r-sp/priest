"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "motion/react";

function Interactive() {
  const [offset, setOffset] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });
  const [position, setPosition] = useState<{ left: number; top: number }>({
    left: 0,
    top: 0,
  });
  const constraintsRef = useRef<HTMLDivElement>(null);

  const updateOffset = useCallback(() => {
    const ref = constraintsRef.current;
    if (ref) {
      const { width, height } = offset;
      const w = ref.offsetWidth - 32;
      const h = ref.offsetHeight - 32;
      if (w !== width && h !== height) {
        setOffset({ width: w, height: h });
      }
    }
  }, [offset, setOffset, constraintsRef]);

  const handleDrag = useCallback(
    (event: globalThis.MouseEvent | globalThis.PointerEvent | TouchEvent) => {
      const box = constraintsRef.current;
      const btn = event.target as HTMLDivElement;
      if (box) {
        const { left, top } = position;
        const parent = box.getBoundingClientRect();
        const rect = btn.getBoundingClientRect();
        const l = rect.left - parent.left;
        const t = rect.top - parent.top;
        if (l !== left && t !== top) {
          setPosition({ left: l, top: t });
        }
      }
    },
    [position, setPosition, constraintsRef],
  );

  useEffect(() => {
    updateOffset();
    const handleResize = () => {
      updateOffset();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [updateOffset]);

  const positionX = (position.left / offset.width) * 100;
  const positionY = (position.top / offset.height) * 100;

  return (
    <div className="relative z-0 flex aspect-square overflow-hidden">
      <motion.div
        ref={constraintsRef}
        className="absolute top-0 right-0 bottom-0 left-0 z-0 flex items-center justify-center bg-gray-400"
      >
        <motion.div
          drag
          dragConstraints={constraintsRef}
          dragTransition={{ bounceStiffness: 10, bounceDamping: 2 }}
          dragElastic={false}
          onDrag={(e) => handleDrag(e)}
          className="absolute z-2 inline-flex size-8 cursor-pointer rounded-2xl bg-green-600/70"
        />
        <div className="pointer-events-none absolute z-1 inline-flex size-8 rounded-2xl bg-red-600/70" />
      </motion.div>
      <div className="pointer-events-none absolute bottom-0 z-1 grid gap-y-2 px-4 pb-4 font-mono text-sm break-words text-gray-700">
        <div className="inline-grid">
          <h2>Motion</h2>
          <p>{`X: ${positionX.toFixed(2)}%`}</p>
          <p>{`Y: ${positionY.toFixed(2)}%`}</p>
        </div>
      </div>
    </div>
  );
}

export { Interactive };

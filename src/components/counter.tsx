"use client";

import { useCounterStore } from "~/app/provider";

export default function Counter() {
  const { count, incrementCount, decrementCount } = useCounterStore(
    (state) => state,
  );
  return (
    <div>
      Count: {count}
      <hr />
      <button type="button" onClick={() => void incrementCount()}>
        Increment Count
      </button>
      <button type="button" onClick={() => void decrementCount()}>
        Decrement Count
      </button>
    </div>
  );
}

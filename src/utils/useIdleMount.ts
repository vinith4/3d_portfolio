import { useEffect, useState } from "react";

/**
 * True once the browser has painted at least one frame AND gone idle.
 * requestIdleCallback alone isn't enough — it fires as soon as no task is
 * queued, which can be *before* the first paint actually lands. The double
 * rAF forces a real paint to happen first; idle is then layered on top so
 * mounting doesn't steal a frame from an in-flight animation either.
 */
export function useIdleMount(timeout = 1500) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const w = window as Window & {
      requestIdleCallback?: (
        cb: () => void,
        opts?: { timeout: number },
      ) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    let raf2 = 0;
    let idleHandle: number | undefined;

    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        if (typeof w.requestIdleCallback === "function") {
          idleHandle = w.requestIdleCallback(() => setReady(true), {
            timeout,
          });
        } else {
          setReady(true);
        }
      });
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      if (idleHandle !== undefined) w.cancelIdleCallback?.(idleHandle);
    };
  }, [timeout]);

  return ready;
}

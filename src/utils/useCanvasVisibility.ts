import { useEffect, useRef, useState } from "react";

/** Pause WebGL when the canvas wrapper leaves the viewport. */
export function useCanvasVisibility(
  rootMargin = "80px",
  initialVisible = false,
) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(initialVisible);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin, threshold: 0.01 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, visible };
}

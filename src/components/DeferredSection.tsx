import { Suspense, type ReactNode } from "react";
import { useCanvasVisibility } from "../utils/useCanvasVisibility";

interface DeferredSectionProps {
  children: ReactNode;
  minHeight: string;
}

/** Mount a below-the-fold section only shortly before it can enter the viewport. */
const DeferredSection = ({ children, minHeight }: DeferredSectionProps) => {
  // Negative bottom margin: a section sitting right at the fold (distance 0
  // from viewport bottom) would otherwise be flagged "visible" instantly on
  // load with any positive margin. Requiring it to have scrolled ~15% into
  // view keeps it from mounting before first paint while still prefetching
  // ahead of the user reaching it.
  const { ref, visible } = useCanvasVisibility("0px 0px -15% 0px");

  return (
    <div ref={ref} className="relative" style={{ minHeight }}>
      {visible && <Suspense fallback={null}>{children}</Suspense>}
    </div>
  );
};

export default DeferredSection;

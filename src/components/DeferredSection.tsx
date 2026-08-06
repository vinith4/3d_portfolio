import { Suspense, type ReactNode } from "react";
import { useCanvasVisibility } from "../utils/useCanvasVisibility";

interface DeferredSectionProps {
  children: ReactNode;
  minHeight: string;
}

/** Mount a below-the-fold section only shortly before it can enter the viewport. */
const DeferredSection = ({ children, minHeight }: DeferredSectionProps) => {
  const { ref, visible } = useCanvasVisibility("600px");

  return (
    <div ref={ref} className="relative" style={{ minHeight }}>
      {visible && <Suspense fallback={null}>{children}</Suspense>}
    </div>
  );
};

export default DeferredSection;

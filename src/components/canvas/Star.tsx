import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { random } from "maath";

import { useCanvasVisibility } from "../../utils/useCanvasVisibility";
import { useIsMobile } from "../../utils/useIsMobile";

const STAR_COUNT = { mobile: 2200, desktop: 4500 } as const;

const Stars = ({ count }: { count: number }) => {
  const ref = useRef<THREE.Points>(null!);

  const [sphere] = useState<Float32Array>(() =>
    random.inSphere(new Float32Array(count), { radius: 1.2 }) as Float32Array,
  );

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#f272c8"
          size={0.002}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => {
  const isMobile = useIsMobile(768);
  const { ref, visible } = useCanvasVisibility("200px");
  const starCount = isMobile ? STAR_COUNT.mobile : STAR_COUNT.desktop;

  return (
    <div ref={ref} className="w-full h-auto absolute inset-0 z-[-1]">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        dpr={[1, isMobile ? 1.25 : 1.5]}
        frameloop={visible ? "always" : "never"}
        gl={{ powerPreference: "high-performance", alpha: true }}
      >
        <Suspense fallback={null}>
          <Stars count={starCount} key={starCount} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default StarsCanvas;
